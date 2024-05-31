const Category = require('../models/categoryModel');
const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');
const createCategory = asyncHandler(async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.json(newCategory);
  } catch (err) {
    throw new Error(err);
  }
});
const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getCategory = await Category.findById(id);
    res.json(getCategory);
  } catch (err) {
    throw new Error(err);
  }
});
const getAllCategory = asyncHandler(async (req, res) => {
  try {
    const getAllCategory = await Category.aggregate([
      { $sort: { title: 1, _id: 1 } },
    ]);
    res.json(getAllCategory);
  } catch (err) {
    throw new Error(err);
  }
});
const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const updateCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json('Update successfully');
  } catch (err) {
    throw new Error(err);
  }
});
const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const rs=await Product.deleteMany({ category: id });
    await Category.findByIdAndDelete(id);
    res.json('Delete successfully!!!');
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getAllCategory,
};
