'use strict';

var express = require('express');

function pageAbout(request, response) {
  response.render('about.html', {
    title: 'About'
  });
}

var router = express.Router();
router.get('/about', pageAbout);

module.exports = router;
