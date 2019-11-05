const express = require('express');
const logger = require('server-side-tools').logger;

const healthController = require('../controllers/health').default;

const router = express('Router');

logger.info('setting up routes for /health');

/**
 * GET health response
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @return Returns a health response
 */
router.get('/', (req, res) => {
  healthController.getHealth(req, res);
});

/**
 * POST UPDATE DELETE OPTION health response
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @return catches all other requests
 */
router.all('/', (req, res) => {
  healthController.methodNotAllowed(req, res);
});

module.exports.default = router;
