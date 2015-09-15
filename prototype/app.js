var express = require('express');
var path = require('path');
var app = express();
var nunjucks  = require('nunjucks');
var views = path.join(__dirname, '/views');
var router = require('./routes/index');

app.use(router);

nunjucks.configure(views, {
  autoescape: true,
  express: app
});

module.exports = app;
