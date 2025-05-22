// socket/socketHandler.js
module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('Nuova connessione:', socket.id);

        socket.on('joinRoom', ({ roomCode, nickname }) => {
            socket.join(roomCode);
            console.log(`${nickname} si è unito alla stanza ${roomCode}`);
            io.to(roomCode).emit('playerJoined', { nickname });
        });

        socket.on('disconnect', () => {
            console.log('Disconnessione:', socket.id);
        });
    });
};
