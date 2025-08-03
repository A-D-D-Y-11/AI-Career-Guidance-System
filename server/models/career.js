const mongoose = require('mongoose');

const CareerSchema = new mongoose.Schema({
  name: String,
  email: String,
  interest: String,
  goals: String,
  user: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Career', CareerSchema);
