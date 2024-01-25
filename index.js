require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const { createServer } = require('http')
const { Server } = require('socket.io')

const httpServer = createServer(app)

app.use(cors())
app.use(express.json())

const io = new Server(httpServer, {
    cors:{
        origin: "*"
    }
})

const {UserJoin} = require('./Controllers/SocketController/UserJoin')(io)
const {UserLeave} = require('./Controllers/SocketController/UserLeave')(io)
const {MouseMove} = require('./Controllers/SocketController/mouseMove')(io)
const {MouseDraw}= require('./Controllers/SocketController/mouseDraw')(io)
const {MouseDown} = require('./Controllers/SocketController/mouseDown')(io)

const onConnection = (socket)=>{
    socket.on("user:new", UserJoin)
    socket.on("user:leave", UserLeave)
    socket.on("mouse:move", MouseMove)
    socket.on("mouse:draw", MouseDraw)
    socket.on("mouse:down", MouseDown)
    socket.on("disconnect", UserLeave)
}

io.on("connection", onConnection)

const roomRouter = require('./Routes/room.routes')
app.use('/api/room', roomRouter)

mongoose.set("strictQuery", false)
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to db")
    }).catch((err)=>{
        console.log(err.message)
    })
    
const port = process.env.PORT
httpServer.listen(port)