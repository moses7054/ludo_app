import React from "react";

const GameStarted: React.FC = () => {
  return (
    <div className="pixel-art-header">
      <h1 className="game-started-text">GAME STARTED</h1>

      <style jsx>{`
        .pixel-art-header {
          z-index: 10;
        }

        .game-started-text {
          font-family: "Courier New", monospace;
          font-size: 48px;
          font-weight: bold;
          color: #ffd700;
          text-shadow: 4px 4px 0px #ff4500, 8px 8px 0px #8b0000,
            2px 2px 0px #000000;
          letter-spacing: 8px;
          image-rendering: pixelated;
          image-rendering: -moz-crisp-edges;
          image-rendering: crisp-edges;
          text-transform: uppercase;
          animation: pixelGlow 2s ease-in-out infinite alternate;
        }

        @keyframes pixelGlow {
          0% {
            text-shadow: 4px 4px 0px #ff4500, 8px 8px 0px #8b0000,
              2px 2px 0px #000000;
          }
          100% {
            text-shadow: 4px 4px 0px #ff6347, 8px 8px 0px #dc143c,
              2px 2px 0px #000000, 0px 0px 20px #ffd700;
          }
        }
      `}</style>
    </div>
  );
};

export default GameStarted;
