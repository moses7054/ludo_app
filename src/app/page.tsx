"use client";

import { WalletConnectButton } from "./components/WalletConnectButton";
// import { GameManager } from "./components/GameManager";
// import { GeneratedCodeHelper } from "./components/GeneratedCodeHelper";
import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

export default function Home() {
  const { connected } = useWallet();
  const [showGameSelection, setShowGameSelection] = useState(false);

  // Fake game data
  const availableGames = [
    { id: "GAME001", players: "2/4", stake: "0.1 SOL", status: "Waiting" },
    { id: "GAME002", players: "3/4", stake: "0.2 SOL", status: "Waiting" },
    { id: "GAME003", players: "1/4", stake: "0.05 SOL", status: "Waiting" },
    { id: "GAME004", players: "2/4", stake: "0.3 SOL", status: "Waiting" },
  ];

  const handleCreateGame = () => {
    // For now, just redirect to play page
    window.location.href = "/play";
  };

  const handleJoinGame = () => {
    // For now, just redirect to play page
    window.location.href = "/play";
  };

  const handleLetsPlay = () => {
    if (connected) {
      setShowGameSelection(true);
    }
  };

  if (showGameSelection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Pixel Art Background Pattern */}
        <div className="absolute inset-0 bg-pixel-pattern opacity-20"></div>

        {/* Main Content */}
        <div className="max-w-6xl w-full space-y-8 relative z-10">
          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-5xl font-bold text-white mb-4 text-shadow-lg pixel-font">
              🎲 GAME LOBBY
            </h1>
            <p className="text-xl text-white/90 max-w-lg mx-auto pixel-font">
              Select your game mode
            </p>
          </div>

          {/* Game Mode Selection */}
          <div className="flex justify-center mb-12">
            <div className="relative">
              {/* Gaming Terminal */}
              <div className="w-96 h-32 bg-gradient-to-br from-slate-600 to-slate-800 rounded-lg border-4 border-slate-500 shadow-2xl relative pixel-border">
                {/* Terminal Screen */}
                <div className="absolute inset-4 bg-green-900 rounded border-2 border-green-700 flex items-center justify-center">
                  <div className="text-green-400 text-xl pixel-font">
                    GAME_SELECT.EXE
                  </div>
                </div>

                {/* Pixel Characters Around Terminal */}
                <div className="absolute -top-8 left-1/4 transform -translate-x-1/2">
                  <div className="pixel-character red-character"></div>
                </div>
                <div className="absolute -top-8 right-1/4 transform translate-x-1/2">
                  <div className="pixel-character green-character"></div>
                </div>
                <div className="absolute -bottom-8 left-1/4 transform -translate-x-1/2">
                  <div className="pixel-character blue-character"></div>
                </div>
                <div className="absolute -bottom-8 right-1/4 transform translate-x-1/2">
                  <div className="pixel-character yellow-character"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Game Options */}
          <div className="grid md:grid-cols-2 gap-6">
            <button
              onClick={handleCreateGame}
              className="bg-slate-800/80 backdrop-blur-sm hover:bg-slate-700/80 text-white font-bold py-8 px-6 rounded-lg text-xl transition-all duration-200 transform hover:scale-105 shadow-lg border-4 border-red-500 pixel-font pixel-border"
            >
              <div className="text-4xl mb-4">🎯</div>
              <div className="text-red-400">CREATE NEW GAME</div>
              <div className="text-sm text-white/80 mt-2">
                Start your own ludo match
              </div>
            </button>

            <div className="bg-slate-800/80 backdrop-blur-sm text-white font-bold py-8 px-6 rounded-lg text-xl shadow-lg border-4 border-blue-500 pixel-font pixel-border">
              <div className="text-4xl mb-4">🎮</div>
              <div className="text-blue-400">JOIN EXISTING GAME</div>
              <div className="text-sm text-white/80 mt-2">
                Select from available games below
              </div>
            </div>
          </div>

          {/* Available Games */}
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-lg p-6 border-4 border-slate-600 pixel-border">
            <h3 className="text-2xl font-bold text-white mb-6 text-center pixel-font">
              🎲 AVAILABLE GAMES
            </h3>
            <div className="space-y-4">
              {availableGames.map((game) => (
                <div
                  key={game.id}
                  className="bg-slate-700/60 backdrop-blur-sm rounded-lg p-4 flex justify-between items-center hover:bg-slate-600/60 transition-all duration-200 border-2 border-slate-500 pixel-border"
                >
                  <div className="flex items-center space-x-6">
                    <div className="text-white font-bold text-lg pixel-font">
                      {game.id}
                    </div>
                    <div className="text-white/80 pixel-font">
                      Players:{" "}
                      <span className="font-semibold text-cyan-400">
                        {game.players}
                      </span>
                    </div>
                    <div className="text-white/80 pixel-font">
                      Stake:{" "}
                      <span className="font-semibold text-yellow-400">
                        {game.stake}
                      </span>
                    </div>
                    <div className="text-green-400 font-semibold pixel-font">
                      {game.status}
                    </div>
                  </div>
                  <button
                    onClick={handleJoinGame}
                    className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg pixel-font border-2 border-green-400 pixel-border"
                  >
                    JOIN
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Back Button */}
          <div className="text-center">
            <button
              onClick={() => setShowGameSelection(false)}
              className="text-white/80 hover:text-white underline pixel-font bg-slate-800/60 hover:bg-slate-700/60 px-4 py-2 rounded border-2 border-slate-600 transition-all duration-200"
            >
              ← Back to Lounge
            </button>
          </div>
        </div>

        <style jsx>{`
          @import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");

          .pixel-font {
            font-family: "Press Start 2P", cursive;
            image-rendering: pixelated;
          }

          .pixel-border {
            border-style: solid;
            border-image: linear-gradient(45deg, #4a5568, #2d3748) 1;
          }

          .pixel-character {
            width: 32px;
            height: 32px;
            background-size: 512px 32px;
            background-repeat: no-repeat;
            background-position: 0 0;
            animation: idlePixel 3s infinite;
            border-radius: 0;
            image-rendering: pixelated;
          }

          .red-character {
            background-image: url("/red.svg");
          }

          .green-character {
            background-image: url("/green.svg");
          }

          .blue-character {
            background-image: url("/blue.svg");
          }

          .yellow-character {
            background-image: url("/yellow.svg");
          }

          .bg-pixel-pattern {
            background-image: radial-gradient(
                circle at 25% 25%,
                rgba(255, 255, 255, 0.1) 1px,
                transparent 1px
              ),
              radial-gradient(
                circle at 75% 75%,
                rgba(255, 255, 255, 0.1) 1px,
                transparent 1px
              );
            background-size: 20px 20px;
            background-position: 0 0, 10px 10px;
          }

          @keyframes idlePixel {
            0%,
            50%,
            100% {
              background-position: 0 0;
            }
            25% {
              background-position: -32px 0;
            }
            75% {
              background-position: -64px 0;
            }
          }

          .text-shadow-lg {
            text-shadow: 4px 4px 0px rgba(0, 0, 0, 0.8);
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Pixel Art Background Pattern */}
      <div className="absolute inset-0 bg-pixel-pattern opacity-20"></div>

      {/* Main Content */}
      <div className="max-w-6xl w-full space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-6xl font-bold text-white mb-4 pixel-font text-shadow-lg">
            🎲 LUDO LOUNGE
          </h1>
          <p className="text-xl text-white/90 max-w-lg mx-auto pixel-font">
            Join the ultimate pixel gaming experience
          </p>
        </div>

        {/* Gaming Room Scene */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            {/* Gaming Table */}
            <div className="w-96 h-96 bg-gradient-to-br from-amber-800 to-amber-900 rounded-lg border-4 border-amber-700 shadow-2xl relative pixel-border">
              {/* Ludo Board on Table */}
              <div className="absolute inset-4 bg-white rounded border-2 border-gray-300 flex items-center justify-center">
                <div className="text-6xl">🎯</div>
              </div>

              {/* Pixel Characters Around Table */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <div className="pixel-character red-character"></div>
              </div>
              <div className="absolute top-1/2 -right-8 transform -translate-y-1/2">
                <div className="pixel-character green-character"></div>
              </div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="pixel-character blue-character"></div>
              </div>
              <div className="absolute top-1/2 -left-8 transform -translate-y-1/2">
                <div className="pixel-character yellow-character"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Game Stats Panel */}
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-lg p-6 border-4 border-slate-600 pixel-border">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl text-green-400 font-bold pixel-font">
                127
              </div>
              <div className="text-white/80 pixel-font">Players Online</div>
            </div>
            <div>
              <div className="text-3xl text-yellow-400 font-bold pixel-font">
                23
              </div>
              <div className="text-white/80 pixel-font">Games Active</div>
            </div>
            <div>
              <div className="text-3xl text-purple-400 font-bold pixel-font">
                45.2
              </div>
              <div className="text-white/80 pixel-font">SOL in Play</div>
            </div>
          </div>
        </div>

        {/* Wallet Connect Section */}
        <div className="flex justify-center">
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-lg p-8 border-4 border-slate-600 pixel-border">
            <h2 className="text-2xl font-bold text-white mb-6 text-center pixel-font">
              🔗 Connect Your Wallet to Enter
            </h2>
            <WalletConnectButton />
          </div>
        </div>

        {/* Let's Play Button - Only show if wallet is connected */}
        {connected && (
          <div className="flex justify-center">
            <button
              onClick={handleLetsPlay}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-6 px-12 rounded-lg text-2xl transition-all duration-200 transform hover:scale-105 shadow-lg border-4 border-green-400 pixel-font pixel-border"
            >
              <div className="text-4xl mb-2">🎮</div>
              <div>LET&apos;S PLAY</div>
            </button>
          </div>
        )}

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-lg p-6 text-center border-4 border-slate-600 pixel-border">
            <div className="text-4xl mb-4">🎮</div>
            <h3 className="text-lg font-semibold text-white mb-2 pixel-font">
              Retro Gaming
            </h3>
            <p className="text-white/80 text-sm pixel-font">
              Classic ludo with modern pixel art characters
            </p>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-sm rounded-lg p-6 text-center border-4 border-slate-600 pixel-border">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-lg font-semibold text-white mb-2 pixel-font">
              Fast Matches
            </h3>
            <p className="text-white/80 text-sm pixel-font">
              Quick games with instant blockchain transactions
            </p>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-sm rounded-lg p-6 text-center border-4 border-slate-600 pixel-border">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-lg font-semibold text-white mb-2 pixel-font">
              Win Rewards
            </h3>
            <p className="text-white/80 text-sm pixel-font">
              Earn SOL tokens and climb the leaderboard
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");

        .pixel-font {
          font-family: "Press Start 2P", cursive;
          image-rendering: pixelated;
        }

        .pixel-border {
          border-style: solid;
          border-image: linear-gradient(45deg, #4a5568, #2d3748) 1;
        }

        .pixel-character {
          width: 32px;
          height: 32px;
          background-size: 512px 32px;
          background-repeat: no-repeat;
          background-position: 0 0;
          animation: idlePixel 3s infinite;
          border-radius: 0;
          image-rendering: pixelated;
        }

        .red-character {
          background-image: url("/red.svg");
        }

        .green-character {
          background-image: url("/green.svg");
        }

        .blue-character {
          background-image: url("/blue.svg");
        }

        .yellow-character {
          background-image: url("/yellow.svg");
        }

        .bg-pixel-pattern {
          background-image: radial-gradient(
              circle at 25% 25%,
              rgba(255, 255, 255, 0.1) 1px,
              transparent 1px
            ),
            radial-gradient(
              circle at 75% 75%,
              rgba(255, 255, 255, 0.1) 1px,
              transparent 1px
            );
          background-size: 20px 20px;
          background-position: 0 0, 10px 10px;
        }

        @keyframes idlePixel {
          0%,
          50%,
          100% {
            background-position: 0 0;
          }
          25% {
            background-position: -32px 0;
          }
          75% {
            background-position: -64px 0;
          }
        }

        .text-shadow-lg {
          text-shadow: 4px 4px 0px rgba(0, 0, 0, 0.8);
        }
      `}</style>
    </div>
  );
}
