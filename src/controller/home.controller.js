const { generateHelloWorld } = require('../services/home.service')

/**
 * 1. Tidak boleh ada business logic
 * 2. Hanya boleh ada logic pemanggilan service
 * 3. Hanya boleh ada logic return response
 * 4. Hanya boleh ada logic validasi
 */
const helloWorld = (req, res) => {
  const responseMessage = generateHelloWorld()

  res.json({
    message: responseMessage
  })
}

module.exports = {
  helloWorld
}
