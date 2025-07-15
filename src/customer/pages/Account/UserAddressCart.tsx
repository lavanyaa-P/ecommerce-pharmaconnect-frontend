import React from 'react';

const UserAddressCart = ({ data }: { data: any }) => {
    return (
        <div className='p-5 border rounded-md flex'>
            <div className='space-y-3'>
                <h1>{data.fullName}</h1>
                <p>{data.addressLine}, {data.city}, {data.state} - {data.pincode}</p>
                <p><strong>Mobile</strong>: {data.mobile}</p>
            </div>
        </div>
    );
};

export default UserAddressCart;
