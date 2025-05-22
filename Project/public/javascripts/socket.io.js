
const socket = io();

// Esempio di join automatico (puoi adattarlo)
const nickname = "{{user.nickname}}";
const roomCode = "{{room.code}}"; // Assicurati che il dato sia passato alla view

if (nickname && roomCode) {
    socket.emit('joinRoom', { roomCode, nickname });
}

socket.on('playerJoined', ({ nickname }) => {
    console.log(`${nickname} si è unito!`);
    // qui puoi aggiornare la UI
});