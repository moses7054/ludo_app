import React from "react";

const HomeBase = ({ color }: { color: string }) => {
  return (
    <div
      className="w-[240px] h-[240px] flex justify-center items-center"
      style={{ backgroundColor: color }}
    >
      <div className="w-[160px] h-[160px] bg-white flex justify-center items-center rounded-3xl">
        <div
          className="w-[150px] h-[150px]  flex justify-center items-center rounded-3xl"
          style={{ backgroundColor: color }}
        >
          <div className="grid grid-cols-2 gap-6">
            <div className="w-[40px] h-[40px]  rounded-full bg-white"></div>
            <div className="w-[40px] h-[40px]  rounded-full bg-white"></div>
            <div className="w-[40px] h-[40px] rounded-full bg-white"></div>
            <div className="w-[40px] h-[40px]  rounded-full bg-white"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBase;
