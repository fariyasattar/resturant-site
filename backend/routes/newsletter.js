const express = require('express')
const router = express.Router()
const Newsletter = require('../models/Newsletter')

router.post('/', async (req, res) => {
  try {
    const newSub = new Newsletter({ email: req.body.email })
    await newSub.save()
    res.status(201).json({ success: true, message: 'Subscribed' })
  } catch (err) {
    res.status(400).json({ success: false, error: 'Already subscribed' })
  }
})
module.exports = router