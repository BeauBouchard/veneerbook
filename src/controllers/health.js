const logger = require('server-side-tools').logger;
const format = require('server-side-tools').format;

const pkjson = require('../../package.json');

const { Controller } = require('./');

class HealthController extends Controller {
  constructor () {
    super();
    // TODO:
  }

  getHealth (req, res) {
    const time = process.uptime();
    const uptime = format.toHHMMSS(time + '');
    res.status(200).send({ data: {uptime: uptime, version: pkjson.version} });
  }
}

module.exports.default = new HealthController();
