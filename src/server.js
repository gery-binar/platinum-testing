const express = require('express')
const cors = require('cors')
const { route } = require('./route')

const server = express()

server.use(express.json())
server.use(cors({origin: "*"}))
server.use(route)

module.exports = { server }
