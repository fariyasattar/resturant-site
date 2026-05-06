const express = require('express')
const router = express.Router()
const MenuItem = require('../models/MenuItems')


router.get('/', async (req, res) => {
  try {
    const { category } = req.query

    const filter = category && category!== 'All'
    ? { category, isAvailable: true }
      : { isAvailable: true }

    const items = await MenuItem.find(filter).sort({ createdAt: -1 })

    // Frontend ko 'id' chahiye, MongoDB '_id' deta hai
    const formattedItems = items.map(item => ({
      id: item._id,
      name: item.name,
      price: item.price,
      category: item.category,
      desc: item.desc,
      img: item.img
    }))

    res.json({
      success: true,
      data: formattedItems
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    })
  }
})

// POST - Naya item add karo
router.post('/', async (req, res) => {
  try {
    const newItem = new MenuItem(req.body)
    const saved = await newItem.save()

    res.status(201).json({
      success: true,
      data: {
        id: saved._id,
        name: saved.name,
        price: saved.price,
        category: saved.category,
        desc: saved.desc,
        img: saved.img
      }
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    })
  }
})

// DELETE - Item delete karo
router.delete('/:id', async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Item deleted' })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

module.exports = router