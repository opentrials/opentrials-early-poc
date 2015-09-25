'use strict';

var Promise = require('bluebird');
var lodash = require('lodash');
var models = require('../../models');

var indexes = {
  all: require('./all'),
  phrase: require('./search'),
  condition: require('./condition'),
  intervention: require('./intervention'),
  country: require('./country'),
  source: require('./source'),
  sample_size: require('./sample-size'),
  sex: require('./sex')
};

function search(filters) {
  return new Promise(function(resolve, reject) {
    var promises = [indexes.all()];
    for (var name in indexes) {
      if (indexes.hasOwnProperty(name) && filters.hasOwnProperty(name)) {
        if (filters[name] != '') {
          var promise = indexes[name](filters[name]);
          if (promise) {
            promises.push(promise);
          }
        }
      }
    }
    Promise.all(promises).then(function(results) {
      var ids = lodash.intersection.apply(null, results.slice(1));
      resolve(ids);
    }).catch(reject);
  });
}

search.init = function() {
  return new Promise(function(resolve, reject) {
    var promises = [];
    for (var name in indexes) {
      if (indexes.hasOwnProperty(name)) {
        var promise = indexes[name].init(models.sequelize);
        if (promise) {
          promises.push(promise);
        }
      }
    }
    var time = Date.now();
    Promise.all(promises).then(function() {
      console.log('Search index has been prepared in ' +
      ((Date.now() - time) / 1000) + ' second(s)');
      resolve();
    }).catch(reject);
  });
};

module.exports = search;
