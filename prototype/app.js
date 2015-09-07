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

var controllerIndex = require('./controllers/index');
var controllerContacts = require('./controllers/contacts');
var controllerAbout = require('./controllers/about');

app.get('/', controllerIndex);
app.get('/contacts', controllerContacts);
app.get('/about', controllerAbout);

module.exports = app;
