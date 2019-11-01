const express = require('express');
const logger = require('server-side-tools').logger;
const format = require('server-side-tools').format;

const pkjson = require('../../package.json');

const router = express('Router');

logger.info('setting up routes for /health');

/**
 * GET health response
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @return Returns a health response
 */
router.get('/', (req, res) => {
  // building a whole controller for this would
  // be a little much...
  const time = process.uptime();
  const uptime = format.toDDHHMMSS(time + '');
  res.status(200).send({ data: {uptime: uptime, version: pkjson.version} });

});

module.exports.default = router;
