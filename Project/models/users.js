const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nickname: { type: String, required: true, unique: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gamesPlayed: { type: Number, default: 0 },
    gamesWon:    { type: Number, default: 0 },
    gamesLost:   { type: Number, default: 0 }
});

module.exports = mongoose.model('User', userSchema);
