const express = require('express');
const router = express.Router();
const {
  createUser,
  loginUserCtrl,
  userCart,
  getUserCart,
  createOrder,
  removeProductFromCart,
  getAllOrder,
  getOrder,
  getOrdersOfUser,
  updateOrderStatus,
  author,
  getallUser,
  deleteOrder,
  getMonthIncome,
  getYearOrderCount,
  getTotalCustomerInYear,
  getTotalProductInYear,
  getTopSaleProduct,
  momo
} = require('../controller/userCtrl');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
router.post('/register', createUser);
router.post('/login', loginUserCtrl);
router.post('/cart/create-order', authMiddleware, createOrder);
router.get('/all-orders', authMiddleware, isAdmin, getAllOrder);
router.get('/cart', authMiddleware, getUserCart);
router.get('/carts', authMiddleware, getOrdersOfUser);
router.get('/order/:id', authMiddleware, getOrder);
router.put('/role/:id', authMiddleware, isAdmin,author);
router.put('/order/update/:id', authMiddleware, isAdmin, updateOrderStatus);
router.get('/all-user', authMiddleware, isAdmin, getallUser);
router.get('/month-order', authMiddleware, isAdmin, getMonthIncome);
router.get('/year-order', authMiddleware, isAdmin, getYearOrderCount);
router.get('/year-customer', authMiddleware, isAdmin, getTotalCustomerInYear);
router.get('/year-product', authMiddleware, isAdmin, getTotalProductInYear);
router.get('/top-product', authMiddleware, isAdmin, getTopSaleProduct);
router.post('/momo',authMiddleware, momo);
router.delete(
  '/delete-product-cart/:id',
  authMiddleware,
  removeProductFromCart
);
router.delete('/order/:id', authMiddleware, isAdmin,deleteOrder)
router.post('/cart', authMiddleware, userCart);
module.exports = router;