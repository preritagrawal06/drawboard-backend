const Room = require('../../Models/Room')

module.exports = (io)=>{
    const UserLeave = function(data){
        console.log("user leaving");
        Room.findOneAndUpdate({code: data.code},{
            $pull:{
                members: data.name
            },
            $inc:{count: -1}
        }, {new: true}).then((room)=>{
            io.to(data.code).emit("user:left", room)
            
        }).catch((error)=>{
            console.log(error.message)
        })
    }
    return{
        UserLeave
    }
}