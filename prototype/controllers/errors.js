'use strict';

var express = require('express');

function notFoundHandler(request, response, next) {
  response.status(404).render('notfound.html', {
    title: 'Page could not be found'
  });
  return next();
}

function errorHandler(error, request, response, next) {
  response.status(404).render('error.html', {
    title: 'Something went wrong...',
    error: error
  });
  return next();
}

var router = express.Router();
router.use(notFoundHandler);
router.use(errorHandler);

module.exports = router;
