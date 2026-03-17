import { useState, useEffect } from "react";
import Board from "./components/Board";
import ModeSelector from "./components/ModeSelector";
import ThemeToggle from "./components/ThemeToggle";
import ScoreBoard from "./components/ScoreBoard";
import ParticlesBackground from "./components/ParticlesBackground";
import DifficultySelector from "./components/DifficultySelector";
import "./App.css";

function App() {

  useEffect(() => {
    document.body.classList.add("normal");
  }, []);

  const [mode, setMode] = useState("PVP");
  const [difficulty, setDifficulty] = useState("hard");

  const scoreboard = ScoreBoard();

  useEffect(() => {
    scoreboard.setScoreX(0);
    scoreboard.setScoreO(0);
  }, [mode]);

  const updateScore = (winner) => {

    if (mode === "ONLINE") return;

    if (winner === "X") {
      scoreboard.setScoreX(scoreboard.scoreX + 1);
    } 
    else if (winner === "O") {
      scoreboard.setScoreO(scoreboard.scoreO + 1);
    }
  };

  return (
    <>
      <div className="cyber-grid"></div>
      <ParticlesBackground />

      <div className="app">

        <h1 className="title">⚡ Tic Tac Toe</h1>

        <ThemeToggle />

        <ModeSelector mode={mode} setMode={setMode} />

        {mode === "AI" && (
          <DifficultySelector
            difficulty={difficulty}
            setDifficulty={setDifficulty}
          />
        )}

        {mode !== "ONLINE" && (
          <div className="score">
            <span>Player X : {scoreboard.scoreX}</span>
            <span>Player O : {scoreboard.scoreO}</span>
          </div>
        )}

        <Board
          mode={mode}
          difficulty={difficulty}
          updateScore={updateScore}
        />

      </div>
    </>
  );
}

export default App;