'use strict';

var Promise = require('bluebird');
var lodash = require('lodash');

var db = null;

function search(values) {
  return new Promise(function(resolve, reject) {
    if (!lodash.isArray(values)) {
      resolve([]);
    }

    values = lodash.chain(values)
      .map(parseFloat)
      .filter(lodash.isFinite)
      .value();
    if (values.length == 0) {
      return resolve([]);
    }

    var min = Math.min.apply(null, values);
    var max = Math.max.apply(null, values);

    var sql = 'SELECT id FROM trial WHERE (sample_size ~ \'^[0-9]+$\') AND ' +
      '(? <= sample_size::int) AND (sample_size::int <= ?)';
    db.query(sql, {type: db.QueryTypes.SELECT, replacements: [min, max]})
      .then(function(records) {
        var result = [];
        for (var i = 0; i < records.length; i++) {
          result.push(parseInt(records[i].id));
        }
        resolve(result);
      }).catch(reject);
  });
}

search.init = function(sequelize) {
  db = sequelize;
};

module.exports = search;
