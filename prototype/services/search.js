'use strict';

var Promise = require('bluebird');
var lodash = require('lodash');
var lunr = require('lunr');
var models = require('../models');

function buildIndex(sql) {
  return new Promise(function(resolve, reject) {
    var sequelize = models.sequelize;
    sequelize.query(sql, {
      type: sequelize.QueryTypes.SELECT
    }).then(function(records) {
      var index = lunr(function() {
        this.field('text');
        this.ref('id');
      });
      for (var i = 0; i < records.length; i++) {
        index.add({
          id: records[i].id,
          text: records[i].text
        });
      }
      resolve(index);
    }).catch(function() {
      resolve(null);
    });
  });
}

var indexes = null;

function getIndex() {
  return new Promise(function(resolve, reject) {
    if (indexes === null) {
      indexes = {};
      var promises = [
        buildIndex(
          'SELECT "id", "public_title" || \' \' || ' +
          '"scientific_title" AS "text" ' +
          'FROM "trial"'
        ),
        buildIndex(
          'SELECT t.id, regexp_replace(x.condition || \' \' || ' +
          't.condition_or_problem, \'^\\s+([^\\s]*)\\s+$\', \'$1\') AS text ' +
          'FROM ( ' +
            'SELECT t2c.trial_id, ' +
            'ARRAY_TO_STRING(ARRAY_AGG(c.description), \' \') AS condition ' +
            'FROM trial2condition as t2c ' +
            'LEFT JOIN condition AS c ON t2c.condition_id = c.id ' +
            'GROUP BY t2c.trial_id ' +
          ') AS x ' +
          'LEFT JOIN trial AS t ON x.trial_id = t.id'
        )
      ];
      Promise.all(promises).then(function(results) {
        if (results[0]) {
          indexes.phrase = results[0];
        }
        if (results[1]) {
          indexes.condition = results[1];
        }
        resolve(indexes);
      });
    } else {
      resolve(indexes);
    }
  });
}

function performSearchByIndex(index, phrase) {
  var refs = index.search(phrase);
  for (var i = 0; i < refs.length; i++) {
    refs[i] = refs[i].ref;
  }
  return refs;
}

function searchTrials(filters) {
  return new Promise(function(resolve, reject) {
    getIndex().then(function(indexes) {
      var ids = null;
      for (var name in filters) {
        if (filters.hasOwnProperty(name) && indexes.hasOwnProperty(name)) {
          if ((filters[name] !== undefined) && (filters[name] !== '')) {
            var temp = performSearchByIndex(indexes[name], filters[name]);
            if (temp.length == 0) {
              resolve([]);
              return;
            }
            ids = ids || [];
            ids.push(temp);
          }
        }
      }
      if (ids !== null) {
        ids = lodash.intersection.apply(null, ids);
      }
      resolve(ids);
    }).catch(reject);
  });
}

module.exports.searchTrials = searchTrials;
module.exports.prepareIndex = function() {
  return new Promise(function(resolve, reject) {
    var time = Date.now();
    getIndex().then(function() {
      console.log('Search index has been prepared in ' +
        ((Date.now() - time) / 1000) + ' second(s)');
      resolve();
    }).catch(reject);
  });
};
