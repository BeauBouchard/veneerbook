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
  addressController.getCollection(req, res);
});

/**
 * POST address response
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @return Returns created address object 201 status
 */
router.post('/', (req, res) => {
  addressController.createSingle(req, res);
});

/**
 * DELETE address response
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @return Returns 200 if deleted
 */
router.delete('/:id', (req, res) => {
  addressController.deleteSingle(req, res);
});

/**
 * PUT address response
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @return Returns 200 if updated
 */
router.put('/:id', (req, res) => {
  addressController.updateSingle(req, res);
});

/**
 * OPTION address response
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @return catches all other requests
 */
router.all('/', (req, res) => {
  addressController.methodNotAllowed(req, res);
});

module.exports.default = router;
