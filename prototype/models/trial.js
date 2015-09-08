var assign = require('lodash/object/assign');
var find = require('lodash/collection/find');
var mocks = require('./mocks');

var conditionModel = require('./condition');
var drugModel = require('./drug');

function Trial(rawData) {
  // Extend newly created object based on raw data
  assign(this, rawData);
}

Trial.prototype = {
  id: null, // char, PK
  publicTitle: null, // char
  scientificTitle: null, // char
  condition: null, // char, FK
  drug: null, // char, FK
  intervention: null, // text
  fundingSource: null, // char
  criteria: null, // text
  ageRange: null, // range of int
  sex: null, // enum(Male, Female, Both)
  targetSampleSize: null, // int
  actualSampleSize: null // int
};

var items = null;

function findAll() {
  if (items === null) {
    items = [];
    var records = mocks.trial;
    for (var i = 0; i < records.length; i++) {
      var record = records[i];
      record.condition = conditionModel.findById(record.condition);
      record.drug = drugModel.findById(record.drug);
      items.push(new Trial(record));
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