import { Transaction } from '@mysten/sui/transactions';
import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';

// Create a Sui client for a specific network
export const createSuiClient = (network: 'testnet' | 'mainnet' = 'testnet'): SuiClient => {
  return new SuiClient({
    url: getFullnodeUrl(network)
  });
};

// Helper function to create a transaction
export const createTransaction = (): Transaction => {
  return new Transaction();
};

// Function to execute a transaction
export async function executeTransaction(
  client: SuiClient, 
  txb: Transaction,
  wallet: { signTransactionBlock: (args: { transactionBlock: Uint8Array }) => Promise<{ signature: string; transactionBlockBytes: Uint8Array }> },
  signer: string // Assuming this is the signer's address
) {
  try {
    // Build the transaction
    const transactionBytes = await txb.build({ client });

    // Sign the transaction (this step depends on your wallet/signer setup)
    const signedTransaction = await wallet.signTransactionBlock({
      transactionBlock: transactionBytes,
    });

    // Execute the signed transaction
    const result = await client.executeTransactionBlock({
      transactionBlock: signedTransaction.transactionBlockBytes,
      signature: signedTransaction.signature,
      options: {
        showEffects: true,
        showInput: true,
      }
    });

    return result;
  } catch (error) {
    console.error('Transaction execution failed:', error);
    throw error;
  }
}

// Helper to convert string to byte vector
export function stringToByteVector(input: string): number[] {
  return Array.from(Buffer.from(input, 'utf-8'));
}

// Function to get object details
export async function getObjectDetails(
  client: SuiClient, 
  objectId: string
) {
  try {
    return await client.getObject({
      id: objectId,
      options: {
        showContent: true,
        showType: true,
      }
    });
  } catch (error) {
    console.error('Failed to fetch object details:', error);
    throw error;
  }
}