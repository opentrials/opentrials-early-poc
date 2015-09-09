var searchService = require('../services/search');

module.exports = function(request, response) {
  var filterParams = request.query.filter || {};
  var items = searchService.search(filterParams.apply ? filterParams : {});

  response.render('index.html', {
    title: 'Main',
    filterParams: filterParams,
    trials: items
  });
};
