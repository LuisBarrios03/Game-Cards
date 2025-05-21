// 📁 routes/pinella.js
const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const Player = require('../models/player');
const isAuthenticated = require('../middlewares/isAuthenticated');
const generateRoomCode = require('../utils/generateRoomCode');

// ✅ Crea stanza
router.post('/pinella/create', isAuthenticated, async (req, res) => {
    const { playerCount, cpuCount } = req.body;
    const nickname = req.session.user.nickname;
    const totalPlayers = parseInt(playerCount);
    const totalCPUs = parseInt(cpuCount);

    try {
        // 1. Genera codice stanza unico
        let roomCode;
        do {
            roomCode = generateRoomCode();
        } while (await Room.findOne({ code: roomCode }));

        // 2. Crea stanza
        const newRoom = new Room({
            code: roomCode,
            owner: nickname,
            players: [{ nickname, isCPU: false }],
            maxPlayers: totalPlayers,
            gameStarted: false
        });

        // 3. Aggiungi CPU (se richiesto)
        for (let i = 1; i <= totalCPUs; i++) {
            newRoom.players.push({ nickname: `CPU-${i}`, isCPU: true });
        }

        await newRoom.save();

        // 4. Aggiungi player anche nella collezione "players" per tracking socket
        await Player.create({
            nickname,
            roomCode,
            socketId: null, // verrà aggiornato al collegamento
            isCPU: false
        });

        res.redirect(`/pinella/wait/${roomCode}`);
    } catch (error) {
        console.error('Errore creazione stanza:', error);
        res.status(500).send('Errore nella creazione della stanza');
    }
});

module.exports = router;
