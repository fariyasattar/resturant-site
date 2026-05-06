const mongoose = require('mongoose')

const MenuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: String,
    required: true,
    enum: ['Rice', 'Beef', 'Kabab', 'Drinks', 'Desserts', 'Bread', 'Chicken']
  },
  desc: { type: String, required: true }, 
  img: { type: String, required: true }, 
  isAvailable: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('MenuItem', MenuItemSchema)