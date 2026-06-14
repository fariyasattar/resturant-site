const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const CartItem = require('../models/CartItem');

// POST /api/orders - Cart se order banao aur cart clear karo
router.post('/', async (req, res) => {
  try {
    const { customerName, phone, address } = req.body;
    
    // Cart se items uthao
    const cartItems = await CartItem.find();
    if (cartItems.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
    
    const newOrder = await Order.create({
      items: cartItems,
      totalAmount,
      customerName: customerName || 'Guest',
      phone,
      address
    });
    
    // Order banne ke baad cart clear
    await CartItem.deleteMany({});

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