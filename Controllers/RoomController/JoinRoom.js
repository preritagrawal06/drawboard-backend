const Room = require('../../Models/Room')

const JoinRoom = (req, res) => {
    const {username, room_code} = req.body
    console.log(room_code);
    try {
        Room.findOneAndUpdate({code: room_code}, {
            $push:{
                members: username
            },
            $inc: {count: 1}
        }, {new: true}).then((room)=>{
            res.json({
                success: true,
                message: "You have joined the room",
                room
            })
        }).catch((err)=>{
            res.json({
                success: false,
                message: err.message
            })
        })
    } catch (error) {
        console.log("error occured");
        res.json({
            success: false,
            message: error.message
        })
    }
}

module.exports = JoinRoom