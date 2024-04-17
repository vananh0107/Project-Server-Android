const express = require('express');
const router = express.Router();
const {
  createProduct,
  getProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  getProductByCategory
} = require('../controller/productCtrl');
const { isAdmin, authMiddleware } = require('../middleware/authMiddleware');
router.post('/', authMiddleware, isAdmin, createProduct);
router.get('/', getAllProduct);
router.get('/category/:id', getProductByCategory);
router.put('/:id', authMiddleware, isAdmin, updateProduct);
router.get('/:id', getProduct);
router.delete('/:id', authMiddleware, isAdmin, deleteProduct);
module.exports = router;