var express = require('express');

var searchService = require('../services/search');
var paginationService = require('../services/pagination');
var url = require('url');
var trialModel = require('../models/trial');

function trialsList(request, response) {
  var requestUrl = url.parse(request.url, true);
  var pagination = paginationService.create({
    currentPage: request.query.page,
    itemsPerPage: request.query.ipp
  });
  var filterParams = request.query.filter || {};
  filterParams = filterParams.apply ? filterParams : {};
  var items = searchService.search(filterParams, pagination);

  response.render('index.html', {
    title: 'Find a trial',
    subtitle: 'Proin mattis non neque vitae dapibus',
    filterParams: filterParams,
    pagination: pagination,
    getUrlForPage: function(page) {
      if (page > 1) {
        requestUrl.query.page = page;
      } else {
        delete requestUrl.query.page;
      }
      delete requestUrl.search;
      return url.format(requestUrl);
    },
    trials: items
  });
}

function trialDetails(request, response, next) {
  var item = trialModel.findById(request.params.id);
  if (!item) {
    // Continue processing request
    return next();
  }
  response.render('trial.html', {
    title: 'Trial #' + request.params.id + ' ' + item.publicTitle,
    subtitle: item.scientificTitle,
    item: item
  });
}

var router = express.Router();
router.get('/', trialsList);
router.get('/trial/:id', trialDetails);

module.exports = router;
