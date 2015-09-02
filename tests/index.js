var Browser = require('zombie');
var app = require('../prototype/app');
// var assert = require('chai').assert;

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

});
