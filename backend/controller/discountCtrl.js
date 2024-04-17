const Discount = require('../models/discountModel');
const asyncHandler = require('express-async-handler');
const createDiscount = asyncHandler(async (req, res) => {
  try {
    const newDiscount = await Discount.create(req.body);
    res.json(newDiscount);
  } catch (err) {
    throw new Error(err);
  }
});
const getDiscount = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getDiscount = await Discount.findById(id);
    res.json(getDiscount);
  } catch (err) {
    throw new Error(err);
  }
});
const getAllDiscount = asyncHandler(async (req, res) => {
  try {
    const getAllDiscount = await Discount.find();
    res.json(getAllDiscount);
  } catch (err) {
    throw new Error(err);
  }
});
const updateDiscount = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const updateDiscount = await Discount.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateDiscount);
  } catch (err) {
    throw new Error(err);
  }
});
const deleteDiscount = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleteDiscount = await Discount.findByIdAndDelete(id);
    res.json("Delete successfully!!!");
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = {
  createDiscount,
  updateDiscount,
  deleteDiscount,
  getDiscount,
  getAllDiscount,
};