const User = require('../models/userModel');
const Product = require('../models/productModel');
const Cart = require('../models/cartModel');
const Order = require('../models/orderModel');
const asyncHandler = require('express-async-handler');
const generateToken = require('../config/jwtToken');
const jwt = require('jsonwebtoken');
const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    throw new Error('User are already exists');
  }
});
const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
      role: findUser.role,
    });
  } else {
    throw new Error('Invalid User');
  }
});

//get all user
const getallUser = asyncHandler(async (req, res) => {
  try {
    const { email } = req.user;
    const adminUser = await User.findOne({ email });
    let getUsers = [];
    if (adminUser.role == 'admin') {
      getUsers = await User.find();
      getUsers = getUsers.filter((e) => e.role != 'admin');
      res.json(getUsers);
    }
  } catch (err) {
    throw new Error(err);
  }
});

//delete cart
const deleteOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleteOrder = await Order.findByIdAndDelete(id);
    res.json({ deleteOrder });
  } catch (err) {
    throw new Error(err);
  }
});
// Them san pham vao gio hang
const userCart = asyncHandler(async (req, res) => {
  const { cart } = req.body;
  const { _id } = req.user;
  try {
    let products = [];
    const user = await User.findById(_id);
    const alreadyExsistCart = await Cart.findOne({ orderby: user._id });
    let newCart;
    let cartTotal = 0;
    if (alreadyExsistCart) {
      cartTotal = alreadyExsistCart.cartTotal;
      alreadyExsistCart.products.forEach((product) => {
        products.push(product);
      });
    }
    for (let i = 0; i < cart.length; i++) {
      let object = {};
      let sameProduct = -1;
      products.forEach((product, index) => {
        if (product.product.toString() === cart[i]._id) {
          sameProduct = index;
        }
      });
      let getPrice = await Product.findById(cart[i]._id);
      if (sameProduct >= 0) {
        products[sameProduct].count += Number(cart[i].count);
      } else {
        object.product = cart[i]._id;
        object.count = cart[i].count;
        object.title = cart[i].title;
        object.description = cart[i].description;
        object.price = getPrice.price;
        products.push(object);
      }
      cartTotal += getPrice.price * cart[i].count;
    }
    if (alreadyExsistCart) {
      newCart = await Cart.findByIdAndUpdate(
        alreadyExsistCart._id,
        {
          products,
          cartTotal,
          orderby: user?._id,
        },
        { new: true }
      );
    } else {
      newCart = await new Cart({
        products,
        cartTotal,
        orderby: user?._id,
      }).save();
    }
    res.json(newCart);
  } catch (err) {
    throw new Error(err);
  }
});

const getUserCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const cart = await Cart.find({ orderby: _id }).populate('products.product');
    res.json(cart);
  } catch (err) {
    throw new Error(err);
  }
});
const removeProductFromCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;
  try {
    const cart = await Cart.findOne({
      orderby: _id,
    });
    let i = -1;
    let listProduct = cart.products;
    console.log(cart);
    listProduct.forEach(async (item, index) => {
      const productId = item.product.toString();
      if (id == productId) {
        i = index;
      }
    });
    const productRemove = await Product.findById(id);
    const totalPriceFinal =
      cart.cartTotal - productRemove.price * listProduct[i].count;
    listProduct.splice(i, 1);
    const deleteProductCart = await Cart.findByIdAndUpdate(
      cart._id,
      {
        products: listProduct,
        cartTotal: totalPriceFinal,
        orderby: _id,
      },
      { new: true }
    );
    res.json(deleteProductCart);
  } catch (err) {
    throw new Error(err);
  }
});
const createOrder = asyncHandler(async (req, res) => {
  const { shippingInfor, orderItems, totalPrice } = req.body;
  const { _id } = req.user;
  try {
    const cart = await Cart.findOneAndRemove({ orderby: _id });
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (!product) {
        throw new Error(`Product with ID ${item.product} not found.`);
      }
      if (product.quantity < item.count) {
        throw new Error(`Insufficient quantity for product ${product.name}.`);
      }
    }
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      const updatedQuantity = product.quantity - item.count;
      const updatePromise = await Product.findByIdAndUpdate(item.product, {
        quantity: updatedQuantity,
      });
    }
    const order = await Order.create({
      shippingInfor,
      orderItems,
      totalPrice,
      user: _id,
    });
    res.json({
      order,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const getOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id)
      .populate('orderItems.product')
      .exec();
    res.json(order);
  } catch (err) {
    throw new Error(err);
  }
});
const getAllOrder = asyncHandler(async (req, res) => {
  try {
    const listOrder = await Order.find()
      .populate('orderItems.product')
      .populate('user')
      .exec();
    res.json(listOrder);
  } catch (err) {
    throw new Error(err);
  }
});
const getOrdersOfUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const userorders = await Order.find({ user: _id })
      .populate('orderItems.product')
      .exec();
    res.json(userorders);
  } catch (err) {
    throw new Error(err);
  }
});
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  try {
    const updateOrderStatus = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus: status,
      },
      {
        new: true,
      }
    );
    res.json(updateOrderStatus);
  } catch (err) {
    throw new Error(err);
  }
});
const author = asyncHandler(async (req, res) => {
  const { role } = req.body;
  const { id } = req.params;
  console.log(req.body, req.params);
  try {
    const { email } = req.user;
    const adminUser = await User.findOne({ email });
    if (adminUser.role == 'admin') {
      const updateUser = await User.findByIdAndUpdate(
        id,
        {
          role: role,
        },
        {
          new: true,
        }
      );
      res.json('Update successfully');
    } else res.json('Update error');
  } catch (err) {
    throw new Error(err);
  }
});
const getMonthIncome = asyncHandler(async (req, res) => {
  const arrayMonth = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  let d = new Date();
  let endDate = '';
  d.setDate(1);
  for (let index = 0; index < 11; index++) {
    d.setMonth(d.getMonth() - 1);
    endDate = arrayMonth[d.getMonth()] + ' ' + d.getFullYear();
  }
  const data = await Order.aggregate([
    {
      $match: {
        paidAt: {
          $lte: new Date(),
          $gte: new Date(endDate),
        },
      },
    },
    {
      $group: {
        _id: {
          month: { $month: '$paidAt' },
          year: { $year: '$paidAt' },
        },
        amount: { $sum: '$totalPrice' },
        count: { $sum: 1 },
        customers: { $addToSet: '$user' }, 
        productsSold: { $sum: { $sum: '$orderItems.count' } } 
      },
    },
    {
      $project: {
        _id: 1,
        amount: 1,
        count: 1,
        totalCustomers: { $size: '$customers' },
        productsSold: 1
      }
    }
  ]);
  res.json(data);
});

const getYearOrderCount = asyncHandler(async (req, res) => {
  const arrayMonth = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  let d = new Date();
  let endDate = '';
  d.setDate(1);
  for (let index = 0; index < 11; index++) {
    d.setMonth(d.getMonth() - 1);
    endDate = arrayMonth[d.getMonth()] + ' ' + d.getFullYear();
  }
  const data = await Order.aggregate([
    {
      $match: {
        paidAt: {
          $lte: new Date(),
          $gte: new Date(endDate),
        },
      },
    },
    {
      $group: {
        _id: {
          $month: '$paidAt',
        },
        count: { $sum: 1 },
        amount: { $sum: '$totalPrice' },
      },
    },
  ]);
  res.json(data);
});
const getTotalCustomerInYear = asyncHandler(async (req, res) => {
  const today = new Date();
  const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
  const lastDayOfYear = new Date(today.getFullYear(), 11, 31);
  const data = await Order.aggregate([
    {
      $match: {
        paidAt: {
          $gte: firstDayOfYear,
          $lte: lastDayOfYear,
        },
      },
    },
    {
      $group: {
        _id: '$user',
      },
    },
    {
      $group: {
        _id: null,
        totalCustomers: {
          $sum: 1,
        },
      },
    },
  ]);
  res.json(data);
});
const getTotalProductInYear = asyncHandler(async (req, res) => {
  const today = new Date();
  const firstDayOfYear = new Date(today.getFullYear(), 0, 1);

  const lastDayOfYear = new Date(today.getFullYear(), 11, 31);

  const data = await Order.aggregate([
    {
      $match: {
        paidAt: {
          $gte: firstDayOfYear,
          $lte: lastDayOfYear,
        },
      },
    },
    {
      $unwind: '$orderItems',
    },
    {
      $group: {
        _id: '$orderItems.product',
        totalSold: {
          $sum: '$orderItems.count',
        },
      },
    },
    {
      $group: {
        _id: null,
        totalQuantitySold: {
          $sum: '$totalSold',
        },
      },
    },
  ]);
  res.json(data);
});

const getTopSaleProduct = asyncHandler(async (req, res) => {
  const today = new Date();
  const firstDayOfYear = new Date(today.getFullYear(), 0, 1); 
  const lastDayOfYear = new Date(today.getFullYear(), 11, 31); 
  const data = await Order.aggregate([
    {
      $match: {
        paidAt: {
          $gte: firstDayOfYear,
          $lte: lastDayOfYear,
        },
      },
    },
    {
      $unwind: '$orderItems',
    },
    {
      $group: {
        _id: '$orderItems.product',
        totalSold: {
          $sum: '$orderItems.count',
        },
      },
    },
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: '_id',
        as: 'productInfo',
      },
    },
    {
      $unwind: '$productInfo',
    },
    {
      $project: {
        _id: 0,
        productName: '$productInfo.name',
        productImage: '$productInfo.images',
        productPrice: '$productInfo.price',
        totalSold: 1,
      },
    },
    {
      $sort: {
        totalSold: -1,
      },
    },
    {
      $limit: 4,
    },
  ]);
  res.json(data);
});
const momo = asyncHandler(async (req, res) => {
  if (req.body.resultCode === 0) {
    const orderId = req.body.orderId; 
    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        isPaid: 'Đã thanh toán',
      },
      {
        new: true,
      }
    );
    res.status(200).json({ message: 'Thanh toán thành công' });
  } else {
    res.status(400).json({ message: 'Thanh toán không thành công' });
  }
});
module.exports = {
  createUser,
  loginUserCtrl,
  getallUser,
  userCart,
  getUserCart,
  createOrder,
  removeProductFromCart,
  getAllOrder,
  deleteOrder,
  getOrder,
  getOrdersOfUser,
  updateOrderStatus,
  author,
  getMonthIncome,
  getYearOrderCount,
  getTotalCustomerInYear,
  getTotalProductInYear,
  getTopSaleProduct,
  momo
};
