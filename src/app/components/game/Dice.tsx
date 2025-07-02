"use client";

import React from "react";

interface DiceProps {
  value: number;
  isRolling: boolean;
}

export const Dice: React.FC<DiceProps> = ({ value, isRolling }) => {
  const getDiceFace = (value: number) => {
    const dots = [];

    switch (value) {
      case 1:
        dots.push(
          <div key="1" className="w-2 h-2 bg-white rounded-full"></div>
        );
        break;
      case 2:
        dots.push(
          <div key="1" className="w-2 h-2 bg-white rounded-full"></div>,
          <div key="2" className="w-2 h-2 bg-white rounded-full"></div>
        );
        break;
      case 3:
        dots.push(
          <div key="1" className="w-2 h-2 bg-white rounded-full"></div>,
          <div key="2" className="w-2 h-2 bg-white rounded-full"></div>,
          <div key="3" className="w-2 h-2 bg-white rounded-full"></div>
        );
        break;
      case 4:
        dots.push(
          <div key="1" className="w-2 h-2 bg-white rounded-full"></div>,
          <div key="2" className="w-2 h-2 bg-white rounded-full"></div>,
          <div key="3" className="w-2 h-2 bg-white rounded-full"></div>,
          <div key="4" className="w-2 h-2 bg-white rounded-full"></div>
        );
        break;
      case 5:
        dots.push(
          <div key="1" className="w-2 h-2 bg-white rounded-full"></div>,
          <div key="2" className="w-2 h-2 bg-white rounded-full"></div>,
          <div key="3" className="w-2 h-2 bg-white rounded-full"></div>,
          <div key="4" className="w-2 h-2 bg-white rounded-full"></div>,
          <div key="5" className="w-2 h-2 bg-white rounded-full"></div>
        );
        break;
      case 6:
        dots.push(
          <div key="1" className="w-2 h-2 bg-white rounded-full"></div>,
          <div key="2" className="w-2 h-2 bg-white rounded-full"></div>,
          <div key="3" className="w-2 h-2 bg-white rounded-full"></div>,
          <div key="4" className="w-2 h-2 bg-white rounded-full"></div>,
          <div key="5" className="w-2 h-2 bg-white rounded-full"></div>,
          <div key="6" className="w-2 h-2 bg-white rounded-full"></div>
        );
        break;
      default:
        dots.push(
          <div key="0" className="w-2 h-2 bg-white rounded-full"></div>
        );
    }

    return dots;
  };

  const getDiceLayout = (value: number) => {
    switch (value) {
      case 1:
        return "grid-cols-1 grid-rows-1";
      case 2:
        return "grid-cols-2 grid-rows-1";
      case 3:
        return "grid-cols-3 grid-rows-1";
      case 4:
        return "grid-cols-2 grid-rows-2";
      case 5:
        return "grid-cols-3 grid-rows-2";
      case 6:
        return "grid-cols-3 grid-rows-2";
      default:
        return "grid-cols-1 grid-rows-1";
    }
  };

  return (
    <div
      className={`w-16 h-16 bg-gray-800 border-2 border-gray-600 rounded-lg shadow-lg p-2 ${
        isRolling ? "animate-spin" : ""
      }`}
    >
      <div
        className={`w-full h-full grid ${getDiceLayout(
          value
        )} gap-1 items-center justify-center`}
      >
        {getDiceFace(value)}
      </div>
    </div>
  );
};
