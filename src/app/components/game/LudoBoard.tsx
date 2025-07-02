"use client";

import React from "react";
import { LudoPiece } from "./LudoPiece";
import { BoardCell } from "./BoardCell";

export type PlayerColor = "red" | "green" | "blue" | "yellow";

// TODO: Add game state props when integrating with Solana
export const LudoBoard: React.FC = () => {
  // Board dimensions - classic Ludo is 15x15
  const boardSize = 15;

  // Create board cells
  const createBoardCells = () => {
    const cells = [];
    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        const cellType = getCellType(row, col);
        cells.push(
          <BoardCell
            key={`${row}-${col}`}
            row={row}
            col={col}
            type={cellType}
          />
        );
      }
    }
    return cells;
  };

  // Determine cell type based on position
  const getCellType = (row: number, col: number): string => {
    // Home areas (6x6 in corners)
    if (row < 6 && col < 6) return "home-red";
    if (row < 6 && col >= 9) return "home-green";
    if (row >= 9 && col < 6) return "home-blue";
    if (row >= 9 && col >= 9) return "home-yellow";

    // Center safe zone
    if (row >= 6 && row <= 8 && col >= 6 && col <= 8) return "safe-zone";

    // Main track
    return "track";
  };

  // Get cell color for styling
  const getCellColor = (row: number, col: number): PlayerColor | "neutral" => {
    if (row < 6 && col < 6) return "red";
    if (row < 6 && col >= 9) return "green";
    if (row >= 9 && col < 6) return "blue";
    if (row >= 9 && col >= 9) return "yellow";
    return "neutral";
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
        <div
          className="grid grid-cols-15 gap-0.5 bg-gray-800 p-2 rounded-lg shadow-2xl"
          style={{
            gridTemplateColumns: "repeat(15, minmax(0, 1fr))",
            width: "600px",
            height: "600px",
          }}
        >
          {createBoardCells()}
        </div>

        {/* Game pieces will be positioned absolutely over the board */}
        <div className="relative -mt-[600px] pointer-events-none">
          {/* Red pieces */}
          <div className="absolute top-1 left-1">
            <LudoPiece color="red" playerId={1} pieceId={1} />
          </div>
          <div className="absolute top-1 left-4">
            <LudoPiece color="red" playerId={1} pieceId={2} />
          </div>
          <div className="absolute top-4 left-1">
            <LudoPiece color="red" playerId={1} pieceId={3} />
          </div>
          <div className="absolute top-4 left-4">
            <LudoPiece color="red" playerId={1} pieceId={4} />
          </div>

          {/* Green pieces */}
          <div className="absolute top-1 right-1">
            <LudoPiece color="green" playerId={2} pieceId={1} />
          </div>
          <div className="absolute top-1 right-4">
            <LudoPiece color="green" playerId={2} pieceId={2} />
          </div>
          <div className="absolute top-4 right-1">
            <LudoPiece color="green" playerId={2} pieceId={3} />
          </div>
          <div className="absolute top-4 right-4">
            <LudoPiece color="green" playerId={2} pieceId={4} />
          </div>

          {/* Blue pieces */}
          <div className="absolute bottom-1 left-1">
            <LudoPiece color="blue" playerId={3} pieceId={1} />
          </div>
          <div className="absolute bottom-1 left-4">
            <LudoPiece color="blue" playerId={3} pieceId={2} />
          </div>
          <div className="absolute bottom-4 left-1">
            <LudoPiece color="blue" playerId={3} pieceId={3} />
          </div>
          <div className="absolute bottom-4 left-4">
            <LudoPiece color="blue" playerId={3} pieceId={4} />
          </div>

          {/* Yellow pieces */}
          <div className="absolute bottom-1 right-1">
            <LudoPiece color="yellow" playerId={4} pieceId={1} />
          </div>
          <div className="absolute bottom-1 right-4">
            <LudoPiece color="yellow" playerId={4} pieceId={2} />
          </div>
          <div className="absolute bottom-4 right-1">
            <LudoPiece color="yellow" playerId={4} pieceId={3} />
          </div>
          <div className="absolute bottom-4 right-4">
            <LudoPiece color="yellow" playerId={4} pieceId={4} />
          </div>
        </div>
      </div>
    </div>
  );
};
