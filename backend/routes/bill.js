const express = require('express')
const router = express.Router()
const MenuItem = require('../models/MenuItems')
const Bill = require('../models/Bill')

router.post('/generate', async (req, res) => {
  try {
    const { cartItems, customerName, phone, address } = req.body

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ success: false, message: "Cart empty hai" })
    }

    let subtotal = 0
    let verifiedItems = []

    for (let item of cartItems) {
      const dbItem = await MenuItem.findById(item._id)
      if (!dbItem) return res.status(400).json({ success: false, message: `${item.name} nahi mila` })
      if (!dbItem.isAvailable) return res.status(400).json({ success: false, message: `${item.name} out of stock hai` })

      subtotal += dbItem.price * item.qty
      verifiedItems.push({
        menuId: dbItem._id,
        name: dbItem.name,
        price: dbItem.price,
        qty: item.qty
      })
    }

    const tax = Math.round(subtotal * 0.1)
    const total = subtotal + tax

    const bill = await Bill.create({
      items: verifiedItems,
      customerName,
      phone,
      address,
      subtotal,
      tax,
      total,
      status: 'Paid'
    })

    res.json({ success: true, bill })

  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router