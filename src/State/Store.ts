import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

import authReducer from "./AuthSlice";
import sellerAuthReducer from "./seller/sellerAuthSlice";
import sellerSlice from "./seller/sellerSlice"
import sellerProductSlice from "./seller/sellerProductSlice";
import productSlice from "./customer/ProductSlice";


const rootReducer = combineReducers({
    auth: authReducer,
    sellerAuth: sellerAuthReducer,
    seller: sellerSlice,
    sellerProduct:sellerProductSlice,
    product:productSlice
});

const store = configureStore({
    reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
