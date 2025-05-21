const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    nickname: String,
    isCPU: Boolean
});

const roomSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    owner: {
        type: String,
        required: true
    },
    players: [playerSchema],
    maxPlayers: {
        type: Number,
        required: true
    },
    gameStarted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600 // opzionale: scadenza dopo 1 ora
    }
});

// ✅ Questo evita l'errore OverwriteModelError
module.exports = mongoose.models.Room || mongoose.model('Room', roomSchema);
