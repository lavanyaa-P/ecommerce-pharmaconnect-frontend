import { Radio } from '@mui/material';
import React from 'react';
import { Address } from '../../../types/addressType';

const AddressCart = ({ address }: { address: Address }) => {
    const handleChange = (event: any) => {
        console.log("Selected Address ID:", event.target.value);
    };

    return (
        <div className='p-5 border rounded-md flex'>
            <div>
                <Radio
                    checked={false} // You can manage selected ID in Checkout state later
                    onChange={handleChange}
                    value={address.id}
                    name="selected-address"
                />
            </div>
            <div className='space-y-3 pt-3'>
                <h1>{address.name}</h1>
                <p>{address.locality}, {address.city}, {address.state} - {address.pinCode}</p>
                <p><strong>Mobile</strong>: {address.mobile}</p>
            </div>
        </div>
    );
};

export default AddressCart;
