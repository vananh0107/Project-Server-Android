const mongoose = require('mongoose');
const { Schema } = mongoose;
const discountSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  percentage: {
    type: Number,
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
});
module.exports = mongoose.model('Discount', discountSchema);
