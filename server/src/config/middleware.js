import fs from 'fs';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';

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

  app.use('/assets', express.static(__dirname + '/../../admin/assets'));
  app.use('/app', express.static(__dirname + '/../../admin/app'));
  app.use('/assets', express.static(__dirname + '/../../manager/assets'));
  app.use('/app', express.static(__dirname + '/../../manager/app'));
};
