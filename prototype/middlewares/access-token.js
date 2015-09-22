'use strict';

var config = require('../config');

module.exports = function(request, response, next) {
  if (config.get('access:isProtected')) {
    var accessToken = config.get('access:token');
    if (request.session.token !== accessToken) {
      var hasErrors = false;
      if (request.method == 'POST') {
        if (request.body && (request.body.token === accessToken)) {
          request.session.token = accessToken;
          response.redirect(request.url);
          return;
        } else {
          hasErrors = true;
        }
      }
      response.status(403).render('access-token.html', {
        title: 'Restricted access',
        hasErrors: hasErrors
      });
      return;
    }
  }
  return next();
};
