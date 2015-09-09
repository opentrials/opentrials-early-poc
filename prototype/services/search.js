var intersect = require('lodash/array/intersection');
var lunr = require('lunr');
var trialsModel = require('../models/trial');

var index = null;

function toInt(value) {
  value = + value;
  return isFinite(value) ? value : false;
}

function YearIndex() {
  this._items = Object.create(null);
}
YearIndex.prototype = {
  add: function(object) {
    var value = toInt(object.year);
    if (value !== false) {
      this._items[value] = this._items[value] || [];
      this._items[value].push(object.id);
    }
  },
  search: function(value) {
    value = toInt(value);
    var result = [];
    if (value !== false) {
      var ids = this._items[value] || [];
      for (var i = 0; i < ids.length; i++) {
        result.push({
          ref: ids[i],
          score: 1
        });
      }
    }
    return result;
  }
};

function AgeIndex() {
  this._items = Object.create(null);
}
AgeIndex.prototype = {
  add: function(object) {
    if (object.range && object.range.length) {
      var values = object.range;
      for (var i = 0; i < values.length; i++) {
        values[i] = parseInt(values[i]);
      }
      this._items[object.id] = {
        min: Math.min.apply(null, values),
        max: Math.max.apply(null, values)
      };
    }
  },
  search: function(value) {
    value = toInt(value);
    var result = [];
    if (value !== false) {
      for (var id in this._items) {
        var item = this._items[id];
        if ((value >= item.min) && (value <= item.max)) {
          result.push({
            ref: id,
            score: 1
          });
        }
      }
    }
    return result;
  }
};

function buildIndex() {
  if (index === null) {
    index = {
      phrase: lunr(function() {
        this.field('title', 1000);
        this.field('condition');
        this.field('drug');
        this.field('country');
        this.ref('id');
      }),
      country: lunr(function() {
        this.field('country');
        this.ref('id');
      }),
      drug: lunr(function() {
        this.field('drug');
        this.ref('id');
      }),
      condition: lunr(function() {
        this.field('condition');
        this.ref('id');
      }),
      year: new YearIndex(),
      age: new AgeIndex()
    };

    var trials = trialsModel.findAll();
    for (var i = 0; i < trials.length; i++) {
      var trial = trials[i];
      var condition = trial.condition;
      var drug = trial.drug;

      index.phrase.add({
        id: trial.id,
        title: trial.publicTitle + ' / ' + trial.scientificTitle,
        condition: condition ? condition.technicalName + ' / ' + condition.commonName : '',
        drug: drug ? drug.technicalName + ' / ' + drug.commonName : '',
        country: trial.country
      });

      index.country.add({
        id: trial.id,
        country: trial.country
      });

      index.drug.add({
        id: trial.id,
        drug: drug ? drug.technicalName + ' / ' + drug.commonName : ''
      });

      index.condition.add({
        id: trial.id,
        condition: condition ? condition.technicalName + ' / ' + condition.commonName : ''
      });

      index.year.add({
        id: trial.id,
        year: trial.year
      });

      index.age.add({
        id: trial.id,
        range: trial.ageRange
      });
    }
  }

  return index;
}

function performSearchByIndex(index, phrase) {
  var refs = index.search(phrase);
  for (var i = 0; i < refs.length; i++) {
    refs[i] = parseInt(refs[i].ref);
  }
  return refs;
}

function performSearch(indexes, filters) {
  var result = [];
  var ids, phrase;
  for (var name in indexes) {
    if (indexes.hasOwnProperty(name) && filters.hasOwnProperty(name)) {
      phrase = filters[name];
      if (phrase != '') {
        ids = performSearchByIndex(indexes[name], filters[name]);
        result.push(ids);
      }
    }
  }
  if (result.length > 0) {
    ids = intersect.apply(null, result);
  } else {
    ids = false;
  }
  return ids;
}

function search(filters) {
  var ids = performSearch(buildIndex(), filters);
  var items = trialsModel.findAll();
  if (ids !== false) {
    var result = [];
    for (var i = 0; i < items.length; i++) {
      if (ids.indexOf(items[i].id) >= 0) {
        result.push(items[i]);
      }
    }
  } else {
    result = items;
  }
  return result;
}

module.exports.search = search;