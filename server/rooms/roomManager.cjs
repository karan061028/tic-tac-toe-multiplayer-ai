const rooms = {};

function joinRoom(roomId, socketId) {
  if (!rooms[roomId]) {
    rooms[roomId] = [];
  }

  if (rooms[roomId].length >= 2) {
    return "FULL";
  }

  rooms[roomId].push(socketId);

  return rooms[roomId].length === 1 ? "X" : "O";
}

function getRoom(roomId) {
  return rooms[roomId] || [];
}

function removePlayer(socketId) {
  for (let roomId in rooms) {
    rooms[roomId] = rooms[roomId].filter(id => id !== socketId);

    if (rooms[roomId].length === 0) {
      delete rooms[roomId];
    }
  }
}

module.exports = {
  joinRoom,
  getRoom,
  removePlayer
};