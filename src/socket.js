import { io } from "socket.io-client";

export const socket = io("https://tic-tac-toe-multiplayer-ai.onrender.com", {
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("✅ Connected to server:", socket.id);
});