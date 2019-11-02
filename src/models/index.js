const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  subscribedChannel: {
    type: String,
    required: true
  },
  subscribeDate: {
    type: Date,
    required: true,
    default: Date.now
  }
})


class AddressModel {

  constructor () {
    this.model = mongoose.model('Address', addressSchema);
  }
}

module.exports =
