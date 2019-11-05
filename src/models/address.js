const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
});

class AddressModel extends Model {
  constructor () {
    super(
      {
        name: 'Address',
        model: addressSchema
      });
    logger.info('AddressModel initialized')
  }
}
