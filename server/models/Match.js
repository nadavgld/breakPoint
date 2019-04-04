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
        required: true,
        default: Date.now()
    }
});

module.exports = Match = mongoose.model('match', MatchSchema);