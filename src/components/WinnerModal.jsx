const WinnerModal = ({ winner, resetGame, mode, player }) => {

if (!winner) return null;

// 🎯 MESSAGE LOGIC
let message = "";

if (winner === "Draw") {
  message = "It's a Draw 🤝";
} else if (mode === "ONLINE") {
  // 🌐 ONLINE MODE
  message = winner === player ? "You Win 🎉" : "You Lose 😢";
} else {
  // 🎮 LOCAL MODES
  message = `${winner} Wins 🎉`;
}

return (
<div className="modal">
  <div className="modal-content">

    <h2
      className={
        winner === "X"
          ? "winner-x"
          : winner === "O"
          ? "winner-o"
          : "winner-draw"
      }
    >
      {message}
    </h2>

    <button onClick={resetGame}>
      Play Again
    </button>

  </div>
</div>
);
};

export default WinnerModal;