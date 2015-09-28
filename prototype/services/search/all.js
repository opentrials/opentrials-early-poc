'use strict';

var Promise = require('bluebird');

var ids = null;

function search() {
  return new Promise(function(resolve, reject) {
    resolve(ids);
  });
}

search.init = function(sequelize) {
  return new Promise(function(resolve, reject) {
    var sql = 'SELECT id FROM trial';
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
