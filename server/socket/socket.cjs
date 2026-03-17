const rooms = {};

function setupSocket(io) {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // 🔥 JOIN ROOM WITH NAME
    socket.on("joinRoom", ({ roomId, name }) => {

      if (!rooms[roomId]) {
        rooms[roomId] = [];
      }

      // ❌ Room full
      if (rooms[roomId].length >= 2) {
        socket.emit("roomFull");
        return;
      }

      const playerSymbol = rooms[roomId].length === 0 ? "X" : "O";

      const player = {
        id: socket.id,
        name,
        symbol: playerSymbol
      };

      rooms[roomId].push(player);

      socket.join(roomId);

      console.log(`${name} joined room ${roomId} as ${playerSymbol}`);

      // 🎮 Assign player
      socket.emit("playerAssigned", playerSymbol);

      // 👥 Send players
      io.to(roomId).emit("playersUpdate", rooms[roomId]);

      // 🔥 IMPORTANT: SEND INITIAL TURN
      io.to(roomId).emit("turnUpdate", "X"); // X always starts
    });

    // 🔥 HANDLE MOVE (FIXED)
    socket.on("makeMove", ({ roomId, index, symbol }) => {

      const nextTurn = symbol === "X" ? "O" : "X";

      // 🔥 SEND TO BOTH PLAYERS (not socket.to)
      io.to(roomId).emit("moveMade", {
        index,
        symbol,
        nextTurn
      });
    });

    // 🔄 RESET SYNC
    socket.on("resetGame", (roomId) => {
      io.to(roomId).emit("resetGame");

      // 🔥 RESET TURN ALSO
      io.to(roomId).emit("turnUpdate", "X");
    });

    // ❌ DISCONNECT
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);

      for (let roomId in rooms) {
        rooms[roomId] = rooms[roomId].filter(
          (p) => p.id !== socket.id
        );

        io.to(roomId).emit("playersUpdate", rooms[roomId]);

        if (rooms[roomId].length === 0) {
          delete rooms[roomId];
        }
      }
    });
  });
}

module.exports = setupSocket;