'use strict';

var express = require('express');
var path = require('path');
var statics = path.join(__dirname, '/../public');

var router = express.Router();
router.use(express.static(statics));

// Some express middleware to prepare request
router.use(require('cookie-parser')());
router.use(require('body-parser').urlencoded({extended: true}));

// Middleware for restricting access to app
router.use(require('../middlewares/access-token'));

// Controllers
router.use(require('../controllers/trials'));
router.use(require('../controllers/pages'));

// 404 Page
router.use(require('../middlewares/not-found'));
// Error handler
router.use(require('../middlewares/errors'));

module.exports = router;
