const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const publicDirPath = path.join(__dirname, '../public')

app.use(express.static(publicDirPath))

io.on('connection', (socket) => {
    console.log('New web socket connection: ' + socket.id)

    socket.on('codeUpdated', (code, callback) => {
        console.log(code)
        socket.broadcast.emit('updatedCode', {code})
        callback()
    })

    socket.on('disconnect', () => {
        console.log('Web socket disconnected: ' + socket.id)
    })
})

server.listen(3000, () => {
    console.log('Server is up on port 3000')
})