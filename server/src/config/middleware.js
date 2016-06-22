let fs = require('fs');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let url = require('url');
let path = require('path');

// setup a log file that will log all requests in Apache combined format
// to the file access.log

// In production
const accessLogStream =
    fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});

export default (app, express) => {
  app.use(morgan('dev'));

  // Handle json format and x-www-form-urlencoded
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  })
  // we have to determine the exact location of static files
  // app.use(express.static(__dirname + '/../../client'));
};
