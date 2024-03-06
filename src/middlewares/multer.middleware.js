const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './assets/uploaded')
  },
  filename: function (req, file, cb) {
    const extension = file.originalname.match(/.*(\..*)/)[1]
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueName + extension)
  }
})

const multerMiddleware = multer({ storage })

module.exports = {
  multerMiddleware
}
