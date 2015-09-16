var when = require('when');
var Promise = require('bluebird');
var models = require('../models');

module.exports.getItems = function(query) {
  return new Promise(function(resolve, reject) {
    var promises = [];
    promises.push(models.Trial.findAll(query));
    promises.push(models.Trial.count());
    when.all(promises).then(function(results) {
      resolve({
        items: results[0],
        count: results[1]
      });
    }).catch(reject);
  });
};

module.exports.getItem = function(id) {
  return models.Trial.findById(id);
};
