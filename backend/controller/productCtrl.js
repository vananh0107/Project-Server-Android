const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const asyncHandler = require('express-async-handler');
const createProduct = asyncHandler(async (req, res) => {
  try {
    const categoryID = await Category.find({ name: req.body.category });
    req.body.category = categoryID[0]._id;
    let { image, ...data } = req.body;
    data.images = [image];
    const newProduct = await Product.create(data);
    res.json(newProduct);
  } catch (err) {
    throw new Error(err);
  }
});
const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const findProduct = await Product.findById(id);
    res.json(findProduct);
  } catch (err) {
    throw new Error(err);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleteProduct = await Product.findByIdAndDelete(id);
    res.json('Delete successfully');
  } catch (err) {
    throw new Error(err);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const categoryID = await Category.find({ name: req.body.category });
    req.body.category = categoryID[0]._id;
    let { image, ...data } = req.body;
    if (image == 'delete successfully') data.images = [];
    else data.images = [image];
    const updateProduct = await Product.findByIdAndUpdate(id, data, {
      new: true,
    });
    res.json('Update successfully');
  } catch (err) {
    throw new Error(err);
  }
});

const getAllProduct = asyncHandler(async (req, res) => {
  try {
    //Filtering
    const queryObj = { ...req.query };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((field) => delete queryObj[field]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    let query = Product.find(JSON.parse(queryStr));
    //Sorting

    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    //limiting the fields
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    //pagination
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) throw new Error('This page is not exsist');
    }
    const product = await query;
    res.json(product);
  } catch (err) {
    throw new Error(err);
  }
});
const getProductByCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.find({ category: id });
    res.json(product);
  } catch (err) {
    throw new Error(err);
  }
});
const getQuantityProductCat = asyncHandler(async (req, res) => {
  try {
    const count = await Category.aggregate([
      {
        $lookup: {
          from: 'products',
          localField: 'title',
          foreignField: 'category',
          as: 'products',
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          image: '$image',
          totalProducts: { $size: '$products' },
        },
      },
    ]);
    res.json(count);
  } catch (err) {
    throw new Error(err);
  }
});
module.exports = {
  createProduct,
  getProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  getQuantityProductCat,
  getProductByCategory,
};
