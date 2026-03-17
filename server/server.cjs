const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const setupSocket = require("./socket/socket.cjs");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

setupSocket(io);

server.listen(5000, () => {
  console.log("🚀 Server running on port 6000");
});