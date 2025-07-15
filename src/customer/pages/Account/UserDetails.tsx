import React from 'react';
import ProfileFieldCard from '../../../component/ProfileFieldCard';
import { Divider } from '@mui/material';
import { useAppSelector } from '../../../State/Store';

const UserDetails = () => {
    const { auth } = useAppSelector(store => store);

    return (
        <div className="flex justify-center py-10 px-4">
            <div className="w-full lg:w-[70%] bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between pb-5 border-b">
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Personal Details
                    </h1>
                </div>

                <div className="divide-y divide-gray-200 mt-5 space-y-5">
                    <ProfileFieldCard keys="Name" value={auth.user?.fullName || "Not provided"} />
                    <ProfileFieldCard keys="Email" value={auth.user?.email || "Not provided"} />
                    <ProfileFieldCard keys="Mobile" value={auth.user?.mobile || "Not provided"} />
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
