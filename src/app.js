const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const { addUser, getUser, getUsersOnPage } = require('./utils/user')
const { getPage, updatePage } = require('./utils/page')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const publicDirPath = path.join(__dirname, '../public')

app.use(express.static(publicDirPath))

io.on('connection', (socket) => {
    console.log('New web socket connection: ' + socket.id)

    socket.on('joinPage', (options, callback) => {
        console.log(socket.id + ' joined')
        const {error, user} = addUser({ id: socket.id, ...options} )
        if (error) {
            return callback(error)
        }

        socket.join(user.pagename)
        io.to(user.pagename).emit('pageUsers', {
            pagename: user.pagename,
            users: getUsersOnPage(user.pagename)
        })

        socket.emit('updatedCode', getPage(user.pagename))

        callback()
    })

    socket.on('codeUpdated', (code, callback) => {
        console.log(code)
        const user = getUser(socket.id)
        updatePage({
            pageName: user.pagename,
            pageData: code
        })
        socket.broadcast.emit('updatedCode', {
            pageName: user.pagename,
            pageData: code
        })
        callback()
    })

    socket.on('disconnect', () => {
        console.log('Web socket disconnected: ' + socket.id)
    })
})

server.listen(3000, () => {
    console.log('Server is up on port 3000')
})