import { useState, useEffect } from "react";
import { ConnectButton, useWallet } from "@suiet/wallet-kit";
import "./App.css";
import "./index.css";
import Navbar from "./components/Navbar";
import MedicalForm from "./components/MedicalForm";

function App() {
  const { connected, disconnect, account, error } = useWallet();
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    if (connected && account) {
      setWalletAddress(account.address);
    }
  }, [connected, account]);

  const handleCreateMedicalData = async () => {
    if (!connected) {
      alert("Please connect your wallet first!");
      return;
    }

    try {
      const tx = {
        kind: "moveCall",
        data: {
          packageObjectId: "0x9a37905ef941cd7f0270f0b363c7d202dd5d105102a590051895589f3959431c",
          module: "medical_data",
          function: "create_medical_data",
          typeArguments: [],
          arguments: ["your_data_hash_here"],
        },
      };

      console.log("Transaction:", tx);
      // Call the wallet to sign and submit the transaction
      // Ensure you have a transaction signing function integrated with @suiet/wallet-kit
      alert("Transaction sent! (Implementation needed for signing)");
    } catch (error) {
      console.error("Error creating medical data:", error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mx-auto p-6">
        <h1 className="font-bold text-center text-3xl">
          Medical Research Data on Sui Blockchain
        </h1>

        <MedicalForm
          packageId="0x9a37905ef941cd7f0270f0b363c7d202dd5d105102a590051895589f3959431c"
          moduleName="medical_data"
        />

        {/* Wallet Connection */}
        <div className="text-center mt-4">
          <ConnectButton />
          {connected && (
            <div>
              <p className="text-green-500 mt-2">
                Connected as: {walletAddress}
              </p>
              <button
                onClick={disconnect}
                className="px-4 py-2 bg-red-600 text-white rounded-md mt-2"
              >
                Disconnect Wallet
              </button>
            </div>
          )}
        </div>

        {/* Medical Data Button */}
        <div className="mt-4 text-center">
          <button
            onClick={handleCreateMedicalData}
            className="px-4 py-2 bg-green-600 text-white rounded-md"
          >
            Create Medical Data
          </button>
        </div>

        {/* Display Wallet Errors */}
        {error && <p className="text-red-500 mt-2">{error.message}</p>}
      </div>
    </>
  );
}

export default App;
