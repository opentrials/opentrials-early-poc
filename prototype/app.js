var express = require('express');
var path = require('path');
var app = express();
var nunjucks  = require('nunjucks');
var views = path.join(__dirname, '/views');
var statics = path.join(__dirname, '/public');
var routes = require('./routes/index');

app.use(express.static(statics));

nunjucks.configure(views, {
  autoescape: true,
  express: app
});

routes.configure(app);

module.exports = app;
