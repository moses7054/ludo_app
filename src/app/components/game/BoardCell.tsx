"use client";

import React from "react";

interface BoardCellProps {
  row: number;
  col: number;
  type: string;
}

export const BoardCell: React.FC<BoardCellProps> = ({ row, col, type }) => {
  const getCellStyle = () => {
    const baseStyle = "w-full h-full border border-gray-600";

    switch (type) {
      case "home-red":
        return `${baseStyle} bg-red-500/30 border-red-400`;
      case "home-green":
        return `${baseStyle} bg-green-500/30 border-green-400`;
      case "home-blue":
        return `${baseStyle} bg-blue-500/30 border-blue-400`;
      case "home-yellow":
        return `${baseStyle} bg-yellow-500/30 border-yellow-400`;
      case "safe-zone":
        return `${baseStyle} bg-purple-500/20 border-purple-400`;
      case "track":
        return `${baseStyle} bg-gray-700/50 border-gray-500`;
      default:
        return `${baseStyle} bg-gray-600/50 border-gray-500`;
    }
  };

  const getCellContent = () => {
    // Add special markers for starting positions, safe spots, etc.
    if (type === "track") {
      // Starting positions for each color
      if (
        (row === 6 && col === 1) ||
        (row === 8 && col === 13) ||
        (row === 13 && col === 6) ||
        (row === 1 && col === 8)
      ) {
        return (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white/60"></div>
          </div>
        );
      }

      // Safe spots (stars)
      if (
        (row === 2 && col === 2) ||
        (row === 2 && col === 12) ||
        (row === 12 && col === 2) ||
        (row === 12 && col === 12) ||
        (row === 7 && col === 7)
      ) {
        return (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-yellow-400 text-xs">★</div>
          </div>
        );
      }
    }

    return null;
  };

  return <div className={getCellStyle()}>{getCellContent()}</div>;
};
