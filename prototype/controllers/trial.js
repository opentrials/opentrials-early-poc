module.exports = function(request, response) {

  response.render('trial.html', {
    title: 'Trial #' + request.params.id,
    id: request.params.id
  });

};
