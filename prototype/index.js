'use strict';

var app = require('./app');
var searchService = require('./services/search');

var port = app.get('config').get('appconfig:port');

app.get('models').umzug.up().then(function() {
  console.log('Migration done.');
  searchService.init().then(function() {
    app.listen(port, function() {
      console.log('Open Trials is being served at :' + port);
    });
  }).catch(console.log.bind(console));
}).catch(console.log.bind(console));
