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

const onConnection = (socket)=>{
    socket.on("user:new", UserJoin)
    socket.on("user:leave", UserLeave)
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