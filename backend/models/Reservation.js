const mongoose = require('mongoose')

const ReservationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  guests: { type: Number, default: 2 },
  occasion: { type: String },
  message: { type: String }
}, { timestamps: true })

// Ye line add karo - same phone + same date = duplicate nahi hoga
ReservationSchema.index({ phone: 1, date: 1 }, { unique: true })

module.exports = mongoose.model('Reservation', ReservationSchema)