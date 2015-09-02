var express = require('express');
var path = require('path');
var app = express();
var templates = path.join(__dirname, '/src/templates');
var statics = path.join(__dirname, '/dist');

app.use(express.static(statics));

app.get('/', function(request, response) {
  response.sendFile(path.join(templates, '/index.html'));
});

module.exports = app;
