var app = require('./app');
var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('Open Trials is being served at :' + port);
});
