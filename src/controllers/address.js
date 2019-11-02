const logger = require('server-side-tools').logger;

class Controller {
  constructor () {
    // TODO:
  }

  messageResponse(msg) {
    const response = {
      'data': [],

    };

    response.data.push(msg);
    return response;
  }

  /**
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   */
  notFound(req, res) {
    res.status(404).json(this.messageResponse('Not Found'));
  }

  /**
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   */
  methodNotAllowed(req, res) {
    res.status(405).json(this.messageResponse('Method Not Allowed'));
  }
}

class AddressController extends Controller {
  constructor () {
    super();
    // TODO:
  }

  createSingleAddress () {
    // TODO:
  }

  deleteSingleAddress () {
    // TODO:
  }

  updateSingleAddress () {
    // TODO:
  }

  getSingleAddress (req, res) {
    res.status(200).json(this.messageResponse('Hello World'));
  }

}

module.exports.default = new AddressController();
