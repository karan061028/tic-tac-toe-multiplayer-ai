const Square = ({ value, onClick, highlight }) => {

  return (
    <button
      className={`square ${highlight ? "win" : ""} ${value === "X" ? "x" : ""} ${value === "O" ? "o" : ""}`}
      onClick={onClick}
    >
      {value}
    </button>
  );

};

export default Square;