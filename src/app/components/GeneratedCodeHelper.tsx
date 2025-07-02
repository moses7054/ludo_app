"use client";

import React from "react";
import { LUDO_PROGRAM_ADDRESS } from "../../generated";

export const GeneratedCodeHelper: React.FC = () => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
      <h3 className="text-xl font-semibold text-white mb-4">
        Using Your Generated Code
      </h3>

      <div className="space-y-6">
        <div className="bg-white/5 rounded-lg p-4">
          <h4 className="text-lg font-medium text-white mb-2">
            Program Address
          </h4>
          <code className="text-green-300 text-sm break-all">
            {LUDO_PROGRAM_ADDRESS}
          </code>
        </div>

        <div className="bg-white/5 rounded-lg p-4">
          <h4 className="text-lg font-medium text-white mb-2">
            Available Instructions
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="text-purple-300 font-medium mb-2">
                Game Management
              </h5>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• createGame</li>
                <li>• joinGame</li>
                <li>• joinAndStartGame</li>
                <li>• cancelGame</li>
              </ul>
            </div>
            <div>
              <h5 className="text-purple-300 font-medium mb-2">Game Actions</h5>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• makeMove</li>
                <li>• rollDiceDebug</li>
                <li>• tokenIntoPlay</li>
                <li>• nextTurnDebug</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-4">
          <h4 className="text-lg font-medium text-white mb-2">Code Example</h4>
          <pre className="bg-gray-900 rounded-lg p-4 text-sm text-gray-300 overflow-x-auto">
            {`// Import the generated instructions
import { 
  getCreateGameInstructionAsync,
  getJoinGameInstruction,
  getMakeMoveInstruction,
  LUDO_PROGRAM_ADDRESS 
} from '../../generated';

// Create a game
const createGameInstruction = await getCreateGameInstructionAsync({
  player: publicKey,
  seed: BigInt(12345),
  numPlayers: 4,
  color: Colors.Red
});

// Join a game
const joinGameInstruction = getJoinGameInstruction({
  player: publicKey,
  game: gameAddress,
  color: Colors.Blue
});

// Make a move
const makeMoveInstruction = getMakeMoveInstruction({
  player: publicKey,
  game: gameAddress,
  fromPosition: 0,
  toPosition: 1
});`}
          </pre>
        </div>

        <div className="bg-white/5 rounded-lg p-4">
          <h4 className="text-lg font-medium text-white mb-2">
            Integration Steps
          </h4>
          <ol className="text-gray-300 text-sm space-y-2">
            <li>
              <strong>1. Import Instructions:</strong> Use the generated
              instruction functions
            </li>
            <li>
              <strong>2. Create Transactions:</strong> Add instructions to
              Solana transactions
            </li>
            <li>
              <strong>3. Sign & Send:</strong> Use wallet to sign and send
              transactions
            </li>
            <li>
              <strong>4. Handle Responses:</strong> Process transaction
              confirmations
            </li>
            <li>
              <strong>5. Update UI:</strong> Reflect game state changes
            </li>
          </ol>
        </div>

        <div className="bg-white/5 rounded-lg p-4">
          <h4 className="text-lg font-medium text-white mb-2">
            Generated Files Structure
          </h4>
          <div className="text-gray-300 text-sm">
            <p>
              <strong>📁 generated/</strong>
            </p>
            <ul className="ml-4 space-y-1">
              <li>
                📄 <strong>index.ts</strong> - Main exports
              </li>
              <li>
                📁 <strong>instructions/</strong> - All program instructions
              </li>
              <li>
                📁 <strong>accounts/</strong> - Account structures
              </li>
              <li>
                📁 <strong>types/</strong> - TypeScript types
              </li>
              <li>
                📁 <strong>programs/</strong> - Program clients
              </li>
              <li>
                📁 <strong>errors/</strong> - Error handling
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
