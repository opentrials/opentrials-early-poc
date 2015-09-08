var Browser = require('zombie');
var assert = require('chai').assert;
var app = require('../prototype/app');

process.env.NODE_ENV = 'test';
Browser.localhost('127.0.0.1', process.env.PORT || 3000);

before(function(done) {
  // Run the server
  app.listen(3000, function() { done(); });
});

describe('Page: About', function() {

  var browser = new Browser({maxWait: 5000});
  this.timeout(2000);

  it('Should contain text "About"', function(done) {
    browser.visit('/about', function() {
      assert.ok(browser.success);
      assert.equal(browser.text('h1'), 'About');
      done();
    });
  });

});
