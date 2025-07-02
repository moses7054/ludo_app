"use client";

import React from "react";
import { PlayerColor } from "./LudoBoard";

interface Player {
  id: number;
  color: PlayerColor;
  name: string;
  pieces: number[];
  isActive: boolean;
  isWinner: boolean;
}

export const PlayerInfo: React.FC = () => {
  const players: Player[] = [
    {
      id: 1,
      color: "red",
      name: "Player 1",
      pieces: [1, 2, 3, 4],
      isActive: true,
      isWinner: false,
    },
    {
      id: 2,
      color: "green",
      name: "Player 2",
      pieces: [1, 2, 3, 4],
      isActive: false,
      isWinner: false,
    },
    {
      id: 3,
      color: "blue",
      name: "Player 3",
      pieces: [1, 2, 3, 4],
      isActive: false,
      isWinner: false,
    },
    {
      id: 4,
      color: "yellow",
      name: "Player 4",
      pieces: [1, 2, 3, 4],
      isActive: false,
      isWinner: false,
    },
  ];

  const getPlayerColorClass = (color: PlayerColor) => {
    switch (color) {
      case "red":
        return "border-red-500 bg-red-500/10";
      case "green":
        return "border-green-500 bg-green-500/10";
      case "blue":
        return "border-blue-500 bg-blue-500/10";
      case "yellow":
        return "border-yellow-500 bg-yellow-500/10";
    }
  };

  const getPlayerTextColor = (color: PlayerColor) => {
    switch (color) {
      case "red":
        return "text-red-400";
      case "green":
        return "text-green-400";
      case "blue":
        return "text-blue-400";
      case "yellow":
        return "text-yellow-400";
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white mb-4">Players</h3>

      {players.map((player) => (
        <div
          key={player.id}
          className={`bg-white/10 backdrop-blur-sm rounded-lg p-4 border-2 transition-all ${
            player.isActive
              ? "border-purple-400 bg-purple-500/20"
              : getPlayerColorClass(player.color)
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <h4 className={`font-semibold ${getPlayerTextColor(player.color)}`}>
              {player.name}
            </h4>
            <div className="flex items-center space-x-2">
              {player.isActive && (
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              )}
              {player.isWinner && (
                <div className="text-yellow-400 text-lg">👑</div>
              )}
            </div>
          </div>

          {/* Player Pieces */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            {player.pieces.map((pieceId) => (
              <div
                key={pieceId}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${getPlayerColorClass(
                  player.color
                )
                  .replace("bg-", "bg-")
                  .replace("/10", "/30")}`}
              >
                <div className="w-1 h-1 rounded-full bg-white/80"></div>
              </div>
            ))}
          </div>

          {/* Player Status */}
          <div className="text-xs text-gray-300">
            <div className="flex justify-between">
              <span>Pieces Home:</span>
              <span className="font-semibold">0/4</span>
            </div>
            <div className="flex justify-between">
              <span>Status:</span>
              <span
                className={`font-semibold ${
                  player.isWinner
                    ? "text-yellow-400"
                    : player.isActive
                    ? "text-purple-400"
                    : "text-gray-400"
                }`}
              >
                {player.isWinner
                  ? "Winner"
                  : player.isActive
                  ? "Active"
                  : "Waiting"}
              </span>
            </div>
          </div>
        </div>
      ))}

      {/* Game Rules */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mt-6">
        <h4 className="text-lg font-semibold text-white mb-3">Rules</h4>
        <ul className="text-sm text-gray-300 space-y-2">
          <li>• Roll a 6 to start</li>
          <li>• Move pieces clockwise</li>
          <li>• Land on opponents to send them home</li>
          <li>• Get all pieces home to win</li>
        </ul>
      </div>
    </div>
  );
};
