'use strict';

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('cookie-session');
var statics = path.join(__dirname, '/../public');
var config = require('../config');

var router = express.Router();
router.use(express.static(statics));

// Some express middleware to prepare request
router.use([
  cookieParser(),
  session(config.get('session')),
  bodyParser.urlencoded({extended: true}),

  // Middleware for restricting access to app
  require('../middlewares/access-token'),

  // Controllers
  require('../controllers/trials'),
  require('../controllers/pages'),

  // 404 Page
  require('../middlewares/not-found'),
  // Error handler
  require('../middlewares/errors')
]);

module.exports = router;
