import React, { useEffect } from "react";
import { useStore } from "../utils/store";
import LudoBoard from "./ui/LudoBoard";

const LudoGame: React.FC = () => {
  const { turn, players, initializePlayers, rollDice, nextTurn } = useStore();

  // Initialize players when component mounts
  useEffect(() => {
    if (players.length === 0) {
      initializePlayers();
    }
  }, [players.length, initializePlayers]);

  const currentPlayer = players[turn];

  const handleSkipTurn = () => {
    nextTurn();
  };

  if (players.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading game...
      </div>
    );
  }

  const playerNames = ["Red", "Green", "Yellow", "Blue"];
  const playerColors = ["#FF0000", "#008000", "#FDDA0D", "#0000FF"];

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6 bg-gray-100 min-h-screen">
      {/* Game Board */}
      <div className="flex justify-center">
        <LudoBoard />
      </div>

      {/* Game Controls and Status */}
      <div className="flex flex-col gap-6 lg:w-80">
        {/* Current Turn Info */}
        <div
          className="p-6 rounded-lg text-white shadow-lg"
          style={{ backgroundColor: currentPlayer?.colour }}
        >
          <h2 className="text-2xl font-bold mb-4">
            {playerNames[turn]}&apos;s Turn
          </h2>
          <div className="space-y-2">
            <p>Can Roll: {currentPlayer?.canRoll ? "Yes" : "No"}</p>
            <p>
              Last Roll: {currentPlayer?.currentRollValue || "Not rolled yet"}
            </p>
            <p>Six Count: {currentPlayer?.isSixCount}</p>
          </div>
        </div>

        {/* Game Controls */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Game Controls</h3>
          <div className="space-y-3">
            <button
              onClick={rollDice}
              disabled={!currentPlayer?.canRoll}
              className={`
                w-full py-3 px-4 rounded-lg font-semibold text-white transition-all
                ${
                  currentPlayer?.canRoll
                    ? "bg-green-500 hover:bg-green-600 cursor-pointer"
                    : "bg-gray-400 cursor-not-allowed"
                }
              `}
            >
              🎲 Roll Dice
            </button>

            <button
              onClick={handleSkipTurn}
              className="w-full py-3 px-4 rounded-lg font-semibold text-white bg-red-500 hover:bg-red-600 transition-all"
            >
              ⏭️ Skip Turn
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">How to Play</h3>
          <div className="text-sm space-y-2 text-gray-700">
            <p>1. Click &quot;Roll Dice&quot; when it&apos;s your turn</p>
            <p>2. Click on a highlighted token to move it</p>
            <p>3. Roll 6 to bring tokens out of home</p>
            <p>4. Rolling 6 gives you another turn</p>
            <p>5. Three consecutive 6s = forfeit turn</p>
          </div>
        </div>

        {/* Player Status */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Player Status</h3>
          <div className="space-y-3">
            {players.map((player, index) => (
              <div
                key={index}
                className={`p-3 rounded border-2 ${
                  index === turn
                    ? "border-gray-400 bg-gray-50"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: playerColors[index] }}
                  />
                  <span className="font-semibold">{playerNames[index]}</span>
                  {index === turn && (
                    <span className="text-sm text-green-600">← Current</span>
                  )}
                </div>
                <div className="text-xs text-gray-600">
                  Tokens on board:{" "}
                  {player.token.filter((t) => t.current_position >= 0).length}/4
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Debug Info (collapsed by default) */}
        <details className="bg-white p-6 rounded-lg shadow-lg">
          <summary className="text-lg font-semibold cursor-pointer">
            Debug Info
          </summary>
          <div className="mt-4 text-xs">
            <p>Current Turn: {turn}</p>
            <p>Total Players: {players.length}</p>
            <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto max-h-40">
              {JSON.stringify({ turn, players }, null, 2)}
            </pre>
          </div>
        </details>
      </div>
    </div>
  );
};

export default LudoGame;
