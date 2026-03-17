import { useState, useEffect } from "react";
import Square from "./Square";
import WinnerModal from "./WinnerModal";
import { checkWinner } from "../utils/winner";
import { bestMove } from "../utils/minimax";
import confetti from "canvas-confetti";
import { socket } from "../socket";

const Board = ({ mode = "PVP", difficulty = "hard", updateScore = () => {} }) => {

const [squares, setSquares] = useState(Array(9).fill(null));
const [isXNext, setIsXNext] = useState(true);
const [winPattern, setWinPattern] = useState([]);
const [winner, setWinner] = useState(null);

// 🌐 MULTIPLAYER
const [player, setPlayer] = useState(null);
const [roomId, setRoomId] = useState("");
const [connected, setConnected] = useState(false);
const [players, setPlayers] = useState([]);

// 👤 NAME
const [name, setName] = useState("");

// 🎯 LAST MOVE
const [lastMove, setLastMove] = useState(null);

// 📊 SCORE
const [score, setScore] = useState({ X: 0, O: 0 });

const winnerObj = checkWinner(squares);

//
// ⭐ AI MODE
//
useEffect(() => {
if (mode === "AI" && !isXNext && !winnerObj) {
let move = bestMove([...squares]);
setTimeout(() => handleClick(move), 500);
}
}, [isXNext, squares, mode, winnerObj]);

//
// 🔥 SOCKET LISTENERS (ONLY FOR ONLINE MODE)
//
useEffect(() => {

if (mode !== "ONLINE") return;

socket.on("playerAssigned", (symbol) => {
setPlayer(symbol);
setConnected(true);
});

socket.on("playersUpdate", (playersData) => {
setPlayers([...playersData]);
});

socket.on("turnUpdate", (turn) => {
setIsXNext(turn === "X");
});

socket.on("moveMade", ({ index, symbol, nextTurn }) => {
setSquares((prev) => {
const newBoard = [...prev];
newBoard[index] = symbol;

setLastMove(index);

const win = checkWinner(newBoard);

if (win) {
setWinPattern(win.pattern);
setWinner(win.winner);

setScore(prev => ({
...prev,
[win.winner]: prev[win.winner] + 1
}));

confetti({
particleCount: 150,
spread: 90,
origin: { y: 0.6 }
});
}

if (!newBoard.includes(null) && !win) {
setWinner("Draw");
}

return newBoard;
});

// ✅ SERVER CONTROLS TURN
setIsXNext(nextTurn === "X");
});

socket.on("resetGame", () => {
resetGame();
});

socket.on("roomFull", () => {
alert("Room is full!");
});

return () => {
socket.off("playerAssigned");
socket.off("playersUpdate");
socket.off("moveMade");
socket.off("turnUpdate");
socket.off("resetGame");
socket.off("roomFull");
};

}, [mode]);

//
// 🔥 CLICK HANDLER
//
const handleClick = (i) => {

if (squares[i] || winnerObj) return;

// 🌐 ONLINE MODE
if (mode === "ONLINE" && connected) {

if (players.length < 2) return;

if ((isXNext && player !== "X") || (!isXNext && player !== "O")) {
return;
}

const next = [...squares];
next[i] = player;

setSquares(next);
setLastMove(i);

const win = checkWinner(next);

if (win) {
setWinPattern(win.pattern);
setWinner(win.winner);

setScore(prev => ({
...prev,
[win.winner]: prev[win.winner] + 1
}));

confetti({
particleCount: 150,
spread: 90,
origin: { y: 0.6 }
});
}

if (!next.includes(null) && !win) {
setWinner("Draw");
}

// 🔥 SEND TO SERVER
socket.emit("makeMove", {
roomId,
index: i,
symbol: player,
});

return;
}

// 🎮 LOCAL GAME (PVP + AI)
const next = [...squares];
next[i] = isXNext ? "X" : "O";

setSquares(next);
setIsXNext(!isXNext);
setLastMove(i);

const win = checkWinner(next);

if (win) {
updateScore(win.winner);
setWinPattern(win.pattern);
setWinner(win.winner);

confetti({
particleCount: 150,
spread: 90,
origin: { y: 0.6 }
});
return;
}

if (!next.includes(null)) {
setWinner("Draw");
}
};

//
// 🔄 RESET
//
const resetGame = () => {
setSquares(Array(9).fill(null));
setIsXNext(true);
setWinPattern([]);
setWinner(null);
setLastMove(null);
};

return (
<div>

{/* 🌐 JOIN ROOM ONLY FOR ONLINE */}
{mode === "ONLINE" && (
<div style={{ marginBottom: "15px" }}>
<input
placeholder="Enter name"
value={name}
onChange={(e) => setName(e.target.value)}
/>

<input
placeholder="Enter Room ID"
value={roomId}
onChange={(e) => setRoomId(e.target.value)}
/>

<button
disabled={connected}
onClick={() => {
if (!roomId.trim() || !name.trim()) return;

setPlayers([]);
socket.emit("joinRoom", { roomId, name });
}}
>
{connected ? "Connected" : "Join Room"}
</button>
</div>
)}

{/* 👤 PLAYERS (ONLINE ONLY) */}
{mode === "ONLINE" && players.map((p) => (
<p key={p.id}>
{p.name} ({p.symbol})
</p>
))}

{/* STATUS */}
<h3>
{mode !== "ONLINE"
? "Local Game"
: !connected
? "Not connected"
: players.length < 2
? "Waiting for opponent... ⏳"
: "Opponent connected ✅"}
</h3>

{/* TURN */}
<h3>
{mode !== "ONLINE"
? isXNext ? "Turn: X" : "Turn: O"
: players.length < 2
? "Waiting..."
: player === (isXNext ? "X" : "O")
? "Your Turn 🎯"
: "Opponent Turn ⏳"}
</h3>

{/* SCORE */}
<h3>
Score → X: {score.X} | O: {score.O}
</h3>

{/* BOARD */}
<div className="board" style={{ opacity: mode === "ONLINE" && players.length < 2 ? 0.5 : 1 }}>
{squares.map((val, i) => (
<Square
key={i}
value={val}
highlight={winPattern.includes(i) || lastMove === i}
onClick={() => handleClick(i)}
/>
))}
</div>

{/* RESET */}
<button
className="reset"
onClick={() => {
resetGame();
if (mode === "ONLINE") socket.emit("resetGame", roomId);
}}
>
Reset Game
</button>

<WinnerModal winner={winner} resetGame={resetGame} />

</div>
);
};

export default Board;