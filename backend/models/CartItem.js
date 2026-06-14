const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  menuId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, default: 1 },
  userId: { type: String, default: "guest" } // optional: agar login system ho to
}, { 
  timestamps: true 
});

module.exports = mongoose.model("CartItem", cartItemSchema);