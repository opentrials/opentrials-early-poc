'use strict';

var Promise = require('bluebird');
var lodash = require('lodash');
var lunr = require('lunr');

function createIndex() {
  return lunr(function() {
    this.ref('id');
    this.field('text');
  });
}

var index = createIndex();

function search(phrase) {
  return new Promise(function(resolve, reject) {
    var refs = index.search(phrase);
    for (var i = 0; i < refs.length; i++) {
      refs[i] = parseInt(refs[i].ref);
    }
    resolve(refs);
  });
}

search.lookup = function(phrase, limit) {
  return new Promise(function(resolve, reject) {
    resolve([]);
  });
};

search.init = function(sequelize) {
  index = createIndex();
  return new Promise(function(resolve, reject) {
    var sql = 'SELECT t.id AS id, s.title AS text ' +
      'FROM ' + sequelize.options.schema + '.source AS s ' +
      'LEFT JOIN ' + sequelize.options.schema + '.trial AS t ' +
      'ON t.source_id = s.id';
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
