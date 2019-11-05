const logger = require('server-side-tools').logger;
const db = require('../models').db;

const { Controller } = require('./');

class AddressController extends Controller {
  constructor () {
    super();
    // TODO:
  }

  checkCityState (req, res) {
    if (!req.query.state && !req.query.city) {
      res.status(400).json(
        this.messageResponse('Please provide city or state get params')
      );
      return false;
    }
    return true;
  }

  async checkNewAddress (req, res) {
    if(!req.body.name ||
        !req.body.street ||
        !req.body.city ||
        !req.body.state ||
        !req.body.country) {
      res.status(400).json(
        this.messageResponse('Please provide name, street, city, state, country in message body')
      );
      return false;
    } else {
      // TODO: check if address is valid against
      //
      return true;
    }
  }

  async updateSingle (req, res) {
    if (await this.checkNewAddress (req, res)){
      try {
        const id = req.params.id;
        const query = {
          name: req.body.name.toLowerCase(),
          street: req.body.street.toLowerCase(),
          city: req.body.city.toLowerCase(),
          state: req.body.state.toLowerCase(),
          country: req.body.country.toLowerCase(),
        };
        await db.collection(`Address`).updateOne(
          {_id: id},
          query,
          (err, res) => {
            if (err) throw err;
            logger.info('1 document deleted');
          });
        //TODO: update
      } catch (err) {
        res.status(500).json(
          this.messageResponse(err.message)
        );
      }
    }
  }

  async deleteSingle (req, res) {
    try {
      await db.collection(`Address`).deleteOne(
        {_id: id},
        (err, res) => {
          if (err) throw err;
          logger.info('1 document deleted');
        });
    } catch (err) {
      res.status(500).json(
        this.messageResponse(err.message)
      );
    }
  }

  async createSingle (req, res) {
    if (await this.checkNewAddress (req, res)){
      try {
        const query = {
          name: req.body.name.toLowerCase(),
          street: req.body.street.toLowerCase(),
          city: req.body.city.toLowerCase(),
          state: req.body.state.toLowerCase(),
          country: req.body.country.toLowerCase(),
        };
        await db.collection(`Address`).insertOne(
          {},
          (err, res) => {
            if (err) throw err;
            logger.info('1 document inserted');
          });
      } catch (err) {
        res.status(500).json(
          this.messageResponse(err.message)
        );
      }
    }
  }

  async getCollection (req, res) {
    if (this.checkCityState (req, res)){

      const query = {
        city: req.query.city.toLowerCase(),
        state: req.query.state.toLowerCase(),
      };
      try {
        await db.collection(`Address`)
        .find(query)
        .toArray((error, addresses) => {
          if (error) throw error;
          res.status(200).json(addresses);
        });
      } catch (err) {
        res.status(500).json(
          this.messageResponse(err.message)
        );
      }
    }
  }


}

module.exports.default = new AddressController();
