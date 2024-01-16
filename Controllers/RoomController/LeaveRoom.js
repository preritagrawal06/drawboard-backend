const Room = require('../../Models/Room')

const LeaveRoom = (res, req)=>{
    const {username, code} = req.body;
    Room.findOneAndUpdate({code: code},{
        $pull:{
            members: username
        },
        $inc:{count: -1}
    }, {new: true}).then((room)=>{
        res.json({
            success: true,
            message: `${username} left the room`,
            room
        })
    }).catch((error)=>{
        res.json({
            success: false,
            message: "Internal error occured",
            err: error.message
        })
    })
}

module.exports = LeaveRoom