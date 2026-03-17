const ModeSelector = ({ mode, setMode }) => {

return ( <div className="mode">


  <button
    className={mode === "PVP" ? "active" : ""}
    onClick={() => setMode("PVP")}
  >
    Player vs Player
  </button>

  <button
    className={mode === "AI" ? "active" : ""}
    onClick={() => setMode("AI")}
  >
    Player vs AI
  </button>
<button
  className={mode === "ONLINE" ? "active" : ""}
  onClick={() => setMode("ONLINE")}
>
  Online Multiplayer 🌐
</button>
</div>


);

};

export default ModeSelector;
