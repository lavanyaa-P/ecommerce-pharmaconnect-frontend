import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import Navbar from './customer/components/Navbar/Navbar';
import customeTheme from './theme/customeTheme';

import Home from './customer/pages/Home/Home';
import Product from './customer/pages/Product/Product';
import ProductDetails from './customer/pages/PageDetails/ProductDetails';
import Review from './customer/pages/Review/Review';
import Cart from './customer/pages/Cart/Cart';
import Checkout from './customer/pages/Checkout/Checkout';
import Account from './customer/pages/Account/Account';
import BecomeSeller from './customer/pages/Become seller/BecomeSeller';
import SellerDashboard from './seller/pages/SellerDashboard/SellerDashboard';
import AdminDashboard from './admin/Pages/Dashboard/AdminDashboard';

import { fetchSellerProfile } from './State/seller/sellerSlice';
import { useAppDispatch, useAppSelector } from './State/Store';

// ✅ Component that uses useNavigate (must be inside <BrowserRouter>)
const AppContent = () => {
  const dispatch = useAppDispatch();
  const { seller } = useAppSelector((store) => store);
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt") || "";
    if (jwt) {
      dispatch(fetchSellerProfile(jwt));
    }
  }, []);

  useEffect(() => {
    if (seller.profile) {
      navigate("/seller");
    }
  }, [seller.profile]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products/:category' element={<Product />} />
        <Route path='/reviews/:productId' element={<Review />} />
        <Route path='/product-details/:categoryId/:name/:productId' element={<ProductDetails />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/account' element={<Account />} />
        <Route path='/become-seller' element={<BecomeSeller />} />
        <Route path='/seller/*' element={<SellerDashboard />} />
        <Route path='/admin/*' element={<AdminDashboard />} />
      </Routes>
    </>
  );
};

// ✅ Main App component
const App = () => {
  return (
    <ThemeProvider theme={customeTheme}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
