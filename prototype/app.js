'use strict';

var express = require('express');
var path = require('path');
var app = express();
var nunjucks = require('nunjucks');
var nunjucksGlobals = require('nunjucks/src/globals');
var views = path.join(__dirname, '/views');
var router = require('./routes/index');
var config = require('./config');
var models = require('./models');

app.set('config', config);
app.set('models', models);

app.use(router);

nunjucksGlobals.isNumeric = function(n) {
  return isFinite(parseFloat(n));
};

nunjucks.configure(views, {
  autoescape: true,
  express: app
});

module.exports = app;
