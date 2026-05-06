const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// POST /api/orders - Naya order banao
router.post('/', async (req, res) => {
  try {
    const { items, customerName } = req.body;
    
    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.qty), 0);
    
    const newOrder = new Order({
      items,
      totalAmount,
      customerName: customerName || 'Guest'
    });
    
    await newOrder.save();
    res.status(201).json({ success: true, data: newOrder, message: 'Order placed successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/orders - Saare orders dekho - admin ke liye
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/orders/:id - Status update karo
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    );
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;