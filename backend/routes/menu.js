const express = require('express');
const MenuItem = require('../models/MenuItems');
const router = express.Router();

// GET all menu items with category filter
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    
    let filter = {};
    if (category && category !== 'All') {
      filter.category = category;
    }

    const items = await MenuItem.find(filter);
    
    // Frontend ko yehi format chahiye
    res.json({ success: true, data: items });
    
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST new menu item - admin only
router.post('/', async (req, res) => {
  try {
    const item = new MenuItem(req.body);
    await item.save();
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PATCH toggle availability
router.patch('/:id/toggle', async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    item.isAvailable = !item.isAvailable;
    await item.save();
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;