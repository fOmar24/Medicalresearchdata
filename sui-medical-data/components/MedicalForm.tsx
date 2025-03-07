// components/MedicalForm.tsx;
import React, { useState } from 'react';
import { Transaction } from '@mysten/sui/transactions';
import { useCurrentAccount, useSuiClient, useSignTransaction } from '@mysten/dapp-kit';
import { toast } from 'sonner';

interface MedicalFormProps {
  packageId: string;
  moduleName: string;
}

const MedicalForm: React.FC<MedicalFormProps> = ({ 
  packageId, 
  moduleName 
}) => {
  const [dataHash, setDataHash] = useState<string>('');
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
      // Convert data hash to vector<u8>
      const dataHashBytes = Array.from(Buffer.from(dataHash, 'utf-8'));

      // Create a new transaction
      const txb = new Transaction();
      
      // Call the create_medical_data function
      txb.moveCall({
        target: `${packageId}::${moduleName}::create_medical_data`,
        arguments: [txb.pure.vector('u8', dataHashBytes)]
      });

      // Sign the transaction
      const signedTransaction = await signTransaction({ transaction: txb });

      // Execute the signed transaction
      const result = await suiClient.executeTransactionBlock({
        transactionBlock: signedTransaction.bytes,
        signature: signedTransaction.signature,
        options: {
          showEffects: true,
          showInput: true,
        }
      });

      // Handle successful transaction
      toast.success('Medical data created successfully', {
        description: `Transaction Digest: ${result.digest}`
      });

      // Reset form
      setDataHash('');

    } catch (error) {
      console.error('Error creating medical data:', error);
      toast.error('Failed to create medical data', {
        description: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create Medical Data</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label 
            htmlFor="dataHash" 
            className="block text-sm font-medium text-gray-700"
          >
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

export default MedicalForm;

