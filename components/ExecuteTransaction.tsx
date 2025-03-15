"use client";
import { useCurrentWallet, useSignAndExecuteTransaction } from "@mysten/dapp-kit"; // ✅ Correct import
import { Transaction } from "@mysten/sui/transactions";



 //  // ✅ Corrected module import
const PACKAGE_ID = "0xd07607505e3b26da54a73e8ed8306451d939528224f392957a29ffb6b8057342"; // Replace with your contract ID

const ExecuteTransaction = () => {
  const { currentWallet } = useCurrentWallet();
  const executeTransaction = useSignAndExecuteTransaction();

  const sendTransaction = async () => {
    if (!currentWallet) {
      console.error("Wallet is not connected");
      return;
    }

    const tx = new Transaction();
    tx.moveCall({
      target: `${PACKAGE_ID}::module_name::function_name`, // Update with actual module & function
      arguments: [tx.pure.string("example_argument")], // Using proper type serialization
    });

    try {
      const result = await executeTransaction.mutateAsync({
        transaction: tx,
      });
      console.log("Transaction Success:", result);
    } catch (error) {
      console.error("Transaction Failed:", error);
    }
  };

  return (
    <button onClick={sendTransaction} className="px-4 py-2 bg-green-500 text-white">
      Execute Transaction
    </button>
  );
};

export default ExecuteTransaction;
