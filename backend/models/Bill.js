const mongoose = require('mongoose')

const BillItemSchema = new mongoose.Schema({
  menuId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
  name: String,
  price: Number,
  qty: Number
})

const BillSchema = new mongoose.Schema({
  items: [BillItemSchema],
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  subtotal: { type: Number, required: true },
  tax: { type: Number, required: true },
  total: { type: Number, required: true },
  status: { type: String, default: 'Paid' },
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Bill', BillSchema)