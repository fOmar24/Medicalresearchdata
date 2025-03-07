import React from 'react';
import { SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';
import { Toaster } from 'sonner';
import MedicalForm from '../components/MedicalForm';


const networks = {
  testnet: { url: getFullnodeUrl('testnet') },
  mainnet: { url: getFullnodeUrl('mainnet') }
};

interface SuiProvidersProps {
  children: React.ReactNode;
  network?: 'testnet' | 'mainnet';
}

export const SuiProviders: React.FC<SuiProvidersProps> = ({ 
  children, 
  network = 'testnet' 
}) => {
  return (
    <SuiClientProvider networks={networks} defaultNetwork={network}>
      <WalletProvider>
        {children}
        <MedicalForm packageId="0x9a37905ef941cd7f0270f0b363c7d202dd5d105102a590051895589f3959431c" moduleName="medicalresearchdata" />
        <Toaster richColors position="top-right" />
    
      </WalletProvider>
    </SuiClientProvider>
  );
};