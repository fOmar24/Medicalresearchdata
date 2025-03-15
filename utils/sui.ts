import { Transaction } from '@mysten/sui/transactions';
import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';

// Define the SuiWallet type
export type SuiWallet = {
  signTransactionBlock: (args: { transactionBlock: Uint8Array }) => Promise<{
    signature: string;
    transactionBlockBytes: Uint8Array;
  }>;
};

// Create a Sui client for a specific network
export const createSuiClient = (network: 'testnet' | 'mainnet' = 'testnet'): SuiClient => {
  return new SuiClient({
    url: getFullnodeUrl(network),
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
  wallet: SuiWallet, // Now using the SuiWallet type
  signer: string // Assuming this is the signer's address
) {
  try {
    // Build the transaction
    const transactionBytes = await txb.build({ client });

    // Sign the transaction
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
      },
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
export async function getObjectDetails(client: SuiClient, objectId: string) {
  try {
    return await client.getObject({
      id: objectId,
      options: {
        showContent: true,
        showType: true,
      },
    });
  } catch (error) {
    console.error('Failed to fetch object details:', error);
    throw error;
  }
}

// Function to get user role based on owned objects
export async function getUserRole(client: SuiClient, walletAddress: string): Promise<string> {
  try {
    // Fetch objects owned by the wallet address
    const objectsResponse = await client.getOwnedObjects({
      owner: walletAddress
    });
    
    // The response structure may vary; adjust the logic accordingly.
    // Here we assume the response has a `data` property that is an array of objects.
    const objects = objectsResponse.data || [];
    
    // Example logic: if any object type includes "HealthRecord", we assign "patient" role.
    const isPatient = objects.some(obj => 
      obj.data && typeof obj.data.type === 'string' && obj.data.type.includes("HealthRecord")
    );
    
    return isPatient ? "patient" : "guest";
  } catch (error) {
    console.error('Failed to determine user role:', error);
    return "guest";
  }
}
