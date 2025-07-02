import { WalletConnectButton } from "./components/WalletConnectButton";
import { GameManager } from "./components/GameManager";
import { GeneratedCodeHelper } from "./components/GeneratedCodeHelper";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-white mb-4">Ludo App</h1>
          <p className="text-xl text-gray-300 max-w-lg mx-auto">
            Connect your Solana wallet to start playing blockchain-powered Ludo
            games
          </p>
        </div>

        {/* Play Game Button */}
        <div className="flex justify-center">
          <Link
            href="/game"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            🎲 Play Ludo Game
          </Link>
        </div>

        {/* Wallet Connect Section */}
        <div className="flex justify-center">
          <WalletConnectButton />
        </div>

        {/* Game Manager Section */}
        <div className="mt-12">
          <GameManager />
        </div>

        {/* Generated Code Helper */}
        <div className="mt-12">
          <GeneratedCodeHelper />
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="text-3xl mb-4">🎲</div>
            <h3 className="text-lg font-semibold text-white mb-2">Play Ludo</h3>
            <p className="text-gray-300 text-sm">
              Enjoy classic Ludo with blockchain integration
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="text-3xl mb-4">💰</div>
            <h3 className="text-lg font-semibold text-white mb-2">Earn SOL</h3>
            <p className="text-gray-300 text-sm">
              Win Solana tokens by playing and winning games
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="text-3xl mb-4">🔒</div>
            <h3 className="text-lg font-semibold text-white mb-2">Secure</h3>
            <p className="text-gray-300 text-sm">
              All transactions secured by Solana blockchain
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mt-8">
          <h3 className="text-xl font-semibold text-white mb-4">
            How to Get Started:
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-300">
            <li>Install a Solana wallet (Phantom, Solflare, etc.)</li>
            <li>Click the &quot;Connect Wallet&quot; button above</li>
            <li>Approve the connection in your wallet</li>
            <li>Try the demo transactions below</li>
            <li>Click &quot;Play Ludo Game&quot; to start playing!</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
