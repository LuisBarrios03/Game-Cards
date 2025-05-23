// utils/generateRoomCode.js
const { v4: uuidv4 } = require('uuid');

function generateRoomCode() {
    return uuidv4().replace(/-/g, '').toUpperCase(); // 32 caratteri alfanumerici
}

module.exports = generateRoomCode;
