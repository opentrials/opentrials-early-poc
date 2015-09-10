var assign = require('lodash/object/assign');
var find = require('lodash/collection/find');
var mocks = require('./mocks');

function Condition(rawData) {
  // Extend newly created object based on raw data
  assign(this, rawData);
}

Condition.prototype = {
  id: null, // char, PK
  technicalName: null, // char
  commonName: null // char
};

var items = null;

function findAll() {
  if (items === null) {
    items = [];
    var records = mocks.condition;
    for (var i = 0; i < records.length; i++) {
      items.push(new Condition(records[i]));
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