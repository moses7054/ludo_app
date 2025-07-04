import React from "react";

const Token = ({ color, className }: { color: string; className: string }) => {
  return (
    <div
      className={`w-[20px] h-[20px] ${className}`}
      style={{ backgroundColor: color }}
    ></div>
  );
};

export default Token;
