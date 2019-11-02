const logger = require('server-side-tools').logger;

const { Controller } = require('./');

class AddressController extends Controller {
  constructor () {
    super();
    // TODO:
  }

  getSingleAddress (req, res) {
    res.status(200).json(this.messageResponse('Hello World'));
  }

}

module.exports.default = new AddressController();
