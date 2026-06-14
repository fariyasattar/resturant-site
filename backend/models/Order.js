const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [{
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
    name: String,
    price: Number,
    qty: { type: Number, default: 1 }
  }],
  totalAmount: Number,
  status: { 
    type: String, 
    enum: ['Pending', 'Preparing', 'Completed', 'Cancelled'], 
    default: 'Pending' 
  },
  customerName: { type: String, default: 'Guest' },
  phone: String,      // add kiya
  address: String     // add kiya
}, { timestamps: true }); // createdAt, updatedAt auto handle karega

module.exports = mongoose.model('Order', orderSchema);