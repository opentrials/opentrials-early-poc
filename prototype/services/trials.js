var when = require('when');
var Promise = require('bluebird');
var models = require('../models');

module.exports.getItems = function(pagination) {
  return new Promise(function(resolve, reject) {
    if (pagination.currentPage < 1) {
      return reject();
    }
    models.Trial.count().then(function(itemsCount){
      pagination.itemsCount = itemsCount;
      if (pagination.currentPageValue > pagination.pageCount) {
        return reject();
      }

      models.Trial.findAll({
        order: [
          ['public_title', 'ASC'],
          ['scientific_title', 'ASC'],
          ['id', 'ASC']
        ],
        offset: (pagination.currentPage - 1) * pagination.itemsPerPage,
        limit: pagination.itemsPerPage
      }).then(resolve).catch(reject);
    }).catch(reject);
  });
};

module.exports.getItem = function(id) {
  return new Promise(function(resolve, reject) {
    models.Trial.findById(id).then(function(item) {
      if (!item) {
        return reject();
      }

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
        resolve(item);
      });
    }).catch(reject);
  });
};
