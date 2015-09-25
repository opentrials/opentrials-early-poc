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
    var sql = 'SELECT id, countries AS text FROM trial';
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
