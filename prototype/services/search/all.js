'use strict';

var Promise = require('bluebird');

var ids = null;

function search() {
  return new Promise(function(resolve, reject) {
    resolve(ids);
  });
}

search.lookup = function(phrase, limit) {
  return new Promise(function(resolve, reject) {
    resolve([]);
  });
};

search.init = function(sequelize) {
  return new Promise(function(resolve, reject) {
    var sql = 'SELECT id FROM ' + sequelize.options.schema + '.trial';
    sequelize.query(sql, {type: sequelize.QueryTypes.SELECT})
      .then(function(records) {
        ids = [];
        for (var i = 0; i < records.length; i++) {
          ids.push(parseInt(records[i].id));
        }
        resolve();
      }).catch(reject);
  });
};

module.exports = search;
