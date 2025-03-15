"use client";

import { createContext, useContext, useState } from "react";
import { createNetworkConfig, SuiClientProvider, ConnectButton, WalletProvider } from "@mysten/dapp-kit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

// Wallet context
const WalletContext = createContext<{ walletAddress: string | null }>({ walletAddress: null });

const { networkConfig } = createNetworkConfig({
  localnet: { url: "http://127.0.0.1:9000" },
  testnet: { url: "https://fullnode.testnet.sui.io" },
  mainnet: { url: "https://fullnode.mainnet.sui.io" },
});

const queryClient = new QueryClient();

export default function SuiProviders({ children }: { children: React.ReactNode }) {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
        <WalletProvider autoConnect>
          <WalletContext.Provider value={{ walletAddress }}>
            {children}
            <ConnectButton />
          </WalletContext.Provider>
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}

export { WalletContext };
