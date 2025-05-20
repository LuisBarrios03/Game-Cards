const express = require('express');
const router = express.Router();
const crypto = require('crypto');

// GET: mostra form di creazione stanza
router.get('/create', (req, res) => {
    res.render('Pages/CreateJoinRoom.hbs', {
        title: 'Crea una stanza',
        style: 'pinellaCreateRoom',
    });
});

// POST: crea la stanza e redirige alla lobby
router.post('/create', (req, res) => {
    const { nickname, playerCount, cpuCount } = req.body;
    const roomCode = crypto.randomBytes(3).toString('hex').toUpperCase(); // esempio: 4D2A8F

    // Salva la stanza in memoria (può diventare un DB)
    req.app.locals.rooms = req.app.locals.rooms || {};
    req.app.locals.rooms[roomCode] = {
        players: [{ nickname }],
        cpuCount: parseInt(cpuCount),
        maxPlayers: parseInt(playerCount),
        isStarted: false
    };

    // Salva nickname in sessione
    req.session.user = { nickname };

    res.redirect(`/pinella/room/${roomCode}`);
});

module.exports = router;
