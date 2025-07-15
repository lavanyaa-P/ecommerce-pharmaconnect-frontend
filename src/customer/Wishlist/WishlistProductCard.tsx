import React from "react";
import { Product } from "../../types/ProductTypes";
import { Close } from "@mui/icons-material";
import { Button } from "@mui/material";
import { teal } from "@mui/material/colors";
import { addProductToWishlist, getWishlistByUserId } from "../../State/customer/wishlistSlice";
import { useAppDispatch } from "../../State/Store";

const WishlistProductCart = ({ item }: { item: Product }) => {
    const dispatch = useAppDispatch();

    const handleToggleWishlist = () => {
        dispatch(addProductToWishlist({ productId: item.id }))
            .then(() => dispatch(getWishlistByUserId())); // refresh wishlist after toggle
    };

    return (
        <div className="w-60 relative">
            <div className="w-full">
                <img src={item.images[0]} className="object-top w-full" alt={item.title} />
            </div>

            <div className="pt-3 space-y-1">
                <p>{item.title}</p>
                <div>
                    <span className="text-lg font-semibold text-gray-800">₹{item.sellingPrice}</span>
                    <span className="line-through text-gray-500 ml-2">₹{item.mrpPrice}</span>
                    <span className="text-green-600 font-bold ml-2">{item.discountPercent}% Off</span>
                </div>
            </div>

            <div className="absolute top-1 right-1">
                <Button onClick={handleToggleWishlist}>
                    <Close
                        className="cursor-pointer bg-white rounded-full p-1"
                        sx={{ color: teal[500], fontSize: "2rem" }}
                    />
                </Button>
            </div>
        </div>
    );
};

export default WishlistProductCart;
