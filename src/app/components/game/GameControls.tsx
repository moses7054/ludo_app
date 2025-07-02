"use client";

import React, { useState } from "react";
import { Dice } from "./Dice";

export const GameControls: React.FC = () => {
  const [diceValue, setDiceValue] = useState<number>(1);
  const [isRolling, setIsRolling] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<number>(1);

  const rollDice = () => {
    if (isRolling) return;

    setIsRolling(true);
    setDiceValue(0); // Show rolling animation

    // Simulate dice roll
    setTimeout(() => {
      const newValue = Math.floor(Math.random() * 6) + 1;
      setDiceValue(newValue);
      setIsRolling(false);

      // Move to next player (for demo)
      setTimeout(() => {
        setCurrentPlayer((prev) => (prev === 4 ? 1 : prev + 1));
      }, 2000);
    }, 1000);
  };

  const getPlayerColor = (playerId: number) => {
    switch (playerId) {
      case 1:
        return "text-red-400";
      case 2:
        return "text-green-400";
      case 3:
        return "text-blue-400";
      case 4:
        return "text-yellow-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Player */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
        <h3 className="text-lg font-semibold text-white mb-2">Current Turn</h3>
        <div className={`text-2xl font-bold ${getPlayerColor(currentPlayer)}`}>
          Player {currentPlayer}
        </div>
      </div>

      {/* Dice */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
        <h3 className="text-lg font-semibold text-white mb-4">Dice</h3>
        <div className="flex justify-center mb-4">
          <Dice value={diceValue} isRolling={isRolling} />
        </div>
        <button
          onClick={rollDice}
          disabled={isRolling}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          {isRolling ? "Rolling..." : "Roll Dice"}
        </button>
      </div>

      {/* Game Actions */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
        <h3 className="text-lg font-semibold text-white mb-4">Actions</h3>
        <div className="space-y-3">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
            Move Piece
          </button>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
            Skip Turn
          </button>
          <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
            New Game
          </button>
        </div>
      </div>

      {/* Game Info */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
        <h3 className="text-lg font-semibold text-white mb-4">Game Info</h3>
        <div className="space-y-2 text-sm text-gray-300">
          <div className="flex justify-between">
            <span>Turn:</span>
            <span className="font-semibold">12</span>
          </div>
          <div className="flex justify-between">
            <span>Players:</span>
            <span className="font-semibold">4</span>
          </div>
          <div className="flex justify-between">
            <span>Status:</span>
            <span className="text-green-400 font-semibold">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};
