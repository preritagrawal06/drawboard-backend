const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roomSchema = new Schema({
    admin:{
        required: true,
        type: String
    },
    members: [{
        type: String,
        required: true
    }],
    count:{
        default: 0,
        required: true,
        type: Number,
    },
    code:{
        required: true,
        type: String
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Rooms', roomSchema)