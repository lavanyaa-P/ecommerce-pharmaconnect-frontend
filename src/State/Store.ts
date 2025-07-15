import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";


import sellerAuthReducer from "./seller/sellerAuthSlice";
import sellerSlice from "./seller/sellerSlice"
import sellerProductSlice from "./seller/sellerProductSlice";
import productSlice from "./customer/ProductSlice";
import authSlice from "./AuthSlice";
import cartSlice from "./customer/cartSlice";
import orderSlice from "./customer/orderSlice";
import wishlistSlice from "./customer/wishlistSlice";
import sellerOrderSlice from "./seller/sellerOrderSlice";
import adminSlice from "./admin/adminSlice"
import customerSlice from "./customer/customerSlice"
import dealSlice from "./admin/DealSlice";
import addressSlice from "./customer/addressSlice"
import reviewSlice from "./customer/reviewSlice"
import sellerOrderReducer from "../../src/State/seller/sellerOrderSlice"


const rootReducer = combineReducers({
    sellerAuth: sellerAuthReducer,
    seller: sellerSlice,
    sellerProduct:sellerProductSlice,
    product:productSlice,
    auth:authSlice,
    cart:cartSlice,
    order:orderSlice,
    wishlist:wishlistSlice,
    customer:customerSlice,
    sellerOrder:sellerOrderSlice,
    admin:adminSlice,
    deal:dealSlice,
    address: addressSlice,
    sellerorder: sellerOrderReducer,
    review: reviewSlice,
});

const store = configureStore({
    reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
