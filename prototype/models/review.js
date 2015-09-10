var assign = require('lodash/object/assign');
var find = require('lodash/collection/find');
var mocks = require('./mocks');

function Review(rawData) {
  // Extend newly created object based on raw data
  assign(this, rawData);
}

Review.prototype = {
  id: null // char, PK
};

var items = null;

function findAll() {
  if (items === null) {
    items = [];
    var records = mocks.review;
    for (var i = 0; i < records.length; i++) {
      items.push(new Review(records[i]));
    }
  }
  return items;
}

function findById(id) {
  return find(findAll(), function(item) {
    return item.id == id;
  });
}

module.exports.findAll = findAll;
module.exports.findById = findById;