import React from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import Orders from './Orders';
import OrderDetails from './OrderDetails';
import UserDetails from './UserDetails';
import Address from './Address';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { logout } from '../../../State/AuthSlice';

const menu = [
    { name: "Orders", path: "/account/orders" },
    { name: "Profile", path: "/account" },
    { name: "Addresses", path: "/account/addresses" },
    { name: "Logout", path: "/" }
];

const Account = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();

    const handleClick = (item: any) => {
        if (item.path === "/") {
            dispatch(logout(navigate));
        } else {
            navigate(item.path);
        }
    };
    const {auth}=useAppSelector(store=>store);
    return (
        <div className='px-5 lg:px-52 min-h-screen mt-10'>
            <div className='mb-5'>
                <h1 className='text-xl font-bold'>{auth.user?.fullName}</h1>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
                {/* Sidebar */}
                <aside className='space-y-2'>
                    {menu.map((item) => {
                        const isActive = item.path === location.pathname;
                        return (
                            <div
                                key={item.name}
                                onClick={() => handleClick(item)}
                                className={`px-5 py-3 rounded-md cursor-pointer border transition-all 
                                    ${isActive ? "bg-primary-color text-white font-medium" : "hover:bg-primary-color/90 hover:text-white"}
                                `}
                            >
                                {item.name}
                            </div>
                        );
                    })}
                </aside>

                {/* Right Content */}
                <main className='lg:col-span-2 bg-white shadow-sm rounded-md p-5'>
                    <Routes>
                        <Route index element={<UserDetails />} />
                        <Route path='orders' element={<Orders />} />
                        <Route path='orders/:orderId/:orderItemId' element={<OrderDetails />} />
                        <Route path='addresses' element={<Address />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default Account;
