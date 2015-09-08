var trialsModel = require('../models/trial');

module.exports = function(request, response) {
  response.render('index.html', {
    title: 'Main',
    trials: trialsModel.findAll()
  });
};
