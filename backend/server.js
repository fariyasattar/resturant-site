const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const cartRoutes = require("./routes/cart.js")  // import ki jagah require

const app = express()

// 1. Middleware
app.use(cors({ 
  origin: "*",
  
}))
app.use(express.json())

// 2. MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Error:', err))

// 3. Routes - order matter karta hai
app.use('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() })
})

app.use('/api/menu', require('./routes/menu'))
console.log('Menu route type: ', typeof require('./routes/menu'))
app.use('/api/bookings', require('./routes/booking'))
app.use('/api/orders', require('./routes/order'))
app.use('/api/gallery', require('./routes/gallery'))
app.use('/api/reservation', require('./routes/reservation'))
app.use('/api/newsletter', require('./routes/newsletter'))
app.use("/api/cart", cartRoutes)
app.use('/api/bill', require('./routes/bill'))

// 4. 404 Handler - sabse last me hona chahiye
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' })
})

// 5. Start Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))