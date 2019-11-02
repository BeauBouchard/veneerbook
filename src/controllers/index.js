const path = require('path');
const fs = require('fs');

const basename = path.basename(module.filename);
const controllers = {};

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const fullPath = path.join(__dirname, file);
    const fileName = file.substring(0, file.length - 3);

    controllers[fileName] = fullPath;
  });


/**
 * @class Controller
 * This class will be an extendable factory for other controllers
 **/
class Controller {
  constructor () {
    // TODO:
  }

  /**
   * @method messageResponse
   * @param {String} msg - a message for the given response
   * @param {Object} data - will attach any object as data,
   *                        will default to an empty array.
   * @return {Object}
   */
  messageResponse(msg, data = []) {
    const response = {
      'message': msg,
      'data': data,
    };

    return response;
  }

  /**
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   */
  methodNotAllowed(req, res) {
    res.status(405).json(this.messageResponse('Method Not Allowed'));
  }
}

module.exports = {Controller, controllers};
