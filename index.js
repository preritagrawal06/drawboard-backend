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

var count = 0

io.on("connection", (socket)=>{
    console.log("new connection detected")
    socket.on("user-connection", (data)=>{
        count = count+1
        io.emit("mouse-connection",{
            userCount: count,
            username: data.name
        })
    })
    socket.on("mouse-move", (data)=>{
        // console.log(data)
        // socket.broadcast.emit - broadcast the msg to all the clients except the sender. 
        // socket.emit() - sends msg to the sender
        // io.emit() - sends msg to all the connected client
        socket.broadcast.emit("mouse-location", data)  
    })
})

const roomRouter = require('./Routes/room.routes')
app.use('/api/room', roomRouter)

mongoose.set("strictQuery", false)
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(8000, ()=>{
            console.log("Connected to db")
        })
    }).catch((err)=>{
        console.log(err.message)
    })

httpServer.listen(5000)