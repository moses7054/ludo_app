import React from "react";
import HomeBase from "./HomeBase";
import Path from "./Path";
import { Direction } from "./Path";
import FinishBox from "./FinishBox";
import Token from "./Token";

const colors = ["#FF0000", "#008000", "#FDDA0D", "#0000FF"]; //red green yellow blue

const LudoBoard = () => {
  return (
    <div className="flex flex-col gap-0 relative w-fit">
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
        <HomeBase color={colors[2]} />
        <Path direction={Direction.Down} />
        <HomeBase color={colors[3]} />
      </div>
      <Token color={colors[0]} className="absolute top-[80px] left-[78px]" />
      <Token color={colors[0]} className="absolute top-[145px] left-[78px]" />
      <Token color={colors[0]} className="absolute top-[80px] left-[142px]" />
      <Token color={colors[0]} className="absolute top-[145px] left-[142px]" />
      <Token color={colors[1]} className="absolute top-[80px] right-[78px]" />
      <Token color={colors[1]} className="absolute top-[145px] right-[78px]" />
      <Token color={colors[1]} className="absolute top-[80px] right-[142px]" />
      <Token color={colors[1]} className="absolute top-[145px] right-[142px]" />
      <Token color={colors[2]} className="absolute bottom-[80px] left-[78px]" />
      <Token
        color={colors[2]}
        className="absolute bottom-[145px] left-[78px]"
      />
      <Token
        color={colors[2]}
        className="absolute bottom-[80px] left-[142px]"
      />
      <Token
        color={colors[2]}
        className="absolute bottom-[145px] left-[142px]"
      />
      <Token
        color={colors[3]}
        className="absolute bottom-[80px] right-[78px]"
      />
      <Token
        color={colors[3]}
        className="absolute bottom-[145px] right-[78px]"
      />
      <Token
        color={colors[3]}
        className="absolute bottom-[80px] right-[142px]"
      />
      <Token
        color={colors[3]}
        className="absolute bottom-[145px] right-[142px]"
      />
    </div>
  );
};

export default LudoBoard;
