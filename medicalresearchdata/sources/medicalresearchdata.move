/*
/// Module: medicalresearchdata
module medicalresearchdata::medicalresearchdata;
*/

// For Move coding conventions, see
// https://docs.sui.io/concepts/sui-move-concepts/conventions

#[allow(duplicate_alias)]
module medicalresearchdata::medical_data {
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use std::vector;

    /// Structure representing medical data
    public struct MedicalData has key, store {
        id: UID,
        owner: address,
        data_hash: vector<u8>,
        access_list: vector<address>
    }

    /// Creates a new medical data entry
    public entry fun create_medical_data(
        data_hash: vector<u8>, 
        ctx: &mut TxContext
    ) {
        // Create the medical data object
        let medical_data = MedicalData {
            id: object::new(ctx),
            owner: tx_context::sender(ctx),
            data_hash,
            access_list: vector::empty()
        };

        // Explicitly transfer the object to the sender
        transfer::public_transfer(medical_data, tx_context::sender(ctx));
    }

    /// Grants access to a user
    public fun grant_access(
        data: &mut MedicalData, 
        user: address,
        ctx: &TxContext
    ) {
        assert!(tx_context::sender(ctx) == data.owner, 0);
        vector::push_back(&mut data.access_list, user);
    }

    /// Revokes access from a user
    public fun revoke_access(
        data: &mut MedicalData, 
        user: address,
        ctx: &TxContext
    ) {
        assert!(tx_context::sender(ctx) == data.owner, 0);
        
        let mut new_list = vector::empty<address>();
        let len = vector::length(&data.access_list);
        
        let mut i = 0;
        while (i < len) {
            let current_addr = *vector::borrow(&data.access_list, i);
            if (current_addr != user) {
                vector::push_back(&mut new_list, current_addr);
            };
            i = i + 1;
        };

        data.access_list = new_list;
    }

    /// Checks if a user has access
    public fun has_access(data: &MedicalData, user: address): bool {
        vector::contains(&data.access_list, &user)
    }
}
