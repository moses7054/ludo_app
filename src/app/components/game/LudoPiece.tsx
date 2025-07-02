"use client";

import React from "react";
import { PlayerColor } from "./LudoBoard";

interface LudoPieceProps {
  color: PlayerColor;
  playerId: number;
  pieceId: number;
  isSelected?: boolean;
  onClick?: () => void;
}

export const LudoPiece: React.FC<LudoPieceProps> = ({
  color,
  playerId,
  pieceId,
  isSelected = false,
  onClick,
}) => {
  const getPieceStyle = () => {
    const baseStyle =
      "w-8 h-8 rounded-full border-2 shadow-lg transition-all duration-200 cursor-pointer";
    const selectedStyle = isSelected ? "ring-4 ring-white/50 scale-110" : "";

    switch (color) {
      case "red":
        return `${baseStyle} bg-red-500 border-red-600 hover:bg-red-400 ${selectedStyle}`;
      case "green":
        return `${baseStyle} bg-green-500 border-green-600 hover:bg-green-400 ${selectedStyle}`;
      case "blue":
        return `${baseStyle} bg-blue-500 border-blue-600 hover:bg-blue-400 ${selectedStyle}`;
      case "yellow":
        return `${baseStyle} bg-yellow-500 border-yellow-600 hover:bg-yellow-400 ${selectedStyle}`;
      default:
        return `${baseStyle} bg-gray-500 border-gray-600 ${selectedStyle}`;
    }
  };

  return (
    <div
      className={getPieceStyle()}
      onClick={onClick}
      title={`${color} player ${playerId} piece ${pieceId}`}
    >
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-white/80"></div>
      </div>
    </div>
  );
};
