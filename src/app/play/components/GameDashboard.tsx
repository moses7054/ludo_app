import React from "react";

interface GameDashboardProps {
  currentTurn: string;
  diceRoll: number | null;
  onRollDice?: () => void;
  canRoll?: boolean;
}

const GameDashboard: React.FC<GameDashboardProps> = ({
  currentTurn,
  diceRoll,
  onRollDice,
  canRoll = false,
}) => {
  const getDiceDisplay = () => {
    if (diceRoll === null) return "?";
    return diceRoll.toString();
  };

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <div className="turn-display">
          <span className="label">YOUR TURN</span>
          <span className={`player-name ${currentTurn.toLowerCase()}`}>
            {currentTurn}
          </span>
        </div>

        <div className="dice-section">
          <div className="dice-display">
            <span className="label">ROLL</span>
            <span className="dice-value">{getDiceDisplay()}</span>
          </div>

          <button
            className={`roll-button ${canRoll ? "active" : "disabled"}`}
            onClick={canRoll ? onRollDice : undefined}
            disabled={!canRoll}
          >
            ROLL
          </button>
        </div>
      </div>

      <style jsx>{`
        .dashboard {
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          border: 3px solid #ecf0f1;
          border-radius: 0;
          padding: 16px;
          box-shadow: inset 2px 2px 0px #bdc3c7, inset -2px -2px 0px #95a5a6,
            3px 3px 0px #7f8c8d;
          image-rendering: pixelated;
          image-rendering: -moz-crisp-edges;
          image-rendering: crisp-edges;
          min-width: 200px;
        }

        .dashboard-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
          font-family: "Courier New", monospace;
        }

        .turn-display {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .dice-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .dice-display {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .label {
          font-size: 12px;
          font-weight: bold;
          color: #bdc3c7;
          text-shadow: 1px 1px 0px #000000;
          letter-spacing: 1px;
        }

        .player-name {
          font-size: 16px;
          font-weight: bold;
          text-shadow: 1px 1px 0px #000000;
          letter-spacing: 2px;
          padding: 6px 12px;
          border: 2px solid #000000;
          background: #34495e;
          min-width: 80px;
          text-align: center;
        }

        .player-name.red {
          color: #e74c3c;
        }
        .player-name.green {
          color: #27ae60;
        }
        .player-name.blue {
          color: #3498db;
        }
        .player-name.yellow {
          color: #f1c40f;
        }

        .dice-value {
          font-size: 20px;
          font-weight: bold;
          color: #e74c3c;
          text-shadow: 1px 1px 0px #000000;
          background: #ecf0f1;
          border: 2px solid #000000;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: inset 1px 1px 0px #bdc3c7, inset -1px -1px 0px #95a5a6;
        }

        .roll-button {
          font-family: "Courier New", monospace;
          font-size: 12px;
          font-weight: bold;
          color: #2c3e50;
          background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
          border: 2px solid #000000;
          padding: 8px 16px;
          cursor: pointer;
          text-shadow: 1px 1px 0px #ecf0f1;
          letter-spacing: 1px;
          box-shadow: inset 1px 1px 0px #5dade2, inset -1px -1px 0px #1f618d,
            2px 2px 0px #000000;
          transition: all 0.1s ease;
          image-rendering: pixelated;
          image-rendering: -moz-crisp-edges;
          image-rendering: crisp-edges;
        }

        .roll-button:hover {
          background: linear-gradient(135deg, #5dade2 0%, #3498db 100%);
          transform: translate(1px, 1px);
          box-shadow: inset 1px 1px 0px #85c1e9, inset -1px -1px 0px #2471a3,
            1px 1px 0px #000000;
        }

        .roll-button.disabled {
          background: linear-gradient(135deg, #7f8c8d 0%, #95a5a6 100%);
          color: #bdc3c7;
          cursor: not-allowed;
          box-shadow: inset 1px 1px 0px #bdc3c7, inset -1px -1px 0px #7f8c8d,
            2px 2px 0px #000000;
        }

        .roll-button.disabled:hover {
          transform: none;
          background: linear-gradient(135deg, #7f8c8d 0%, #95a5a6 100%);
          box-shadow: inset 1px 1px 0px #bdc3c7, inset -1px -1px 0px #7f8c8d,
            2px 2px 0px #000000;
        }
      `}</style>
    </div>
  );
};

export default GameDashboard;
