import { LudoBoard } from "../components/game/LudoBoard";
import { GameControls } from "../components/game/GameControls";
import { PlayerInfo } from "../components/game/PlayerInfo";

export default function GamePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Ludo Game</h1>
          <p className="text-gray-300">Classic Ludo with modern UI</p>
        </div>

        {/* Game Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Player Info */}
          <div className="lg:col-span-1">
            <PlayerInfo />
          </div>

          {/* Center - Game Board */}
          <div className="lg:col-span-2">
            <LudoBoard />
          </div>

          {/* Right Sidebar - Game Controls */}
          <div className="lg:col-span-1">
            <GameControls />
          </div>
        </div>
      </div>
    </div>
  );
}
