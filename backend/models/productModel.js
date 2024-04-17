const mongoose = require('mongoose');
const imageSchema = new mongoose.Schema({
  url: String,
  publicId: String,
});
var productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category' 
    },
    quantity: {
      type: Number,
      required: true,
    },
    images: [
      {
        type: imageSchema,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model('Product', productSchema);
