const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

// Middleware
app.use(cors()) // Sab allow kar dega dev me
app.use(express.json())

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Error:', err))

// Sirf Booking Route - Baaki comment kar do
app.use('/api/bookings', require('./routes/booking'))

// app.use('/api/menu', require('./routes/menu'))
// app.use('/api/gallery', require('./routes/gallery'))
// app.use('/api/reservation', require('./routes/reservation'))
// app.use('/api/newsletter', require('./routes/newsletter'))
// app.use('/api/orders', require('./routes/order'))

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))