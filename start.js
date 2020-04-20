const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const { addSocketListeners } =  require('./socketUtilities')

const port = process.env.PORT || 4001
const index = require('./routes/index')

const app = express()

app
  .use('/api', require('./api'))
  
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4001')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
  })

const server = http.createServer(app)
  
const io = socketIo(server)

io.on('connection', socket => {
  console.log('New client connected')
  addSocketListeners(socket, io)
})

server.listen(port, () => console.log(`Listening on port ${port}`))
