const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Booking Schema
const bookingSchema = new mongoose.Schema({
  service: { 
    type: String, 
    required: true 
  },
  serviceId: { 
    type: String, 
    required: true 
  },
  name: { 
    type: String, 
    required: true, 
    minlength: 3,
    trim: true 
  },
  phone: { 
    type: String, 
    required: true, 
    match: /^\d{11}$/ 
  },
  guests: { 
    type: Number, 
    required: true, 
    min: 1 
  },
  date: { 
    type: Date, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled'], 
    default: 'pending' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

// POST - Nayi booking create karo
router.post('/', async (req, res) => {
  try {
    const { service, serviceId, name, phone, guests, date } = req.body;
    
    // Validation
    if (!service || !serviceId || !name || !phone || !guests || !date) {
      return res.status(400).json({ 
        message: 'Saari fields zaroori hain' 
      });
    }

    // Date validation - past date na ho
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      return res.status(400).json({ 
        message: 'Past ki date select nahi kar sakte' 
      });
    }

    // Phone validation
    if (!/^\d{11}$/.test(phone)) {
      return res.status(400).json({ 
        message: 'Phone number 11 digits ka hona chahiye' 
      });
    }

    // Duplicate booking check - same phone + same date
    const existingBooking = await Booking.findOne({ 
      phone, 
      date: selectedDate,
      status: { $ne: 'cancelled' }
    });

    if (existingBooking) {
      return res.status(400).json({ 
        message: 'Is number se is date pe pehle hi booking hai' 
      });
    }

    // Save to DB
    const booking = new Booking({
      service,
      serviceId,
      name: name.trim(),
      phone,
      guests: parseInt(guests),
      date: selectedDate
    });

    await booking.save();
    
    console.log('✅ New Booking Saved:', booking._id);
    
    res.status(201).json({
      success: true,
      message: 'Booking successful',
      bookingId: booking._id,
      data: booking
    });
    
  } catch (error) {
    console.error('❌ Booking Error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error. Dobara try karein' 
    });
  }
});

// GET - Saari bookings lao - Admin panel ke liye
router.get('/', async (req, res) => {
  try {
    const { status, date } = req.query;
    let filter = {};
    
    if (status) filter.status = status;
    if (date) {
      const queryDate = new Date(date);
      queryDate.setHours(0, 0, 0, 0);
      const nextDay = new Date(queryDate);
      nextDay.setDate(nextDay.getDate() + 1);
      filter.date = { $gte: queryDate, $lt: nextDay };
    }
    
    const bookings = await Booking.find(filter)
      .sort({ createdAt: -1 })
      .limit(100);
      
    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Error fetching bookings' 
    });
  }
});

// GET - Single booking by ID
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ 
        success: false,
        message: 'Booking nahi mili' 
      });
    }
    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Error fetching booking' 
    });
  }
});

// PATCH - Booking status update karo
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid status' 
      });
    }
    
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!booking) {
      return res.status(404).json({ 
        success: false,
        message: 'Booking nahi mili' 
      });
    }
    
    res.json({ 
      success: true,
      message: 'Status updated',
      data: booking 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Error updating status' 
    });
  }
});

module.exports = router;