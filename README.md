# Blockchain-Based Medical Research Data Sharing

## Overview
Medical research data sharing is often restricted due to privacy concerns and the centralization of data by medical institutions. This project leverages **Sui Move** smart contracts to provide a decentralized, secure, and privacy-preserving method for sharing medical research data. The system integrates **Zero-Knowledge Proofs (ZKPs)** and **encryption** to protect sensitive information while allowing controlled access to researchers.

## Features
- **Decentralized Data Ownership**: Researchers can register medical data as an encrypted asset.
- **Privacy-Preserving Access**: Uses **Zero-Knowledge Proofs (ZKPs)** for access verification.
- **Access Control Mechanism**: Owners can grant and revoke access.
- **Immutable Audit Trail**: Tracks access and modifications on the blockchain.

## Smart Contract Implementation
The smart contract is written in **Sui Move** and includes:
- **MedicalData Struct**: Stores encrypted data and access control list.
- **Register Data Function**: Allows a researcher to register encrypted medical data.
- **Grant Access Function**: Enables owners to give access to other researchers.
- **Verify Access Function**: Uses ZKPs to validate user access.

### Example Code Snippet
```move
module MedicalDataSharing::MedicalDataPrivacy {
    use std::signer;
    use sui::object;
    use sui::tx_context;

    struct MedicalData has key, store {
        id: UID,
        owner: address,
        encrypted_data: vector<u8>,
        proof_of_access: vector<u8>,
        access_list: vector<address>,
    }
    
    public entry fun register_data(
        owner: &signer,
        encrypted_data: vector<u8>,
        proof_of_access: vector<u8>,
        ctx: &mut TxContext
    ): MedicalData {
        let medical_data = MedicalData {
            id: object::new(ctx),
            owner: signer::address_of(owner),
            encrypted_data,
            proof_of_access,
            access_list: vector::empty(),
        };
        medical_data
    }
}
```

## Installation & Setup
### Prerequisites
- Install [Sui Move CLI](https://docs.sui.io/build/install)
- Rust (for Sui development)
- Node.js (for frontend integration if needed)

### Steps to Deploy
1. **Clone the Repository**
   ```sh
   git clone https://github.com/your-repo/medical-data-sharing.git
   cd medical-data-sharing
   ```
2. **Compile the Move Smart Contract**
   ```sh
   sui move build
   ```
3. **Publish to Sui Network**
   ```sh
   sui client publish --gas-budget 100000000
   ```

## Zero-Knowledge Proof (ZKP) Integration
This project uses **ZK-SNARKs** to validate access control. Users generate a proof off-chain and submit it to the smart contract for verification.

### Example (Off-Chain Proof Generation)
```js
const snarkjs = require("snarkjs");
async function generateProof(input) {
    const { proof, publicSignals } = await snarkjs.groth16.fullProve(input, "circuit.wasm", "zkeyfile.zkey");
    console.log("Proof:", proof);
}
generateProof({ user: "0x123..." });
```

## Future Enhancements
- **Frontend UI** for access management and data visualization.
- **Integration with IPFS** for decentralized storage.
- **Multi-Signature Approval Mechanism** for sensitive data.

## License
This project is open-source under the **MIT License**.

