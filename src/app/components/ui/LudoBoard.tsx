import React from "react";
import HomeBase from "./HomeBase";
import Path from "./Path";
import { Direction } from "./Path";
import FinishBox from "./FinishBox";
import GameToken from "./GameToken";
import { useStore } from "../../utils/store";
import {
  getTokenPosition,
  isTokenClickable,
} from "../../utils/positionMapping";

const colors = ["#FF0000", "#008000", "#FDDA0D", "#0000FF"]; //red green blue yellow

const LudoBoard = () => {
  const { players, turn } = useStore();

  return (
    <div className="flex flex-col gap-0 relative w-fit h-fit">
      <div className="flex flex-row gap-0">
        <HomeBase color={colors[0]} />
        <Path direction={Direction.Up} />
        <HomeBase color={colors[1]} />
      </div>
      <div className="flex flex-row gap-0">
        {" "}
        <Path direction={Direction.Left} />
        <FinishBox />
        <Path direction={Direction.Right} />
      </div>
      <div className="flex flex-row gap-0">
        <HomeBase color={colors[3]} />
        <Path direction={Direction.Down} />
        <HomeBase color={colors[2]} />
      </div>

      {/* Dynamic Tokens based on game state */}
      {players.map((player, playerIndex) =>
        player.token.map((token, tokenIndex) => {
          const position = getTokenPosition(
            playerIndex,
            tokenIndex,
            token.current_position
          );
          const isClickable = isTokenClickable(
            playerIndex,
            turn,
            token.new_position
          );

          return (
            <GameToken
              key={`${playerIndex}-${tokenIndex}`}
              playerIndex={playerIndex}
              tokenIndex={tokenIndex}
              color={colors[playerIndex]}
              position={position}
              isClickable={isClickable}
              isSelected={token.isClicked}
            />
          );
        })
      )}
    </div>
  );
};

export default LudoBoard;

// <div className="absolute top-[245px] z-20 left-[45px] bg-black w-[30px] h-[30px]"></div>
//       <div className="absolute top-[45px] z-20 right-[245px] bg-black w-[30px] h-[30px]"></div>
//       <div className="absolute bottom-[245px] z-20 right-[45px] bg-black w-[30px] h-[30px]"></div>
//       <div className="absolute bottom-[45px] z-20 left-[245px] bg-black w-[30px] h-[30px]"></div>
