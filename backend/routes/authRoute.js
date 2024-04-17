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
  getallUser
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
router.delete(
  '/delete-product-cart/:id',
  authMiddleware,
  removeProductFromCart
);
router.post('/cart', authMiddleware, userCart);
module.exports = router;