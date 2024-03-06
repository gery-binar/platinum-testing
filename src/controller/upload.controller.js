const upload = (req, res) => {
  return res.json({imageName: req.file.filename})
}

module.exports = {
  upload
}
