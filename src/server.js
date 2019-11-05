const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
// I wrote these, the repo only adds winston as a dep
const logger = require('server-side-tools').logger;

const routes = require('./routes');

const db = require('./models').db;

const router = express('Router');

const app = express();

// adding helmet
app.use(helmet());

// using bodyParser to parse json bodies into js objects
app.use(bodyParser.json());

/** set up cors middleware
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {Next} next - Express Next object
 */
app.use((req, res, next) => {
  // NOTE: this is very open and generous for demonstration purous
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, Origin, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'GET');
  next();
});

logger.info('turning on app...');

// this will load all files from the `routes` folder as a new route
Object.keys(routes).forEach((route) => {
  app.use(`/${route}`, require(`${routes[route]}`).default);
});

/**
 * 404
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @return catches all other requests
 */
app.use('/', (req, res) => {
  res.status(404).json({data:['Not Found']});
});


// heroku dynamically assigns your app a port,
// so you can't set the port to a fixed number.
const server = app.listen(process.env.PORT || 5000, function () {
  const host = server.address().address;
  const port = server.address().port;

  logger.info(`api listening at http://${host}:${port}`);
});

module.exports = server;
