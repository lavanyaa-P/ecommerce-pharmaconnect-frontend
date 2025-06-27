import { Divider } from "@mui/material";
import React from "react";

const PricingCart = () => {
    return (
        <>
            <div className="space-y-3 p-5">
                <div className='flex justify-between items-center'>
                    <span>Subtotal</span>
                    <span>₹273</span>
                </div>
                <div className='flex justify-between items-center'>
                    <span>Discount</span>
                    <span>₹117</span>
                </div>
                <div className='flex justify-between items-center'>
                    <span>Shipping</span>
                    <span>₹19</span>
                </div>
                <div className='flex justify-between items-center'>
                    <span>Plateform fee</span>
                    <span>Free</span>
                </div>
            </div>
            <Divider/>
            <div className='flex justify-between items-center p-5'>
                <span>Total</span>
                <span>₹292</span>
            </div>
        </>
    )
}

export default PricingCart