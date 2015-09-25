'use strict';

var Promise = require('bluebird');
var lodash = require('lodash');
var lunr = require('lunr');

var index = lunr(function() {
  this.ref('id');
  this.field('text');
});

function search(phrase) {
  return new Promise(function(resolve, reject) {
    var refs = index.search(phrase);
    for (var i = 0; i < refs.length; i++) {
      refs[i] = parseInt(refs[i].ref);
    }
    resolve(refs);
  });
}

search.init = function(sequelize) {
  return new Promise(function(resolve, reject) {
    var sql = 'SELECT t.id, REGEXP_REPLACE(x.condition || \' \' || ' +
      't.condition_or_problem, \'^\\s+([^\\s]*)\\s+$\', \'$1\') AS text ' +
      'FROM ( ' +
      'SELECT t2c.trial_id, ' +
      'ARRAY_TO_STRING(ARRAY_AGG(c.description), \' \') AS condition ' +
      'FROM trial2condition as t2c ' +
      'LEFT JOIN condition AS c ON t2c.condition_id = c.id ' +
      'GROUP BY t2c.trial_id ' +
      ') AS x ' +
      'LEFT JOIN trial AS t ON x.trial_id = t.id';
    sequelize.query(sql, {type: sequelize.QueryTypes.SELECT})
      .then(function(records) {
        for (var i = 0; i < records.length; i++) {
          index.add({
            id: records[i].id,
            text: records[i].text
          });
        }
        resolve();
      }).catch(reject);
  });
};

module.exports = search;
