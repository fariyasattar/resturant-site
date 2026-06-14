const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');

// Add to cart
router.post('/add', async (req, res) => {
  try {
    const { menuId, name, price, qty } = req.body;

    let item = await CartItem.findOne({ menuId });
    if (item) {
      item.qty += qty;
      await item.save();
    } else {
      item = await CartItem.create({ menuId, name, price, qty });
    }

    res.json({ success: true, item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update quantity
router.put('/update', async (req, res) => {
  try {
    const { menuId, qty } = req.body;
    
    const item = await CartItem.findOneAndUpdate(
      { menuId }, 
      { qty }, 
      { new: true }
    );
    
    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }
    
    res.json({ success: true, item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Remove single item
router.delete('/remove/:menuId', async (req, res) => {
  try {
    const item = await CartItem.findOneAndDelete({ menuId: req.params.menuId });
    
    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }
    
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Clear entire cart
router.delete('/clear', async (req, res) => {
  try {
    await CartItem.deleteMany({});
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;