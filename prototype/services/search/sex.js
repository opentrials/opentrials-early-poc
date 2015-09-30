'use strict';

var Promise = require('bluebird');
var lodash = require('lodash');

var db = null;

function search(values) {
  if (lodash.isString(values)) {
    switch (values.toLowerCase()) {
      case 'none': values = []; break;
      case 'male': values = ['Male']; break;
      case 'female': values = ['Female']; break;
      case 'both': values = ['Male', 'Female']; break;
      default: values = false; break;
    }
  }

  return new Promise(function(resolve, reject) {
    if (!lodash.isArray(values)) {
      return resolve([]);
    }

    values = lodash.chain(values)
      .filter(function(value) {
        return (value == 'Male') || (value == 'Female');
      })
      .map(function(value) {
        return '\'' + value + '\'';
      })
      .value()
      .join(',');
    var sql = 'SELECT id FROM ' + sequelize.options.schema + '.trial ' +
      'WHERE sex = ARRAY[' + values + ']::sex_type[]';
    db.query(sql, {type: db.QueryTypes.SELECT, replacements: values})
      .then(function(records) {
        var result = [];
        for (var i = 0; i < records.length; i++) {
          result.push(parseInt(records[i].id));
        }
        resolve(result);
      }).catch(reject);
  });
}

search.lookup = function(phrase, limit) {
  return new Promise(function(resolve, reject) {
    resolve([]);
  });
};

search.init = function(sequelize) {
  db = sequelize;
};

module.exports = search;
