const path = require('path')
const express = require('express')
const multer = require('multer')
const { protect } = require('../middleware/authMiddleware')
// const uploadpath = '../public/uploads/'
const uploadpath = '../frontend/public/images'

const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadpath)

  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {

    return cb(null, true)

  } else {
    cb('Images only!')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

router.post('/file', upload.single('image'), (req, res) => {
  const file  = (req.file.path.split('public/'))[1]
  // console.log('upload : ',file)

  res.send(`/${file}`)
})

module.exports =  router
