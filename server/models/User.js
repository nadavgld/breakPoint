const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({  
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: false
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
    }
});

module.exports = User = mongoose.model('user', UserSchema);