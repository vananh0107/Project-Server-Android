const express = require('express');
const {
  createDiscount,
  updateDiscount,
  deleteDiscount,
  getDiscount,
  getAllDiscount,
} = require('../controller/discountCtrl');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();
router.post('/', authMiddleware, isAdmin, createDiscount);
router.put('/:id', authMiddleware, isAdmin, updateDiscount);
router.delete('/:id', authMiddleware, isAdmin, deleteDiscount);
router.get('/', getAllDiscount);
router.get('/:id', getDiscount);
module.exports = router;