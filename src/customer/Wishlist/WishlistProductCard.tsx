import React from "react";
import { Product } from "../../types/ProductTypes";
import { Close } from "@mui/icons-material";
import { Button } from "@mui/material";

const WishlistProductCart = ({ item }: { item: Product }) => {
    return (
        <div className="w-60 relative">
            <div className="w-full">
                <img src={item.images[0]} className='object-top w-full' />
            </div>

            <div className="pt-3 space-y-1">
                <p>{item.title}</p>
                <div>
                    <span className="text-lg font-semibold text-gray-800">₹{item.sellingPrice}</span>
                    <span className="line-through text-gray-500">₹{item.mrpPrice}</span>
                    <span className="text-green-600 font-bold">{item.discountPercent}%Off</span>
                </div>
            </div>
            <div className="absolute top-1 right-1">
                <Button onClick={handleWishlist}>
                    <Close />
                </Button>
            </div>
        </div>
    )
}

export default WishlistProductCart