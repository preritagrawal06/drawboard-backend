const Room = require('../../Models/Room')

module.exports = (io)=>{
    const UserJoin = function(data){
        const socket = this;
        const code = data.code
        try {
            Room.findOne({code: code})
                .then((room)=>{
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