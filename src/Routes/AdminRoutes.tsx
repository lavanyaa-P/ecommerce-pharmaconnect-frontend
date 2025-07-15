import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SellersTable from '../admin/Pages/HomePage/SellersTable';
import Coupon from '../admin/Pages/Coupon/Coupon';
import AddCoupon from '../admin/Pages/Coupon/AddCoupon';
import GridTable from '../admin/Pages/HomePage/GridTable';
import ShopByCategoryTable from '../admin/Pages/HomePage/ShopByCategoryTable';
import Deal from '../admin/Pages/HomePage/Deal';

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/" />
            <Route path="/coupon" element={<Coupon />} />
            <Route path="/add-coupon" element={<AddCoupon />} />
            <Route path="/home-grid" element={<GridTable />} />
            <Route path="/shop-by-category" element={<ShopByCategoryTable />} />
            <Route path="/deals" element={<Deal />} />
        </Routes>
    );
};

export default AdminRoutes;
