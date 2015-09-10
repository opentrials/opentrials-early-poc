var assign = require('lodash/object/assign');
var find = require('lodash/collection/find');
var mocks = require('./mocks');

function Participant(rawData) {
  // Extend newly created object based on raw data
  assign(this, rawData);
}

Participant.prototype = {
  id: null, // char, PK
  age: null // int
};

var items = null;

function findAll() {
  if (items === null) {
    items = [];
    var records = mocks.participant;
    for (var i = 0; i < records.length; i++) {
      items.push(new Participant(records[i]));
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