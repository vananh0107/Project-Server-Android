const express = require('express');
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getAllCategory,
} = require('../controller/categoryCtrl');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const { getQuantityProductCat } = require('../controller/productCtrl');
const router = express.Router();
router.post('/', authMiddleware, isAdmin, createCategory);
router.put('/:id', authMiddleware, isAdmin, updateCategory);
router.delete('/:id', authMiddleware, isAdmin, deleteCategory);
router.get('/count', getQuantityProductCat);
router.get('/:id', getCategory);
router.get('/', getAllCategory);
module.exports = router;