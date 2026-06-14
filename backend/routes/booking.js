const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  service: { type: String, required: true },
  serviceId: { type: String, required: true },
  name: { type: String, required: true, minlength: 3, trim: true },
  phone: { type: String, required: true, match: /^\d{11}$/ },
  guests: { type: Number, required: true, min: 1 },
  date: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled'], 
    default: 'pending' 
  },
  createdAt: { type: Date, default: Date.now }
});


bookingSchema.index({ phone: 1, date: 1, status: 1 });

const Booking = mongoose.model('Booking', bookingSchema);


const getStartOfDayUTC = (dateStr) => {
  return new Date(dateStr + 'T00:00:00.000Z');
};


router.post('/', async (req, res) => {
  try {
    const { service, serviceId, name, phone, guests, date } = req.body;
    
    
    if (!service || !serviceId || !name || !phone || !guests || !date) {
      return res.status(400).json({ message: 'Saari fields zaroori hain' });
    }

    
    const selectedDate = getStartOfDayUTC(date);
    const today = getStartOfDayUTC(new Date().toISOString().split('T')[0]);
    
    if (selectedDate < today) {
      return res.status(400).json({ message: 'Past ki date select nahi kar sakte' });
    }

    
    if (!/^\d{11}$/.test(phone)) {
      return res.status(400).json({ message: 'Phone number 11 digits ka hona chahiye' });
    }

   
    const existingBooking = await Booking.findOne({ 
      phone, 
      date: selectedDate,
      status: { $ne: 'cancelled' }
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'Is number se is date pehle hi booking hai' });
    }

    
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
    // Mongoose validation error ko handle karo
    if (error.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: 'Server error. Dobara try karein' });
  }
});

// GET - Saari bookings lao - Admin panel ke liye
router.get('/', async (req, res) => {
  try {
    const { status, date } = req.query;
    let filter = {};
    
    if (status) filter.status = status;
    if (date) {
      const queryDate = getStartOfDayUTC(date);
      const nextDay = new Date(queryDate);
      nextDay.setUTCDate(nextDay.getUTCDate() + 1);
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
    console.error('❌ Fetch Error:', error);
    res.status(500).json({ success: false, message: 'Error fetching bookings' });
  }
});

// GET - Single booking by ID
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid booking ID' });
    }
    
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking nahi mili' });
    }
    res.json({ success: true, data: booking });
  } catch (error) {
    console.error('❌ Get Error:', error);
    res.status(500).json({ success: false, message: 'Error fetching booking' });
  }
});

// PATCH - Booking status update karo
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid booking ID' });
    }
    
    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }
    
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking nahi mili' });
    }
    
    res.json({ 
      success: true,
      message: 'Status updated',
      data: booking 
    });
  } catch (error) {
    console.error('❌ Update Error:', error);
    res.status(500).json({ success: false, message: 'Error updating status' });
  }
});

module.exports = router;