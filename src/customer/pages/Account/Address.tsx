import React from 'react';
import UserAddressCart from './UserAddressCart';
import { useAppSelector } from '../../../State/Store';

const Address = () => {
    const addressList = useAppSelector((store) => store.auth.user?.addresses || []);

    return (
        <div className='space-y-3'>
            {addressList.length > 0 ? (
                addressList.map((item, index) => (
                    <UserAddressCart key={index} data={item} />
                ))
            ) : (
                <p className='text-center text-gray-500'>No addresses found.</p>
            )}
        </div>
    );
};

export default Address;
