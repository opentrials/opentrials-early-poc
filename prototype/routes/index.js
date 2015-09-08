var controllerIndex = require('../controllers/index');
var controllerContacts = require('../controllers/contacts');
var controllerAbout = require('../controllers/about');
var controllerTrial = require('../controllers/trial');

function configure(app) {
  app.get('/', controllerIndex);
  app.get('/contacts', controllerContacts);
  app.get('/about', controllerAbout);
  app.get('/trial/:id', controllerTrial);
}

module.exports.configure = configure;