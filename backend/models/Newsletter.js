const mongoose = require('mongoose')
const NewsletterSchema = new mongoose.Schema({
  email: { type: String, unique: true }, subscribedAt: { type: Date, default: Date.now }
})
module.exports = mongoose.model('Newsletter', NewsletterSchema)