var fs = require('fs');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var url = require('url');
var path = require('path');
var request = require('request');

// setup a log file that will log all requests in Apache combined format
// to the file access.log

var accessLogStream = 
    fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});

module.exports = function (app, express) {
  app.use(morgan('combined', {stream: accessLogStream}));

  // Handle json format and x-www-form-urlencoded
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  // we have to determine the exact location of static files
  app.use(express.static(__dirname + '/../../client'));
};

/*--------------------------------------------------------------------
  Middleware can be thought of as a pipe that water flows through.
  Water starts at the top opening of the pipe, gets transformed as it falls through,
  and then it is spit out the bottom of the pipe where another pipe could be waiting for it.

  The water in this example is Express's `request` object, and the transformation
  is just a function passed to `app.use`. Any function passed into `app.use`
  will get run on every single request that your server receives

  The order of middleware is defined matters quite a bit! Requests flow through
  middleware functions in the order they are defined. This is useful because
  many times  middleware function is responsible for modifying the `request`
  object in some way so that the next middleware function (or route handler)
  has access to whatever the previous one just did.

  Middleware is useful when you want to do something for every request
  that hits your server. Logging and parsing are two operations
  commonly found in a middleware stack.
------------------------------------------------------------------------*/