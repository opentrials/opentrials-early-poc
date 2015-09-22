'use strict';

var express = require('express');

var paginationService = require('../services/pagination');
var trialsService = require('../services/trials');

function trialsList(request, response, next) {
  // Initialize pagination
  var pagination = paginationService.create({
    currentPage: request.query.page,
    itemsPerPage: request.query.ipp,
    baseUrl: request.url
  });

  // Initialize filter values
  var filterParams = request.query.filter || {};
  filterParams = filterParams.apply ? filterParams : null;

  // Get items and render page
  trialsService.getItems(pagination, filterParams).then(function(items) {
    response.render('index.html', {
      title: 'Find a trial',
      subtitle: 'Proin mattis non neque vitae dapibus',
      filterParams: filterParams,
      trials: items,
      pagination: pagination
    });
  }).catch(function() {
    return next();
  });
}

function trialDetails(request, response, next) {
  trialsService.getItem(request.params.id).then(function(item) {
    response.render('trial.html', {
      title: 'Trial #' + request.params.id + ' ' + item.publicTitle,
      subtitle: item.scientificTitle,
      trial: item
    });
  }).catch(function() {
    return next();
  });
}

var router = express.Router();
router.get('/', trialsList);
router.get('/trial/:id', trialDetails);

module.exports = router;
