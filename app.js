require('dotenv').config()
const express = require('express')

const videoRouter = require('./routes/video.routes')
const app = express()

app.use(express.json())

app.use('/api/v1/video',videoRouter)

module.exports = app