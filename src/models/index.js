const mongoose = require('mongoose');
const logger = require('server-side-tools').logger;
const path = require('path');
const fs = require('fs');

const basename = path.basename(module.filename);
const models = {};

class Model {
  constructor (params) {
    if (!params.name || !params.model) { /* error */}
    this.model = mongoose.model(params.name, params.model);
  }
}

// for the connection url, make sure its
// mongodb://{mongo container name}/{dbname}
const serverURL = process.env.DATABASE_URL || 'mongodb://mongo/veneerbook';

mongoose.connect(serverURL, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', (error) => logger.error(error));

db.once('open', () => logger.info('connected to database'));

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const fullPath = path.join(__dirname, file);
    const fileName = file.substring(0, file.length - 3);

    models[fileName] = fullPath;
  });

  const seeds =
    {
      name: 'sample address 1',
      street: '111 Varick St',
      city: 'New York',
      state: 'NY',
      country: 'USA',
    };

  db.collection(`Address`).insertOne(seeds, (err, res) => {
    if (err) throw err;
    logger.info("1 document inserted");
  });


module.exports = { Model, db, models };
