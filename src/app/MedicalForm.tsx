// components/MedicalForm.tsx;
"use client";

import React, { useState } from 'react';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { useCurrentAccount, useSuiClient, useSignTransaction } from '@mysten/dapp-kit';
import { toast } from 'sonner';

interface MedicalFormProps {
  packageId: string;
  moduleName: string;
}

const MedicalForm: React.FC<MedicalFormProps> = ({ packageId, moduleName }) => {
  const [dataHash, setDataHash] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const suiClient = useSuiClient();
  const account = useCurrentAccount();
  const { mutateAsync: signTransaction } = useSignTransaction();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!account) {
      toast.error('Please connect your wallet');
      return;
    }

    try {
      setLoading(true);
      const dataHashBytes = Array.from(Buffer.from(dataHash, 'utf-8'));
      const txb = new TransactionBlock();

      txb.moveCall({
        target: `${packageId}::${moduleName}::create_medical_data`,
        arguments: [txb.pure(dataHashBytes)]
      });

      const signedTransaction = await signTransaction({ transaction: txb });
      const result = await suiClient.executeTransactionBlock({
        transactionBlock: signedTransaction.bytes,
        signature: signedTransaction.signature,
        options: {
          showEffects: true,
          showInput: true,
        }
      });

      toast.success('Medical data created successfully', {
        description: `Transaction Digest: ${result.digest}`
      });

      setDataHash('');
    } catch (error) {
      toast.error('Failed to create medical data', {
        description: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Create Medical Data</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="dataHash" className="block text-sm font-medium text-gray-700">
            Data Hash
          </label>
          <input
            type="text"
            id="dataHash"
            value={dataHash}
            onChange={(e) => setDataHash(e.target.value)}
            className="mt-1 block w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            placeholder="Enter medical data hash"
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-md text-white ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
          disabled={loading}
        >
          {loading ? "Processing..." : "Create Medical Data"}
        </button>
      </form>
    </div>
  );
};

export default MedicalForm;
