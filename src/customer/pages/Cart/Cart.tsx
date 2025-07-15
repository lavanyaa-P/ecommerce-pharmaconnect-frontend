import React, { useEffect, useState } from 'react';
import CartItems from './CartItems';
import { Close, LocalOffer } from '@mui/icons-material';
import { Button, IconButton, TextField } from '@mui/material';
import PricingCart from './PricingCart';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { fetchUserCart } from '../../../State/customer/cartSlice';

const Cart = () => {
    const [couponCode, setCouponCode] = useState("");
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { cart } = useAppSelector(store => store);

    useEffect(() => {
        dispatch(fetchUserCart(localStorage.getItem("jwt") || ""));
    }, [dispatch]);

    const handleChange = (e: any) => {
        setCouponCode(e.target.value);
    };

    return (
        <div className="pt-10 px-5 sm:px-10 md:px-60 min-h-screen">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="cartItemSection lg:col-span-2 space-y-3">
                    {cart.cart?.cartItems.length === 0 ? (
                        <div className="text-center text-gray-500 py-10">
                            🛒 Your cart is empty
                        </div>
                    ) : (
                        cart.cart?.cartItems.map((item) => (
                            <CartItems key={item.id} item={item} />
                        ))
                    )}
                </div>

                {cart.cart?.cartItems && cart.cart.cartItems.length > 0 && (
                    <div className="col-span-1 text-sm space-y-3">
                        {/* Apply Coupon */}
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

                        {/* Pricing Section */}
                        <div className='border rounded-md'>
                            <PricingCart />
                            <div className='p-5'>
                                <Button
                                    onClick={() => navigate("/checkout")}
                                    fullWidth
                                    variant='contained'
                                    sx={{ py: "11px" }}
                                >
                                    Buy Now
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
