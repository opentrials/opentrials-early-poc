'use strict';

// Set this before initializing config
process.env.NODE_ENV = 'test';

var Browser = require('zombie');
var assert = require('chai').assert;
var lodash = require('lodash');
var searchService = require('../prototype/services/search');
var trialsService = require('../prototype/services/trials');

var trial = null;

before(function(done) {
  this.timeout(20000);
  var promises = [
    searchService.init(),
    trialsService.getItem(200)
  ];
  Promise.all(promises).then(function(results) {
    trial = results[1];
    done();
  });
});

describe('Search Service', function() {

  it('Should find item by search phrase', function(done) {
    searchService.indexes.phrase(trial.publicTitle)
      .then(function(ids) {
        assert(ids.indexOf(trial.id) > -1);
        done();
      });
  });

  it('Should find item by condition', function(done) {
    searchService.indexes.condition(trial.conditionOrProblem)
      .then(function(ids) {
        assert(ids.indexOf(trial.id) > -1);
        done();
      });
  });

  it('Should find item by country', function(done) {
    searchService.indexes.country(trial.countries)
      .then(function(ids) {
        assert(ids.indexOf(trial.id) > -1);
        done();
      });
  });

  it('Should find item by intervention', function(done) {
    searchService.indexes.intervention(trial.interventions[0])
      .then(function(ids) {
        assert(ids.indexOf(trial.id) > -1);
        done();
      });
  });

  it('Should find item by sample size', function(done) {
    searchService.indexes.sampleSize({
      min: trial.sampleSize,
      max: trial.sampleSize
    }).then(function(ids) {
      assert(ids.indexOf(trial.id) > -1);
      done();
    });
  });

  it('Should find item by sex', function(done) {
    searchService.indexes.sex(trial.sex)
      .then(function(ids) {
        assert(ids.indexOf(trial.id) > -1);
        done();
      });
  });

  it('Should find item by source', function(done) {
    searchService.indexes.source(trial.source.title)
      .then(function(ids) {
        assert(ids.indexOf(trial.id) > -1);
        done();
      });
  });

  it('Should search by combination of filters', function(done) {
    var filters = {
      phrase: trial.publicTitle,
      sex: trial.sex,
      sampleSize: {
        min: trial.sampleSize,
        max: trial.sampleSize
      },
      country: trial.countries
    };
    searchService(filters)
      .then(function(ids) {
        assert(ids.indexOf(trial.id) > -1);
        done();
      });
  });

});
