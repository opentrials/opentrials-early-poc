var express = require('express');
var path = require('path');
var app = express();
var views = path.join(__dirname, '/views');
var statics = path.join(__dirname, '/public');

app.use(express.static(statics));

app.get('/', function(request, response) {
  response.sendFile(path.join(views, '/base.html'));
});

module.exports = app;
