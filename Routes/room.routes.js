const router = require('express').Router()
const CreateRoom = require('../Controllers/RoomController/CreateRoom')
const JoinRoom = require('../Controllers/RoomController/JoinRoom')
const LeaveRoom = require('../Controllers/RoomController/LeaveRoom')

router.post('/create', CreateRoom)
router.post('/join', JoinRoom)
router.post('/leave', LeaveRoom)

module.exports = router