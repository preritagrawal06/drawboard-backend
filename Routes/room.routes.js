const router = require('express').Router()
const CreateRoom = require('../Controllers/RoomController/CreateRoom')

router.post('/create', CreateRoom)

module.exports = router