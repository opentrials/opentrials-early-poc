'use strict';

var Promise = require('bluebird');
var lunr = require('lunr');
var models = require('../models');

var index = null;

function getIndex() {
  return new Promise(function(resolve, reject) {
    if (index === null) {
      index = lunr(function() {
        this.field('title');
        this.ref('id');
      });
      models.Trial.findAll().then(function(items) {
        for (var i = 0; i < items.length; i++) {
          index.add({
            id: items[i].id,
            title: items[i].publicTitle + ' ' + items[i].scientificTitle
          });
        }
        resolve(index);
      });
    } else {
      resolve(index);
    }
  });
}

function performSearchByIndex(index, phrase) {
  var refs = index.search(phrase);
  for (var i = 0; i < refs.length; i++) {
    refs[i] = refs[i].ref;
  }
  return refs;
}

function searchTrials(filters) {
  return new Promise(function(resolve, reject) {
    getIndex().then(function(index) {
      var ids = performSearchByIndex(index, filters.phrase);
      resolve(ids);
    }).catch(reject);
  });
}

module.exports.searchTrials = searchTrials;
