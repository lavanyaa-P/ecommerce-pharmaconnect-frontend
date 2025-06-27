import React, { useState } from 'react';
import CartItems from './CartItems';
import { Close, LocalOffer } from '@mui/icons-material';
import { Button, IconButton, TextField } from '@mui/material';
import PricingCart from './PricingCart';
import { Navigate, useNavigate } from 'react-router-dom';

const Cart = () => {
    const [couponCode, setCouponCode] = useState("");

    const navigate = useNavigate();

    const handleChange = (e:any) => {
        setCouponCode(e.target.value);
    };

    return (
        <div className="pt-10 px-5 sm:px-10 md:px-60 min-h-screen">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="cartItemSection lg:col-span-2 space-y-3">
                    {[1, 1, 1, 1].map((_, index) =>
                        (
                        <CartItems key={index} />
                    ))}
                </div>

                <div className="col-span-1 text-sm space-y-3">
                    <div className="border rounded-md px-5 py-5 space-y-5">
                        <div className="flex gap-3 text-sm items-center">
                            <LocalOffer sx={{ color: "#003399", fontSize: "17px" }} />
                            <span>Apply Coupons</span>
                        </div>

                        {true ? (
                            <div className="flex justify-between items-center gap-2">
                                <TextField
                                    onChange={handleChange}
                                    value={couponCode}
                                    id="outlined-basic"
                                    placeholder="coupon code"
                                    size="small"
                                    variant="outlined"
                                />
                                <Button size="small">
                                    Apply
                                </Button>
                            </div>
                        ) : (
                            <div className="flex">
                                <div className="p-1 pl-5 pr-3 border rounded-md flex gap-3 items-center">
                                    <span>Applied</span>
                                    <IconButton size="small">
                                        <Close className="text-red-600" />
                                    </IconButton>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className='border rounded-md'>
                        <PricingCart/>
                        <div className='p-5'>
                            <Button onClick={()=> navigate("/checkout")} 
                            fullWidth variant='contained' sx={{py:"11px"}}>
                                Buy Now
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
