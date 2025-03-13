"use client";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Buffer } from "buffer";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { useWallet } from "@suiet/wallet-kit";
import { toast } from "sonner";

const MedicalForm = ({ packageId, moduleName }) => {
    const [dataHash, setDataHash] = useState("");
    const wallet = useWallet(); // Suiet Kit Hook

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!wallet.connected) {
            toast.error("Please connect your Suiet wallet");
            return;
        }

        try {
            // Convert data hash to vector<u8>
            const dataHashBytes = Array.from(Buffer.from(dataHash, "utf-8"));

            // Create a new transaction block
            const txb = new TransactionBlock();
            txb.moveCall({
                target: `${packageId}::${moduleName}::create_medical_data`,
                arguments: [txb.pure(dataHashBytes, "vector<u8>")],
            });

            // Sign and execute the transaction
            await signAndExecuteTransactionBlock({
                transactionBlock: await txb.build(),
            });

            toast.success("Medical data created successfully");
            setDataHash(""); // Reset form

        } catch (error) {
            console.error("Error creating medical data:", error);
            toast.error("Failed to create medical data", {
                description: error.message || "Unknown error",
            });
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Create Medical Data</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-black-700" htmlFor="dataHash">
                        Data Hash
                    </label>
                    <input
                        type="text"
                        id="dataHash"
                        value={dataHash}
                        onChange={(e) => setDataHash(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        placeholder="Enter medical data hash"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Create Medical Data
                </button>
            </form>
        </div>
    );
};

// Function stub for signing transactions (adjust according to your wallet setup)
async function signAndExecuteTransactionBlock({ transactionBlock }) {
    console.log("Executing transaction:", transactionBlock);
    // Implement actual signing logic based on your wallet provider
}
MedicalForm.propTypes = {
    packageId: PropTypes.string.isRequired,
    moduleName: PropTypes.string.isRequired,
};

export default MedicalForm;
