const router = require('express').Router()
const CreateRoom = require('../Controllers/RoomController/CreateRoom')
const JoinRoom = require('../Controllers/RoomController/JoinRoom')

router.post('/create', CreateRoom)
router.post('/join', JoinRoom)

module.exports = router