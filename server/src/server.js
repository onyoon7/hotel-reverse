/*-------------------------------------------------------------------
  <server.js>
  Server entry point

  1. setup express
  2. setup middlewares
  3. setup routes
 -------------------------------------------------------------------*/
import express from 'express';
import db from './db';

const app = express();

// setup middlewares
import middleware from './config/middleware.js';
middleware(app, express);

// setup all the routes to the server
import routes from './config/routes.js';
routes(app, express);

// if a user provide PORT number, use it.
// else port number is 4444
app.set('port', process.env.PORT || 4444);

// now server running...
app.listen(app.get('port'), function() {
  console.log('Express started on http://localhost:'+app.get('port'),
              'press Ctrl-C to terminate.');
});

export default app;
