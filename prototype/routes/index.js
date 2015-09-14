var controllerIndex = require('../controllers/index');
var controllerContacts = require('../controllers/contacts');
var controllerAbout = require('../controllers/about');
var controllerTrial = require('../controllers/trial');

var notfoundHandler = require('../controllers/notfound');
var errorHandler = require('../controllers/error');

function configure(app) {
  app.get('/', controllerIndex);
  app.get('/contacts', controllerContacts);
  app.get('/about', controllerAbout);
  app.get('/trial/:id', controllerTrial);

  // Handle 404 error
  app.use(notfoundHandler);
  // Handle other errors and show HTTP 500
  app.use(errorHandler);
}

module.exports.configure = configure;