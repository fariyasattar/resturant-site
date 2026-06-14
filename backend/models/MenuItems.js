const mongoose = require('mongoose')

const MenuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  desc: { type: String, default: "" },
  img: { type: String, default: "" },
  isAvailable: { type: Boolean, default: true }
})

module.exports = mongoose.model('MenuItem', MenuItemSchema)