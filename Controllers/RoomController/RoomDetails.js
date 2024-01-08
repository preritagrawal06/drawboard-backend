const Room = require('../../Models/Room')

const RoomDetails = (req, res)=>{
    
    const {code} = req.body
    
    try {
        Room.findOne({code: code})
            .then((room)=>{
                res.json({
                    success: true,
                    message: "Room details fetched",
                    room
                })
            }).catch((error)=>{
                res.json({
                    success: false,
                    message: error.message
                })
            })
    } catch (error) {
        res.json({
            success: false,
            message: "Internal error occured"
        })
    }
}

module.exports = RoomDetails