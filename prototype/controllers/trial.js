var trialModel = require('../models/trial');

module.exports = function(request, response) {
  var item = trialModel.findById(request.params.id);
  response.render('trial.html', {
    title: item.publicTitle + ' (' + item.scientificTitle + ')',
    item: JSON.stringify(item)
  });
};
