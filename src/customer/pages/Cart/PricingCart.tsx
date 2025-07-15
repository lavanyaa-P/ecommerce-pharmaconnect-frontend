import { Divider } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../State/Store";

const PricingCart = () => {
    const { cart } = useAppSelector(state => state.cart);

    const subtotal = cart?.totalSellingPrice || 0;

    // 🧠 Dynamic Discount Calculation
    const totalMrp = cart?.cartItems.reduce((sum, item) => {
        return sum + (item.product?.mrpPrice || 0) * item.quantity;
    }, 0) || 0;

    const discount = totalMrp - subtotal;
    const shipping = 19;
    const total = subtotal + shipping;

    return (
        <>
            <div className="space-y-3 p-5">
                <div className='flex justify-between items-center'>
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                </div>
                <div className='flex justify-between items-center'>
                    <span>Discount</span>
                    <span>₹{discount}</span>
                </div>
                <div className='flex justify-between items-center'>
                    <span>Shipping</span>
                    <span>₹{shipping}</span>
                </div>
                <div className='flex justify-between items-center'>
                    <span>Platform fee</span>
                    <span>Free</span>
                </div>
            </div>
            <Divider />
            <div className='flex justify-between items-center p-5'>
                <span>Total</span>
                <span>₹{total}</span>
            </div>
        </>
    );
};

export default PricingCart;
