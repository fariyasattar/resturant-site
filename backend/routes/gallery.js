const express = require('express')
const router = express.Router()
const GalleryImage = require('../models/GalleryImage')

router.get('/', async (req, res) => {
  const images = await GalleryImage.find()
  const data = images.map(i => ({ id: i._id, img: i.img, title: i.title, category: i.category }))
  res.json({ success: true, data })
})
module.exports = router