const mongoose = require('mongoose')
const GalleryImageSchema = new mongoose.Schema({
  img: String, title: String, category: String
})
module.exports = mongoose.model('GalleryImage', GalleryImageSchema)