var express = require('express');
var path = require('path');
var app = express();
var nunjucks  = require('nunjucks');
var views = path.join(__dirname, '/views');
var statics = path.join(__dirname, '/public');

app.use(express.static(statics));

nunjucks.configure(views, {
  autoescape: true,
  express: app
});

app.get('/', function(request, response) {
  response.render('index.html', {
    title: 'Hello, World!'
  });
});

module.exports = app;
