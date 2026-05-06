const express = require('express')
const router = express.Router()
const Reservation = require('../models/Reservation')

router.post('/', async (req, res) => {
  try {
    const newRes = new Reservation(req.body)
    await newRes.save()
    res.status(201).json({ success: true, message: 'Reservation successful' })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
})
module.exports = router