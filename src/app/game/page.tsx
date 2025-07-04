"use client";

import LudoGame from "../components/LudoGame";
import LudoBoard from "../components/ui/LudoBoard";

const page = () => {
  return (
    <div>
      <LudoBoard />
      <LudoGame />
    </div>
  );
};

export default page;
