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

  // Create individual player info components
  const PlayerInfo = ({ playerIndex }: { playerIndex: number }) => {
    const player = players[playerIndex];
    const isCurrentPlayer = turn === playerIndex;

    return (
      <div className="w-64 space-y-4">
        {/* Player Status */}
        {/* <div
          className={`p-4 rounded-lg text-white shadow-lg transition-all ${
            isCurrentPlayer ? "ring-4 ring-white ring-opacity-50" : ""
          }`}
          style={{ backgroundColor: playerColors[playerIndex] }}
        >
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-lg font-bold">{playerNames[playerIndex]}</h3>
            {isCurrentPlayer && (
              <span className="text-sm bg-white text-black px-2 py-1 rounded">
                Current
              </span>
            )}
          </div>
          <div className="space-y-1 text-sm">
            <p>Can Roll: {player?.canRoll ? "Yes" : "No"}</p>
            <p>Last Roll: {player?.currentRollValue || "Not rolled yet"}</p>
            <p>Six Count: {player?.isSixCount}</p>
            <p>
              Tokens on board:{" "}
              {player.token.filter((t) => t.current_position >= 0).length}/4
            </p>
          </div>
        </div> */}

        {/* Game Controls - show for all players but gray out when not current turn */}
        <div
          className={`bg-white p-4 rounded-lg shadow-lg transition-all ${
            !isCurrentPlayer ? "opacity-50" : ""
          }`}
        >
          <h4 className="text-lg font-semibold mb-3">
            Player {playerIndex + 1} Controls
            {isCurrentPlayer && (
              <span className="text-sm text-green-600 ml-2">
                ← Current Turn
              </span>
            )}
          </h4>
          <div className="space-y-2">
            <div
              className={`
                w-full py-2 px-3 rounded-lg font-semibold text-white transition-all
                bg-green-500 hover:bg-green-600 cursor-pointer text-center
                
              `}
            >
              Rolled: {player?.currentRollValue || "Not rolled yet"}
            </div>
            <button
              onClick={rollDice}
              disabled={!player?.canRoll || !isCurrentPlayer}
              className={`
                w-full py-2 px-3 rounded-lg font-semibold text-white transition-all
                ${
                  player?.canRoll && isCurrentPlayer
                    ? "bg-green-500 hover:bg-green-600 cursor-pointer"
                    : "bg-gray-400 cursor-not-allowed"
                }
              `}
            >
              🎲 Roll Dice
            </button>
            <button
              onClick={handleSkipTurn}
              disabled={!isCurrentPlayer}
              className={`
                w-full py-2 px-3 rounded-lg font-semibold text-white transition-all
                ${
                  isCurrentPlayer
                    ? "bg-red-500 hover:bg-red-600 cursor-pointer"
                    : "bg-gray-400 cursor-not-allowed"
                }
              `}
            >
              ⏭️ Skip Turn
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      {/* Main Game Layout - Grid positioning */}
      <div className="relative max-w-7xl mx-auto">
        {/* Create a grid layout */}
        <div className="flex gap-8 ">
          <div className="flex flex-col justify-between">
            <PlayerInfo playerIndex={0} />

            <PlayerInfo playerIndex={3} />
          </div>

          <LudoBoard />
          <div className="flex flex-col justify-between">
            <PlayerInfo playerIndex={1} />
            <PlayerInfo playerIndex={2} />
          </div>
        </div>

        {/* Instructions - Fixed position */}
        {/* <div className="absolute top-0 right-0 bg-white p-4 rounded-lg shadow-lg max-w-xs">
          <h3 className="text-lg font-semibold mb-3">How to Play</h3>
          <div className="text-sm space-y-1 text-gray-700">
            <p>1. Click &quot;Roll Dice&quot; when it&apos;s your turn</p>
            <p>2. Click on a highlighted token to move it</p>
            <p>3. Roll 6 to bring tokens out of home</p>
            <p>4. Rolling 6 gives you another turn</p>
            <p>5. Three consecutive 6s = forfeit turn</p>
          </div>
        </div> */}

        {/* Debug Info - Fixed position */}
        {/* <details className="absolute bottom-0 left-0 bg-white p-4 rounded-lg shadow-lg max-w-xs">
          <summary className="text-lg font-semibold cursor-pointer">
            Debug Info
          </summary>
          <div className="mt-3 text-xs">
            <p>Current Turn: {turn}</p>
            <p>Total Players: {players.length}</p>
            <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto max-h-32">
              {JSON.stringify({ turn, players }, null, 2)}
            </pre>
          </div>
        </details> */}
      </div>
    </div>
  );
};

export default LudoGame;
