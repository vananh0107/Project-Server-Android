const mongoose = require('mongoose');
const imageSchema = new mongoose.Schema({
  url: String,
  publicId: String,
});
var categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: imageSchema,
      required: true,
    },
    description: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Category', categorySchema);
