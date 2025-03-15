"use client";

import { useState } from "react";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
    sui?: any;
    suiWallet?: any;
  }
}

const ConnectWalletButton: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletType, setWalletType] = useState<string | null>(null);

  // Function to connect to MetaMask
  const connectMetaMask = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask extension!");
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setWalletType("metamask");
      }
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };

  // Function to connect to Sui Wallet
  const connectSuiWallet = async () => {
    if (!window.sui || !window.suiWallet) {
      alert("Sui Wallet not detected. Please install it from https://sui.io/");
      return;
    }
    try {
      const accounts = await window.suiWallet.requestAccounts();
      if (accounts && accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setWalletType("sui");
      }
    } catch (error) {
      console.error("Error connecting to Sui Wallet:", error);
    }
  };

  return (
    <div className="flex space-x-4">
      {walletAddress ? (
        <div className="flex space-x-4 items-center">
          <span className="text-white">
            Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </span>
          <button
            onClick={() => {
              setWalletAddress(null);
              setWalletType(null);
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <div className="flex space-x-4">
          <button
            onClick={connectMetaMask}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Connect MetaMask
          </button>
          <button
            onClick={connectSuiWallet}
            className="bg-purple-500 text-white px-4 py-2 rounded-md"
          >
            Connect Sui Wallet
          </button>
        </div>
      )}
    </div>
  );
};

export default ConnectWalletButton;
