const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Create Schema
const MatchSchema = new Schema({  
    deviceId: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now()
    },
    duration: {
        type: Number,
        default: 30
    },
    players: {
        type: Array,
        required: true
    } 
});

module.exports = Match = mongoose.model('match', MatchSchema);