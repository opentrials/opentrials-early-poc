var searchService = require('../services/search');
var paginationService = require('../services/pagination');
var url = require('url');

module.exports = function(request, response) {
  var requestUrl = url.parse(request.url, true);
  var pagination = paginationService.create({
    currentPage: request.query.page,
    itemsPerPage: request.query.ipp
  });
  var filterParams = request.query.filter || {};
  var items = searchService.search(filterParams.apply ? filterParams : {}, pagination);

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
};
