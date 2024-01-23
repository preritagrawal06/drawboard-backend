const Room = require('../../Models/Room')

module.exports = (io)=>{
    const UserJoin = function(data){
        const socket = this;
        const code = data.code
        const username = data.username
        try {
            Room.findOneAndUpdate({code: code},{
                $push:{
                    members: username
                },
                $inc: {count: 1}
            }, {new: true, runValidators: true, upsert: true})
                .then((room)=>{
                    socket.username = username
                    socket.roomCode = code
                    socket.join(code)
                    io.to(code).emit("user:join", room)
                }).catch((error)=>{
                    console.log(error.message)
                })
        } catch (error) {
            console.log("error occured internally")
        }
    }

    return {
        UserJoin
    }
}