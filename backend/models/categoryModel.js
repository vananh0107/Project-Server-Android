const mongoose = require('mongoose');
const ImageSchema = new mongoose.Schema({
  url: String,
  publicId: String
});
var categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: ImageSchema
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Category', categorySchema);
