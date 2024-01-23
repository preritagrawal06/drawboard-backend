const Room = require('../../Models/Room')

const JoinRoom = (req, res) => {
    const {username, room_code} = req.body
    try {
        
        Room.findOne({code: room_code}).then((room)=>{
            if(room.count >= 4){
                res.json({
                    success: false,
                    message: "Max limit reached!!"
                })
            }
            else{
                Room.findOne({code: room_code}).then((room)=>{
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
            }
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