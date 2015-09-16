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
  return new Promise(function(resolve, reject) {
    models.Trial.findById(id).then(function(item) {
      var promises = [];

      // Load associated data
      promises.push(item.getConditions());
      promises.push(item.getDocuments());
      promises.push(item.getDrugs());

      // Wait for all data ready
      when.all(promises).then(function(results){
        item.conditions = results[0];
        item.documents = results[1];
        item.drugs = results[2];
        console.log(item.dateFrom, item.dateTo);
        resolve(item);
      });
    }).catch(reject);
  });
};
