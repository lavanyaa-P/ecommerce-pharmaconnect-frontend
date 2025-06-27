import React from 'react';
import { Box, Button, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import OrderStepper from './OrderStepper';
import { Payments } from '@mui/icons-material';

const OrderDetails = () => {
    const navigate = useNavigate();

    return (
        <Box className="space-y-5">
            <section className="flex flex-col gap-5 justify-center items-center">
                <img
                    className="w-[150px]"
                    src="https://www.netmeds.com/images/product-v1/600x600/929475/cetaphil_sun_spf_50_uvb_uva_very_high_protection_light_gel_50ml_149854_0_5.jpg"
                    alt=""
                />
                <div className="text-sm space-y-1 text-center">
                    <h1 className="font-bold">Virani pharma</h1>
                    <p>
                        CETAPHIL Sun SPF 50 UVB/UVA Very High Protection Light Gel is
                        dermatologically tested and recommended by skincare professionals
                        for daily sun protection.
                    </p>
                    <p>
                        <strong>FREE</strong>
                    </p>
                </div>
                <div>
                    <Button onClick={() => navigate(`/reviews/${5}/create`)}>
                        Write Review
                    </Button>
                </div>
            </section>
            <section>
                <OrderStepper orderStatus={"SHIPPED"} />
            </section>

            <div className="border p-5">
                <h1 className="font-bold pb-3">Delivery Address</h1>
                <div className="text-sm space-y-2">
                    <div className="flex gap-5 font-medium">
                        <p>{"Lavanya"}</p>
                        <Divider flexItem orientation="vertical" />
                        <p>{"9012345785"}</p>
                    </div>
                    <p>
                        Ambavadi choke, Bengaluru, Karnataka - 530068
                    </p>
                </div>
            </div>

            <div className='border space-y-4'>
                <div className='flex justify-between text-sm pt-5 px-5'>
                    <div className='space-y-1'>
                        <p className='font-bold'>Total Item Price</p>
                        <p>
                            You saved <span className="text-green-500 font-medium text-xs">100.00</span> on this item
                        </p>
                    </div>
                    <p className='font-medium'>(699.00)</p>
                </div>

                <div className='px-5'>
                    <div className='bg-teal-50 px-5 py-2 text-xs font-medium flex items-center gap-3'>
                        <p className="font-medium">(799.00)</p>
                    </div>
                </div>

                <div className='px-5'>
                    <div className='bg-teal-50 px-5 py-2 text-xs font-medium flex items-center gap-3'>
                        <Payments />
                        <p>Pay On Delivery</p>
                    </div>
                </div>

                <Divider />

                <div className="px-5 pb-5">
                    <p className='text-xs'>
                        <strong>Sold by: </strong> {"Virani Pharma"}
                    </p>
                </div>

                <div className="p-10">
                    <Button
                        disabled={false}
                        // onClick={handleCancelOrder}
                        color="error"
                        sx={{ py: "0.7rem" }}
                        variant="outlined"
                        fullWidth
                    >
                        {false ? "Order Canceled" : "Cancel Order"}
                    </Button>
                </div>
            </div>

        </Box>
    );
};

export default OrderDetails;
