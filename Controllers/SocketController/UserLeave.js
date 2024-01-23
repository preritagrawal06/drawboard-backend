const Room = require('../../Models/Room')

module.exports = (io)=>{

    const UserLeave = function(){
        const socket = this
        const code = socket.roomCode
        const name = socket.username
        Room.findOneAndUpdate({code: code},{
            $pull:{
                members: name
            },
            $inc:{count: -1}
        }, {new: true}).then((room)=>{
            io.to(code).emit("user:left", {room:room, name: name})
            if(room.members.length === 0){
                Room.findOneAndDelete({code: code}).then(()=>{console.log("deleted");}).catch(err => console.log(err.message))
            }
        }).catch((error)=>{
            console.log(error.message)
        })
    }
    return{
        UserLeave
    }
}