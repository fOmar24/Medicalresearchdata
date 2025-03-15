"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
 import { WalletContext } from "../../utils/SuiProviders";
import ExecuteTransaction from "../../components/ExecuteTransaction";
import FetchData from "../../components/FetchData";

export default function HomePage() {
  const router = useRouter();
  const { walletAddress } = useContext(WalletContext); // Access wallet context

  useEffect(() => {
    if (walletAddress) {
      router.push("/dashboard"); // Redirect to dashboard if wallet is connected
    }
  }, [walletAddress, router]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex flex-col">
      {/* Main Content */}
      <main className="container mx-auto flex flex-col items-center justify-center py-20">
        {/* Hero Section */}
        <section className="text-center">
          <h1 className="text-5xl font-bold text-blue-800 mb-4">
            Decentralized Medical Research Data
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Secure, immutable, and transparent data sharing for medical research.
          </p>
        </section>

        {/* Features Section */}
        <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white rounded-2xl shadow-lg transform hover:scale-105 transition">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">
              Tamper-Proof Storage
            </h2>
            <p className="text-gray-600">
              Ensure data integrity with blockchain-backed security.
            </p>
          </div>
          <div className="p-8 bg-white rounded-2xl shadow-lg transform hover:scale-105 transition">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">
              Privacy & Control
            </h2>
            <p className="text-gray-600">
              Users maintain ownership and control over their data.
            </p>
          </div>
          <div className="p-8 bg-white rounded-2xl shadow-lg transform hover:scale-105 transition">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">
              Seamless Collaboration
            </h2>
            <p className="text-gray-600">
              Enable secure data exchange between researchers worldwide.
            </p>
          </div>
        </section>

        {/* Transaction Buttons */}
        <div className="mt-12 flex flex-col space-y-6 items-center">
          <ExecuteTransaction />
          <FetchData />
        </div>
      </main>
    </div>
  );
}
