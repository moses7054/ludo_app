"use client";

import React from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import {
  WalletMultiButton,
  WalletDisconnectButton,
} from "@solana/wallet-adapter-react-ui";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export const WalletConnectButton: React.FC = () => {
  const { connected, publicKey } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = React.useState<number | null>(null);

  // Fetch wallet balance when connected
  React.useEffect(() => {
    if (connected && publicKey) {
      const getBalance = async () => {
        try {
          const balance = await connection.getBalance(publicKey);
          setBalance(balance / LAMPORTS_PER_SOL);
        } catch (error) {
          console.error("Error fetching balance:", error);
          setBalance(null);
        }
      };
      getBalance();
    } else {
      setBalance(null);
    }
  }, [connected, publicKey, connection]);

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-4">Solana Wallet</h2>

      {!connected ? (
        <div className="text-center">
          <p className="text-white mb-4">
            Connect your Solana wallet to get started
          </p>
          <WalletMultiButton className="!bg-white !text-purple-600 hover:!bg-gray-100 !transition-colors !font-semibold !px-6 !py-3 !rounded-lg" />
        </div>
      ) : (
        <div className="text-center space-y-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <p className="text-white font-semibold mb-2">Connected Wallet:</p>
            <p className="text-yellow-200 font-mono text-sm break-all">
              {publicKey?.toBase58()}
            </p>
            {balance !== null && (
              <p className="text-green-200 font-semibold mt-2">
                Balance: {balance.toFixed(4)} SOL
              </p>
            )}
          </div>

          <div className="flex gap-2 justify-center">
            <WalletMultiButton className="!bg-white !text-purple-600 hover:!bg-gray-100 !transition-colors !font-semibold !px-4 !py-2 !rounded-lg !text-sm" />
            <WalletDisconnectButton className="!bg-red-500 hover:!bg-red-600 !transition-colors !text-white !font-semibold !px-4 !py-2 !rounded-lg !text-sm" />
          </div>
        </div>
      )}
    </div>
  );
};
