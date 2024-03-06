const express = require('express')
const { upload } = require('./controller/upload.controller')
const { helloWorld } = require('./controller/home.controller')
const {multerMiddleware} = require('./middlewares/multer.middleware')
const { register, login } = require('./controller/auth.controller')
const { jwtMiddleware } = require('./middlewares/login.middleware')

const swaggerUiExpress = require('swagger-ui-express')
const swaggerJson = require('../swagger.json')

const fs = require("fs")
const YAML = require('yaml')
const swaggerYamlFile  = fs.readFileSync(`${__dirname}/../swagger.yml`, 'utf8')
const swaggerYamlParsed = YAML.parse(swaggerYamlFile)

const route = express.Router()
route.post('/upload', multerMiddleware.single('image'), upload)
route.get('/', helloWorld)

route.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerJson))
route.use('/docs-yaml', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerYamlParsed))

// AUTH ROUTE
const authRoute = express.Router()
authRoute.post('/register', register)
authRoute.post('/login' ,login)

// apply middleware jwt
authRoute.get('/test', jwtMiddleware, (req, res) => {
  res.json({
    status: 200,
    // return data user dari objek req
    // req.user terpopulate karna kita menggunakan
    // middleware jwtMiddleware
    user: req.user,
  })
})

route.use('/auth', authRoute)


module.exports = { route }
