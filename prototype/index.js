'use strict';

var app = require('./app');
var searchService = require('./services/search');

var port = app.get('config').get('appconfig:port');

searchService.init().then(function() {
  app.listen(port, function() {
    console.log('Open Trials is being served at :' + port);
  });
});
