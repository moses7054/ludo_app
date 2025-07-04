import React, { useEffect } from "react";
import { useStore } from "../utils/store";

const LudoGame: React.FC = () => {
  const {
    turn,
    players,
    initializePlayers,
    rollDice,
    selectToken,
    moveToken,
    nextTurn,
  } = useStore();

  // Initialize players when component mounts
  useEffect(() => {
    if (players.length === 0) {
      initializePlayers();
    }
  }, [players.length, initializePlayers]);

  const currentPlayer = players[turn];

  const handleTokenClick = (playerIndex: number, tokenIndex: number) => {
    selectToken(playerIndex, tokenIndex);
    // Auto-move the token after selection
    setTimeout(() => {
      moveToken(playerIndex, tokenIndex);
    }, 500);
  };

  const handleSkipTurn = () => {
    nextTurn();
  };

  if (players.length === 0) {
    return <div>Loading game...</div>;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Ludo Game</h1>

      {/* Current Turn Info */}
      <div
        style={{
          backgroundColor: currentPlayer?.colour,
          color: "white",
          padding: "10px",
          borderRadius: "5px",
          marginBottom: "20px",
        }}
      >
        <h2>
          Current Turn: {currentPlayer?.colour.toUpperCase()} (Player {turn})
        </h2>
        <p>Can Roll: {currentPlayer?.canRoll ? "Yes" : "No"}</p>
        <p>Last Roll: {currentPlayer?.currentRollValue || "Not rolled yet"}</p>
        <p>Six Count: {currentPlayer?.isSixCount}</p>
      </div>

      {/* Dice Rolling */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={rollDice}
          disabled={!currentPlayer?.canRoll}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: currentPlayer?.canRoll ? "#4CAF50" : "#ccc",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: currentPlayer?.canRoll ? "pointer" : "not-allowed",
          }}
        >
          Roll Dice
        </button>

        <button
          onClick={handleSkipTurn}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "5px",
            marginLeft: "10px",
            cursor: "pointer",
          }}
        >
          Skip Turn
        </button>
      </div>

      {/* Players and Tokens */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
        }}
      >
        {players.map((player, playerIndex) => (
          <div
            key={playerIndex}
            style={{
              border: `3px solid ${player.colour}`,
              borderRadius: "10px",
              padding: "15px",
              backgroundColor: player.turn === turn ? "#f0f0f0" : "white",
            }}
          >
            <h3>{player.colour.toUpperCase()} Player</h3>
            <p>Can Roll: {player.canRoll ? "Yes" : "No"}</p>
            <p>Current Roll: {player.currentRollValue}</p>

            <h4>Tokens:</h4>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "10px",
              }}
            >
              {player.token.map((token, tokenIndex) => (
                <div
                  key={tokenIndex}
                  onClick={() => handleTokenClick(playerIndex, tokenIndex)}
                  style={{
                    padding: "10px",
                    border: token.isClicked
                      ? "3px solid black"
                      : "1px solid gray",
                    borderRadius: "5px",
                    backgroundColor:
                      token.new_position !== -1 ? "#90EE90" : "#FFB6C1",
                    cursor:
                      token.new_position !== -1 && playerIndex === turn
                        ? "pointer"
                        : "default",
                    opacity:
                      token.new_position !== -1 && playerIndex === turn
                        ? 1
                        : 0.6,
                  }}
                >
                  <div>Token {token.num}</div>
                  <div>Pos: {token.current_position}</div>
                  <div>New: {token.new_position}</div>
                  <div>Clicked: {token.isClicked ? "Yes" : "No"}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Debug Info */}
      <div style={{ marginTop: "30px", fontSize: "12px", color: "#666" }}>
        <h4>Debug Info:</h4>
        <p>Current Turn: {turn}</p>
        <p>Total Players: {players.length}</p>
        <details>
          <summary>Full State (click to expand)</summary>
          <pre>{JSON.stringify({ turn, players }, null, 2)}</pre>
        </details>
      </div>
    </div>
  );
};

export default LudoGame;
