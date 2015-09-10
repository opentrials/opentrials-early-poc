var Browser = require('zombie');
var app = require('../prototype/app');
var assert = require('chai').assert;

process.env.NODE_ENV = 'test';
Browser.localhost('127.0.0.1', process.env.PORT || 3000);

before(function(done) {
  // Run the server
  app.listen(3000, function() { done(); });
});

describe('Core', function() {

  var browser = new Browser({maxWait: 5000});
  // Ensure we have time for request to reoslve, etc.
  this.timeout(2000);

  it('is alive', function(done) {
    browser.visit('/', function() {
      browser.assert.success();
      done();
    });
  });

  it('is alive', function(done) {
    browser.visit('/', function() {
      browser.assert.success();
      done();
    });
  });

  it('Should contain text "Main"', function(done) {
    browser.visit('/', function() {
      assert.ok(browser.success);
      assert.equal(browser.text('h1'), 'Main');
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
    var trialId = 10;

    browser.visit('/trial/' + trialId, function() {
      assert.ok(browser.success);
      assert.include(browser.text('h1'), '#' + trialId);
      done();
    });
  });


});
