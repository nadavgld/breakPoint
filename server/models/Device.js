const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Create Schema
const DeviceSchema = new Schema({  
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    zone: {
        type: Number,
        required: true
    },
    minPlayers: {
        type: Number,
        required: true,
        default: 1
    },
    maxPlayers: {
        type: Number,
        required: true
    },
    lobby: {
        type: Array,
        default: []
    },
    activeMatchId: {
        type: String,
        default: ''
    }
});

module.exports = Device = mongoose.model('device', DeviceSchema);