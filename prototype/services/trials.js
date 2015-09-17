var lodash = require('lodash');
var when = require('when');
var Promise = require('bluebird');
var searchService = require('./search');
var models = require('../models');

function getItems(pagination, idsOrFilterParams) {
  return new Promise(function(resolve, reject) {
    if (pagination.currentPageValue < 1) {
      return reject();
    }

    // If second parameter is set of filters, resolve them into trials IDs
    var searchPromise = null;
    if (lodash.isObject(idsOrFilterParams)) {
      searchPromise = searchService.searchTrials(idsOrFilterParams);
    } else {
      searchPromise = new Promise(function(resolve) {
        resolve(idsOrFilterParams);
      });
    }

    // Query trials using IDs (if any)
    searchPromise.then(function(ids) {
      var isArrayOfIDs = lodash.isArray(ids);
      var isSingleID = lodash.isString(ids) || lodash.isNumber(ids);

      var where = {};
      if (isArrayOfIDs) {
        // If there are no items - just return empty array. No query needed
        if (ids.length == 0) {
          return resolve([]);
        }
        where.id = {
          $in: ids
        };
      } else
      if (isSingleID) {
        where.id = ids;
      }

      models.Trial.count({where: where}).then(function(itemsCount) {
        pagination.itemsCount = itemsCount;
        if (pagination.currentPageValue > pagination.pageCount) {
          return reject();
        }

        var options = {
          where: where,
          order: [
            ['public_title', 'ASC'],
            ['scientific_title', 'ASC'],
            ['id', 'ASC']
          ],
          offset: (pagination.currentPage - 1) * pagination.itemsPerPage,
          limit: pagination.itemsPerPage
        };
        models.Trial.findAll(options).then(resolve).catch(reject);
      }).catch(reject);
    }).catch(reject);
  });
}

function getItem(id) {
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
      when.all(promises).then(function(results) {
        item.conditions = results[0];
        item.documents = results[1];
        item.drugs = results[2];
        resolve(item);
      });
    }).catch(reject);
  });
}

module.exports.getItems = getItems;
module.exports.getItem = getItem;
