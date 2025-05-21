const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true
    },
    roomCode: {
        type: String,
        required: true
    },
    socketId: {
        type: String,
        default: null // verrà impostato al collegamento socket
    },
    isCPU: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Player', playerSchema);
