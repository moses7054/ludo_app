"use client";

import React, { useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { LUDO_PROGRAM_ADDRESS } from "../../generated";
import { Transaction, PublicKey, SystemProgram } from "@solana/web3.js";

export const GameManager: React.FC = () => {
  const { connected, publicKey, signTransaction } = useWallet();
  const { connection } = useConnection();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [recipientAddress, setRecipientAddress] = useState<string>("");

  const handleSendTransaction = async () => {
    if (!connected || !publicKey || !signTransaction) {
      setMessage("Please connect your wallet first");
      return;
    }

    if (!recipientAddress) {
      setMessage("Please enter a recipient address");
      return;
    }

    setLoading(true);
    setMessage("Sending transaction...");

    try {
      // Create a simple transfer transaction as an example
      const transaction = new Transaction();

      // Add a transfer instruction (this is just for demonstration)
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(recipientAddress),
          lamports: 1000000, // 0.001 SOL
        })
      );

      const signedTransaction = await signTransaction(transaction);
      const signature = await connection.sendRawTransaction(
        signedTransaction.serialize()
      );
      await connection.confirmTransaction(signature);

      setMessage(`Transaction sent successfully! Signature: ${signature}`);
    } catch (error) {
      console.error("Error sending transaction:", error);
      setMessage(
        `Error sending transaction: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGameDemo = async () => {
    if (!connected || !publicKey || !signTransaction) {
      setMessage("Please connect your wallet first");
      return;
    }

    setLoading(true);
    setMessage("Creating demo game transaction...");

    try {
      // This is a demo transaction - in a real implementation, you would use the generated instructions
      const transaction = new Transaction();

      // Add a simple instruction to demonstrate transaction creation
      // In practice, you would use the generated instructions from your program
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: publicKey, // Send to self as demo
          lamports: 1000, // Very small amount
        })
      );

      const signedTransaction = await signTransaction(transaction);
      const signature = await connection.sendRawTransaction(
        signedTransaction.serialize()
      );
      await connection.confirmTransaction(signature);

      setMessage(`Demo transaction created! Signature: ${signature}`);
    } catch (error) {
      console.error("Error creating demo transaction:", error);
      setMessage(
        `Error creating demo transaction: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  if (!connected) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
        <p className="text-white">Please connect your wallet to manage games</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">
          Transaction Demo
        </h3>

        <div className="mb-4">
          <label className="block text-white text-sm font-medium mb-2">
            Recipient Address (for demo transfer)
          </label>
          <input
            type="text"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter recipient address"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={handleSendTransaction}
            disabled={loading || !recipientAddress}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            {loading ? "Sending..." : "Send Demo Transaction"}
          </button>

          <button
            onClick={handleCreateGameDemo}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            {loading ? "Creating..." : "Create Demo Game"}
          </button>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">
          Generated Code Integration
        </h3>

        <div className="space-y-4">
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-lg font-medium text-white mb-2">
              Available Instructions
            </h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• createGame - Create a new Ludo game</li>
              <li>• joinGame - Join an existing game</li>
              <li>• makeMove - Make a move in the game</li>
              <li>• rollDiceDebug - Roll dice for debugging</li>
              <li>• joinAndStartGame - Join and start a game</li>
              <li>• cancelGame - Cancel a game</li>
            </ul>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-lg font-medium text-white mb-2">
              Program Details
            </h4>
            <p className="text-gray-300 text-sm">
              <strong>Program Address:</strong> {LUDO_PROGRAM_ADDRESS}
            </p>
            <p className="text-gray-300 text-sm">
              <strong>Network:</strong> Devnet
            </p>
            <p className="text-gray-300 text-sm">
              <strong>Generated with:</strong> Codama + Solana Kit
            </p>
          </div>
        </div>
      </div>

      {message && (
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <p className="text-white text-sm">{message}</p>
        </div>
      )}

      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
        <h4 className="text-lg font-semibold text-white mb-2">Next Steps</h4>
        <div className="text-gray-300 text-sm space-y-2">
          <p>
            ✅ <strong>Wallet Connection:</strong> Working with Solana wallets
          </p>
          <p>
            ✅ <strong>Transaction Creation:</strong> Basic transaction
            functionality
          </p>
          <p>
            🔄 <strong>Program Integration:</strong> Connect with your Ludo
            program
          </p>
          <p>
            📝 <strong>Instruction Building:</strong> Use generated instructions
          </p>
          <p>
            🎮 <strong>Game Logic:</strong> Implement full Ludo gameplay
          </p>
        </div>
      </div>
    </div>
  );
};
