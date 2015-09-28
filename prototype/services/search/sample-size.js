'use strict';

var Promise = require('bluebird');
var lodash = require('lodash');

var db = null;

function search(values) {
  // Check input
  var min = parseFloat(values.min);
  var max = parseFloat(values.max);
  if (isFinite(min) && (isFinite(max))) {
    if (min > max) {
      var t = min; min = max; max = t;
    }
  }

  if (!isFinite(min) && !isFinite(max)) {
    return null;
  }

  return new Promise(function(resolve, reject) {
    var where = ['(sample_size ~ \'^[0-9]+$\')'];
    if (isFinite(min)) {
      where.push('(' + min + ' <= sample_size::int)');
    }
    if (isFinite(max)) {
      where.push('(sample_size::int <= ' + max + ')');
    }

    var sql = 'SELECT id FROM trial WHERE ' + where.join(' AND ');
    db.query(sql, {type: db.QueryTypes.SELECT})
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
