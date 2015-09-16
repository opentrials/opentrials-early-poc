var express = require('express');

var searchService = require('../services/search');
var paginationService = require('../services/pagination');
var url = require('url');
var trialsService = require('../services/trials');

function trialsList(request, response, next) {
  if (request.query.page < 1) {
    return next();
  }

  var requestUrl = url.parse(request.url, true);
  var pagination = paginationService.create({
    currentPage: request.query.page,
    itemsPerPage: request.query.ipp
  });
  var filterParams = request.query.filter || {};
  filterParams = filterParams.apply ? filterParams : {};
  trialsService.getItems({
    order: [
      ['id', 'ASC']
    ],
    offset: (pagination.currentPage - 1) * pagination.itemsPerPage,
    limit: pagination.currentPage * pagination.itemsPerPage
  }).then(function(data) {
    pagination.itemsCount = data.count;
    if (request.query.page > pagination.pageCount) {
      return next();
    }

    response.render('index.html', {
      title: 'Find a trial',
      subtitle: 'Proin mattis non neque vitae dapibus',
      filterParams: filterParams,
      trials: data.items,
      pagination: pagination,
      getUrlForPage: function (page) {
        if (page > 1) {
          requestUrl.query.page = page;
        } else {
          delete requestUrl.query.page;
        }
        delete requestUrl.search;
        return url.format(requestUrl);
      }
    });
  }).catch(function(){
    return next();
  });
}

function trialDetails(request, response, next) {
  trialsService.getItem(request.params.id).then(function(item) {
    if (!item) {
      // Continue processing request
      return next();
    }
    response.render('trial.html', {
      title: 'Trial #' + request.params.id + ' ' + item.publicTitle,
      subtitle: item.scientificTitle,
      item: item
    });
  }).catch(function() {
    return next();
  });
}

var router = express.Router();
router.get('/', trialsList);
router.get('/trial/:id', trialDetails);

module.exports = router;
