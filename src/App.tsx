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
import Account from './customer/pages/Account/Account';
import BecomeSeller from './customer/pages/Become seller/BecomeSeller';
import SellerDashboard from './seller/pages/SellerDashboard/SellerDashboard';
import AdminDashboard from './admin/Pages/Dashboard/AdminDashboard';

import { fetchSellerProfile } from './State/seller/sellerSlice';
import { useAppDispatch, useAppSelector } from './State/Store';
import Auth from './customer/pages/Auth/Auth';
import { fetchUserProfile } from './State/AuthSlice';
import Wishlist from './customer/Wishlist/Wishlist';
import { createHomeCategories } from './State/customer/customerSlice';
import { categories } from './data/HomeCategories';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductCategoryPage from './customer/pages/Product/ProductCategoryPage';
import OrderConfirmation from './customer/pages/OrderConfirmation/OrderConfirmation';
import Checkout from './customer/pages/Checkout/Checkout';


const AppContent = () => {
  const dispatch = useAppDispatch();
  const { seller,auth } = useAppSelector((store) => store);
  const navigate = useNavigate();

 useEffect(() => {
  const jwt = localStorage.getItem("jwt") || "";
  if (jwt) {
    dispatch(fetchSellerProfile(jwt));
  }
  dispatch(createHomeCategories(categories));
}, []);


  useEffect(() => {
    if (seller.profile) {
      navigate("/seller");
    }
  }, [seller.profile]);

  useEffect(() => {
    const jwt = auth.jwt || localStorage.getItem("jwt");
    if (jwt) {
      dispatch(fetchUserProfile({ jwt }));
    }
  }, [auth.jwt]);
  

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/products' element={<Product />} />
        <Route path='/reviews/:productId' element={<Review />} />
        <Route path='/product-details/:categoryId/:name/:productId' element={<ProductDetails />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/account/*' element={<Account />} />
        <Route path='/become-seller' element={<BecomeSeller />} />
        <Route path='/seller/*' element={<SellerDashboard />} />
        <Route path='/admin/*' element={<AdminDashboard />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path="/products/:categorySlug" element={<ProductCategoryPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />

      </Routes>
<ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};


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
