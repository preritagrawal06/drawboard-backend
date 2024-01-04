const Room = require('../../Models/Room')

function generateRandomNumber() {
    return Math.floor(Math.random() * 900000) + 100000;
}

const CreateRoom = (req, res)=>{

    var code = generateRandomNumber();
    const {admin} = req.body
    
    const room = new Room({
        admin,
        code,
        members: [admin],
        count: 1,
    })

    room.save()
        .then((room)=>{
            res.json({
                success: true,
                message: "Room created successfully",
                room
            })
        }).catch((err)=>{
            res.json({
                success: false,
                message:err.message
            })
        })
}

module.exports = CreateRoom