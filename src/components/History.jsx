const History = ({ history, jumpTo }) => {

  return (
    <div className="history">

      <h3>Move History</h3>

      {history.length === 0 && <p>No moves yet</p>}

      {history.map((step, index) => (
        <button
          key={index}
          onClick={() => jumpTo(index)}
        >
          Go to Move {index + 1}
        </button>
      ))}

    </div>
  );

};

export default History;