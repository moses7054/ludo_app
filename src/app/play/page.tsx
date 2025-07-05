"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import GameStarted from "./components/GameStarted";
import GameDashboard from "./components/GameDashboard";

const PlayPage = () => {
  const [showGameStarted, setShowGameStarted] = useState(true);
  const [currentTurn, setCurrentTurn] = useState("RED");
  const [diceRoll, setDiceRoll] = useState<number | null>(null);
  const [gamePhase, setGamePhase] = useState(0);
  const [canRoll, setCanRoll] = useState(false);
  const [movingCharacter, setMovingCharacter] = useState<{
    id: string;
    currentRight?: number;
    targetRight?: number;
    currentTop?: number;
    targetTop?: number;
    isMoving: boolean;
    spriteFrame: number;
    direction: "horizontal" | "vertical";
  } | null>(null);
  const [characterMoved, setCharacterMoved] = useState(false);

  useEffect(() => {
    // Hide "GAME STARTED" after 1 second
    const timer = setTimeout(() => {
      setShowGameStarted(false);
      // Start with RED turn, dice roll 0 when dashboard appears
      setCurrentTurn("RED");
      setDiceRoll(0);
      setGamePhase(1);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (gamePhase === 1) {
      // Phase 1: RED turn shows 0, then changes to 4 after 2 seconds
      timer = setTimeout(() => {
        setDiceRoll(4);
        setGamePhase(2);
      }, 2000);
    } else if (gamePhase === 2) {
      // Phase 2: After RED rolls 4, wait 2 seconds then change to GREEN turn with 0
      timer = setTimeout(() => {
        setCurrentTurn("GREEN");
        setDiceRoll(0);
        setGamePhase(3);
      }, 2000);
    } else if (gamePhase === 3) {
      // Phase 3: GREEN turn shows 0, then changes to 6 after 2 seconds
      timer = setTimeout(() => {
        setDiceRoll(6);
        setGamePhase(4);
      }, 2000);
    } else if (gamePhase === 4) {
      // Phase 4: After GREEN rolls 6, start moving green-character-1 horizontally
      timer = setTimeout(() => {
        setMovingCharacter({
          id: "green-character-1",
          currentRight: 160,
          targetRight: 245,
          isMoving: true,
          spriteFrame: 0,
          direction: "horizontal",
        });
        setGamePhase(5);
      }, 1000);
    } else if (gamePhase === 5) {
      // Phase 5: Horizontal movement in progress - handled by movement completion
    } else if (gamePhase === 6) {
      // Phase 6: GREEN turn shows 0, then changes to 2 after 2 seconds
      timer = setTimeout(() => {
        setDiceRoll(2);
        setGamePhase(7);
      }, 2000);
    } else if (gamePhase === 7) {
      // Phase 7: After GREEN rolls 2, start moving green-character-1 vertically down
      timer = setTimeout(() => {
        setMovingCharacter({
          id: "green-character-1",
          currentTop: 40,
          targetTop: 120,
          isMoving: true,
          spriteFrame: 0,
          direction: "vertical",
        });
        setGamePhase(8);
      }, 1000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [gamePhase]);

  // Character movement animation
  useEffect(() => {
    if (movingCharacter?.isMoving) {
      const moveDistance = 8; // pixels per step
      const frameRate = 200; // 200ms per frame

      const moveInterval = setInterval(() => {
        setMovingCharacter((prev) => {
          if (!prev) return null;

          let newPosition: number;
          let reachedTarget = false;

          if (prev.direction === "horizontal") {
            newPosition = (prev.currentRight || 0) + moveDistance;
            reachedTarget = newPosition >= (prev.targetRight || 0);
          } else {
            newPosition = (prev.currentTop || 0) + moveDistance;
            reachedTarget = newPosition >= (prev.targetTop || 0);
          }

          const nextFrame = (prev.spriteFrame + 1) % 3; // Cycle through frames 0, 1, 2

          if (reachedTarget) {
            // Movement complete - stop moving and reset to facing down
            setCharacterMoved(true);
            if (prev.direction === "horizontal") {
              // After horizontal movement completes, trigger phase 6 after a short delay
              setTimeout(() => {
                setDiceRoll(0);
                setGamePhase(6);
              }, 1000);
            } else if (prev.direction === "vertical") {
              // After vertical movement completes, transition to yellow turn
              setTimeout(() => {
                setCurrentTurn("YELLOW");
                setDiceRoll(null);
                setCanRoll(true);
                setGamePhase(9);
              }, 1000);
            }
            return null;
          }

          if (prev.direction === "horizontal") {
            return {
              ...prev,
              currentRight: newPosition,
              spriteFrame: nextFrame,
            };
          } else {
            return {
              ...prev,
              currentTop: newPosition,
              spriteFrame: nextFrame,
            };
          }
        });
      }, frameRate);

      return () => clearInterval(moveInterval);
    }
  }, [movingCharacter?.isMoving]);

  const handleRollDice = () => {
    if (canRoll && currentTurn === "YELLOW") {
      setDiceRoll(5);
      setCanRoll(false);
      // Here you could add logic for what happens after yellow rolls 5
    }
  };

  return (
    <div className="flex justify-center items-center h-screen relative bg-[#5F9234] -z-30">
      {/* Game Started Header - Shows for 1 second */}
      {showGameStarted && (
        <div className="absolute top-20 z-10">
          <GameStarted />
        </div>
      )}

      {/* Dashboard - Shows on left side after "GAME STARTED" disappears */}
      {!showGameStarted && (
        <div className="absolute left-8 top-8 z-10">
          <GameDashboard
            currentTurn={currentTurn}
            diceRoll={diceRoll}
            onRollDice={handleRollDice}
            canRoll={canRoll}
          />
        </div>
      )}

      <div className="w-[900px] h-max-[900px] flex justify-center items-center relative">
        <Image
          src="/background.jpg"
          alt="background"
          className="absolute -z-10"
          width={900}
          height={900}
        />
        <div className="w-fit h-fit flex justify-center items-center relative">
          <Image
            src="/ludoBoard.jpg"
            alt="ludoBoard"
            width={600}
            height={600}
          />

          {/* Red Characters in Red Starting Area */}
          <div
            className="absolute red-character-1"
            style={{
              top: "60px",
              left: "50px",
            }}
          ></div>

          <div
            className="absolute red-character-2"
            style={{
              top: "60px",
              left: "160px",
            }}
          ></div>

          <div
            className="absolute red-character-3"
            style={{
              top: "140px",
              left: "50px",
            }}
          ></div>

          <div
            className="absolute red-character-4"
            style={{
              top: "140px",
              left: "150px",
            }}
          ></div>

          {/* Green Characters in Green Starting Area */}
          <div
            className={`absolute ${
              movingCharacter?.id === "green-character-1" &&
              movingCharacter?.isMoving
                ? "moving-green-character"
                : "green-character-1"
            }`}
            style={{
              top:
                movingCharacter?.id === "green-character-1" &&
                movingCharacter?.direction === "vertical"
                  ? `${movingCharacter.currentTop}px`
                  : characterMoved && gamePhase >= 8
                  ? "120px"
                  : "40px",
              right:
                movingCharacter?.id === "green-character-1" &&
                movingCharacter?.direction === "horizontal"
                  ? `${movingCharacter.currentRight}px`
                  : characterMoved
                  ? "245px"
                  : "160px",
              backgroundPosition:
                movingCharacter?.id === "green-character-1" &&
                movingCharacter?.isMoving
                  ? movingCharacter.direction === "horizontal"
                    ? `${-96 - movingCharacter.spriteFrame * 32}px 0` // Walking left frames
                    : `${-movingCharacter.spriteFrame * 32}px 0` // Walking down frames
                  : undefined,
            }}
          ></div>

          <div
            className="absolute green-character-2"
            style={{
              top: "60px",
              right: "50px",
            }}
          ></div>

          <div
            className="absolute green-character-3"
            style={{
              top: "140px",
              right: "160px",
            }}
          ></div>

          <div
            className="absolute green-character-4"
            style={{
              top: "140px",
              right: "50px",
            }}
          ></div>

          {/* Blue Characters in Blue Starting Area */}
          <div
            className="absolute blue-character-1"
            style={{
              bottom: "140px",
              left: "50px",
            }}
          ></div>

          <div
            className="absolute blue-character-2"
            style={{
              bottom: "140px",
              left: "160px",
            }}
          ></div>

          <div
            className="absolute blue-character-3"
            style={{
              bottom: "60px",
              left: "50px",
            }}
          ></div>

          <div
            className="absolute blue-character-4"
            style={{
              bottom: "60px",
              left: "150px",
            }}
          ></div>

          {/* Yellow Characters in Yellow Starting Area */}
          <div
            className="absolute yellow-character-1"
            style={{
              bottom: "140px",
              right: "160px",
            }}
          ></div>

          <div
            className="absolute yellow-character-2"
            style={{
              bottom: "140px",
              right: "50px",
            }}
          ></div>

          <div
            className="absolute yellow-character-3"
            style={{
              bottom: "60px",
              right: "160px",
            }}
          ></div>

          <div
            className="absolute yellow-character-4"
            style={{
              bottom: "60px",
              right: "50px",
            }}
          ></div>
        </div>

        {/* Animated Walking Character */}
        <div className="absolute bottom-20 left-20">
          <div className="walking-character"></div>
        </div>
      </div>

      <style jsx>{`
        .red-character-1,
        .red-character-2,
        .red-character-3,
        .red-character-4,
        .green-character-1,
        .green-character-2,
        .green-character-3,
        .green-character-4,
        .blue-character-1,
        .blue-character-2,
        .blue-character-3,
        .blue-character-4,
        .yellow-character-1,
        .yellow-character-2,
        .yellow-character-3,
        .yellow-character-4 {
          width: 32px;
          height: 32px;
          background-size: 512px 32px;
          background-repeat: no-repeat;
          background-position: 0 0;
          animation: randomDance 32s infinite;
          animation-timing-function: steps(4);
        }

        .moving-green-character {
          width: 32px;
          height: 32px;
          background-image: url("/green.svg");
          background-size: 512px 32px;
          background-repeat: no-repeat;
          background-position: -96px 0; /* This will be overridden by inline style */
          transition: none;
        }

        .red-character-1,
        .red-character-2,
        .red-character-3,
        .red-character-4 {
          background-image: url("/red.svg");
        }

        .green-character-1,
        .green-character-2,
        .green-character-3,
        .green-character-4 {
          background-image: url("/green.svg");
          transition: none;
        }

        .blue-character-1,
        .blue-character-2,
        .blue-character-3,
        .blue-character-4 {
          background-image: url("/blue.svg");
        }

        .yellow-character-1,
        .yellow-character-2,
        .yellow-character-3,
        .yellow-character-4 {
          background-image: url("/yellow.svg");
        }

        /* Individual character delays */
        .red-character-1 {
          animation-delay: 0s;
        }
        .green-character-1 {
          animation-delay: 2s;
        }
        .blue-character-1 {
          animation-delay: 4s;
        }
        .yellow-character-1 {
          animation-delay: 6s;
        }
        .red-character-2 {
          animation-delay: 8s;
        }
        .green-character-2 {
          animation-delay: 10s;
        }
        .blue-character-2 {
          animation-delay: 12s;
        }
        .yellow-character-2 {
          animation-delay: 14s;
        }
        .red-character-3 {
          animation-delay: 16s;
        }
        .green-character-3 {
          animation-delay: 18s;
        }
        .blue-character-3 {
          animation-delay: 20s;
        }
        .yellow-character-3 {
          animation-delay: 22s;
        }
        .red-character-4 {
          animation-delay: 24s;
        }
        .green-character-4 {
          animation-delay: 26s;
        }
        .blue-character-4 {
          animation-delay: 28s;
        }
        .yellow-character-4 {
          animation-delay: 30s;
        }

        .walking-character {
          width: 32px;
          height: 32px;
          background-image: url("/red.svg");
          background-size: 512px 32px;
          background-repeat: no-repeat;
          animation: walk 1s steps(16) infinite;
        }

        @keyframes randomDance {
          0% {
            background-position: -384px 0;
          }
          6.25% {
            background-position: -512px 0;
          }
          6.26%,
          100% {
            background-position: 0 0;
          }
        }

        @keyframes walk {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: -512px 0;
          }
        }
      `}</style>
    </div>
  );
};

export default PlayPage;
