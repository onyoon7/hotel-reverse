/*-------------------------------------------------------------------
  <server.js>
  Server entry point

  1. setup express
  2. setup middlewares
  3. setup routes
 -------------------------------------------------------------------*/
var express = require('express');
var db = require('./db');

var app = express();

// setup middlewares
require('./config/middleware.js')(app, express);

// setup all the routes to the server
require('./config/routes.js')(app, express);

// if a user provide PORT number, use it.
// else port number is 4444
app.set('port', process.env.PORT || 4444);

// now server running...
app.listen(app.get('port'), function() {
    console.log("Express started on http://localhost:" +
        app.get('port') + '; press Ctrl-C to terminate.');
});

