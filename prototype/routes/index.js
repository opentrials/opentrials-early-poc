var express = require('express');
var path = require('path');
var statics = path.join(__dirname, '/../public');

var router = express.Router();
router.use(express.static(statics));
router.use(require('../controllers/trials'));
router.use(require('../controllers/pages'));
router.use(require('../controllers/errors'));

module.exports = router;
