const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

// I wrote these, the repo only adds winston as a dep
const logger = require('server-side-tools').logger;
const format = require('server-side-tools').format;

const pkjson = require('../package.json');

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

/**
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {Next} next - Express Next object
 */
app.get('/health', (req, res, next) => {
  const time = process.uptime();
  // I just like this tight format for short lived servers
  // typical heroku dynamo will be <1hour
  const uptime = format.toHHMMSS(time + '');
  res.status(200).send({ data: {uptime: uptime, version: pkjson.version} });
});

// heroku dynamically assigns your app a port,
// so you can't set the port to a fixed number.
const server = app.listen(process.env.PORT || 5000, function () {
  const host = server.address().address;
  const port = server.address().port;

  logger.info(`api listening at http://${host}:${port}`);
});

module.exports = server;
