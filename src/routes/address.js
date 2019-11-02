const express = require('express');
const logger = require('server-side-tools').logger;

const addressController = require('../controllers/address').default;

const router = express('Router');

logger.info('setting up routes for /address');

/**
 * GET address response
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @return Returns single address object
 */
router.get('/', (req, res) => {
  addressController.getSingleAddress(req, res);
});

module.exports.default = router;
