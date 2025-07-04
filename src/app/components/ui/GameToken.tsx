import React from "react";
import { useStore } from "../../utils/store";

interface GameTokenProps {
  playerIndex: number;
  tokenIndex: number;
  color: string;
  position: { x: number; y: number };
  isClickable: boolean;
  isSelected: boolean;
}

const GameToken: React.FC<GameTokenProps> = ({
  playerIndex,
  tokenIndex,
  color,
  position,
  isClickable,
  isSelected,
}) => {
  const { selectToken, moveToken } = useStore();

  const handleClick = () => {
    if (!isClickable) return;

    selectToken(playerIndex, tokenIndex);
    // Auto-move after a short delay to show selection
    setTimeout(() => {
      moveToken(playerIndex, tokenIndex);
    }, 300);
  };

  return (
    <div
      onClick={handleClick}
      className={`
        w-[20px] h-[20px] rounded-full border-2 transition-all duration-200
        ${isClickable ? "cursor-pointer hover:scale-110" : "cursor-default"}
        ${isSelected ? "border-black shadow-lg scale-110" : "border-white"}
        ${isClickable ? "hover:shadow-md" : ""}
      `}
      style={{
        backgroundColor: color,
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: isSelected ? 20 : 10,
        opacity: isClickable ? 1 : 0.7,
        boxShadow: isSelected
          ? "0 4px 8px rgba(0,0,0,0.3)"
          : isClickable
          ? "0 2px 4px rgba(0,0,0,0.2)"
          : "none",
      }}
    />
  );
};

export default GameToken;
