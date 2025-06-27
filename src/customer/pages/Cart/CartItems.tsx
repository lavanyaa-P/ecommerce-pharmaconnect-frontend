import { Close, Remove } from "@mui/icons-material";
import { Button, Divider, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import React from "react";

const CartItems = () => {
    const handleUpdateQuantity = () => {
        // Add logic here
    };

    return (
        <div className="border rounded-md relative w-full md:w-[650px] p-5 space-y-3">
            <div className="grid grid-cols-[auto_1fr] gap-3">
                <img
                    className="w-[120px] rounded-md"
                    src="https://www.netmeds.com/images/product-v1/600x600/902225/sahyog_wellness_digital_thermometer_0_0.jpg"
                    alt="product"
                />
                <div className="space-y-2 break-words">
                    <h1 className="font-semibold text-lg">Omron</h1>
                    <p className="text-gray-600 font-medium text-sm">
                        Precise temperature readings for wellness
                    </p>
                    <p className="text-gray-400 text-xs">
                        <strong>Sold by:</strong> Natural Lifestyle products Private Limited
                    </p>
                    <p className="text-sm">7 days replacement available</p>
                </div>
            </div>

            <Divider />

            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Button onClick={handleUpdateQuantity} disabled>
                        <Remove />
                    </Button>
                    <span>1</span>
                    <Button onClick={handleUpdateQuantity}>
                        <AddIcon />
                    </Button>
                </div>
                <div className="pr-5">
                    <p className="text-gray-700 font-medium">₹273</p>
                </div>
            </div>
            <div className="absolute top-1 right-1">
                <IconButton color='primary'>
                    <Close/>
                </IconButton>
            </div>
        </div>
    );
};

export default CartItems;
