var trialModel = require('../models/trial');

module.exports = function(request, response, next) {
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
};
