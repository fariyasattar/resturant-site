const express = require('express')
const router = express.Router()
const Reservation = require('../models/Reservation')

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, date, time, guests, occasion, message } = req.body

    // Required fields check
    if (!name || !phone || !date || !time) {
      return res.status(400).json({ success: false, message: "Name, phone, date, time are required" })
    }

    // Phone validation
    if (!/^03\d{9}$/.test(phone)) {
      return res.status(400).json({ success: false, message: "Phone must start with 03 and be 11 digits" })
    }

    // Past date check - time zone issue fix
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const bookingDate = new Date(date + 'T00:00:00')
    
    if (bookingDate < today) {
      return res.status(400).json({ success: false, message: "Cannot book past date" })
    }

    const reservation = new Reservation({ 
      name, 
      email: email || "", 
      phone, 
      date, 
      time, 
      guests: parseInt(guests) || 2, 
      occasion: occasion || "Casual Dining",
      message: message || "" 
    })
    
    await reservation.save()

    res.status(201).json({ 
      success: true, 
      message: "Reservation confirmed", 
      data: reservation 
    })

  } catch (err) {
    // Duplicate key error
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "You already have a booking on this date"
      })
    }

    // Validation error
    if (err.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: err.message })
    }

    console.error(err)
    res.status(500).json({ success: false, message: "Server error" })
  }
})

module.exports = router