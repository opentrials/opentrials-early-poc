'use strict';

// Set this before initializing config
process.env.NODE_ENV = 'test';

var Browser = require('zombie');
var app = require('../prototype/app');
var config = require('../prototype/config');
var assert = require('chai').assert;
var lodash = require('lodash');

Browser.localhost('127.0.0.1', process.env.PORT || 3000);

before(function(done) {
  // Run the server
  app.listen(3000, function() {
    done();
  });
});

beforeEach(function() {
  // Disable protection by access token
  config.set('access:isProtected', false);
  config.set('access:token', '123');
});

describe('Core', function() {
  var browser = new Browser({maxWait: 5000});
  // Ensure we have time for request to resolve, etc.
  this.timeout(10000);

  it('Should be alive', function(done) {
    browser.visit('/', function() {
      assert.ok(browser.success);
      done();
    });
  });
});


describe('Access Token', function() {
  var browser = new Browser({maxWait: 5000});
  // Ensure we have time for request to resolve, etc.
  this.timeout(2000);

  it('Should return 403 Forbidden', function(done) {
    config.set('access:isProtected', true);
    browser.visit('/', function() {
      assert(browser.statusCode == 403, 'Status should be "403 Forbidden"');
      done();
    });
  });

  it('Should allow access after providing access token', function(done) {
    config.set('access:isProtected', true);
    browser.visit('/', function() {
      browser.fill('#token', config.get('access:token'));
      browser.document.forms[0].submit();
      browser.wait().then(function() {
        assert.ok(browser.success);
        done();
      });
    });
  });

});

describe('Pages', function() {
  var browser = new Browser({maxWait: 5000});
  // Ensure we have time for request to resolve, etc.
  this.timeout(2000);

  it('Should contain text "Find a trial"', function(done) {
    browser.visit('/', function() {
      assert.ok(browser.success);
      assert.equal(browser.text('h1'), 'Find a trial');
      done();
    });
  });

  it('Should contain text "About"', function(done) {
    browser.visit('/about', function() {
      assert.ok(browser.success);
      assert.equal(browser.text('h1'), 'About');
      done();
    });
  });

  it('Should contain text "Contacts"', function(done) {
    browser.visit('/contacts', function() {
      assert.ok(browser.success);
      assert.equal(browser.text('h1'), 'Contacts');
      done();
    });
  });

  it('Should contain ID of trial', function(done) {
    var trialId = 200;
    browser.visit('/trial/' + trialId, function() {
      assert.ok(browser.success);
      assert.include(browser.text('h1'), '#' + trialId);
      done();
    });
  });
});

describe('Search', function() {
  var browser = new Browser({maxWait: 5000});
  // Ensure we have time for request to resolve, etc.
  this.timeout(20000);

  it('Should return results without search', function(done) {
    browser.visit('/', function() {
      assert.ok(browser.success);
      // There should be pagination on the top and at the bottom of a page
      browser.assert.elements('.pagination', {exactly: 2});
      browser.assert.elements('.search-results-item', {atLeast: 1, atMost: 20});
      done();
    });
  });

  it('Should find at least one item', function(done) {
    browser.visit('/', function() {
      assert.ok(browser.success);
      var searchPhrase = browser.text('.search-results-item:first-of-type h4');
      browser.fill('#filters_search', searchPhrase);
      browser.document.forms[0].submit();
      browser.wait().then(function() {
        browser.assert.elements('.search-results-item', {atLeast: 1});
        done();
      });
    });
  });
});

describe('Pagination', function() {
  var browser = new Browser({maxWait: 5000});
  // Ensure we have time for request to resolve, etc.
  this.timeout(2000);

  it('Should contain different items on a different pages', function(done) {
    browser.visit('/', function() {
      assert.ok(browser.success);
      browser.assert.elements('.search-results-item', {atLeast: 1, atMost: 20});
      var items1 = lodash.map(browser.document.querySelectorAll(
        '.search-results-item h4 a'
      ), function(item){
        return item.href;
      });
      browser.visit('/?page=2', function() {
        assert.ok(browser.success);
        browser.assert.elements('.search-results-item', {atLeast: 1, atMost: 20});
        var items2 = lodash.map(browser.document.querySelectorAll(
          '.search-results-item h4 a'
        ), function(item){
          return item.href;
        });
        var common = lodash.intersection(items1, items2);
        assert((common.length < items1.length) && (common.length < items2.length));
        done();
      });
    });
  });

  it('Should return 404 on non-existing page', function(done){
    browser.visit('/?page=100500', function() {
      assert(browser.statusCode == 404,
        'Status code should be 404 instead of ' + browser.statusCode);
      done();
    });
  });
});