// load modules
var express = require('express');
var path = require('path');
var logger = require('morgan');
var app = express();

//require routes
var routes = require('./routes/index');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// apply the routes to our app
app.use('/', routes);


// add a listener
app.listen(3000, function() {
  console.log('Listening on port 3000!')
});
