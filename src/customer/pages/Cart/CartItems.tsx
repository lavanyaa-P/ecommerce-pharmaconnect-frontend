import { Close, Remove } from "@mui/icons-material";
import { Button, Divider, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import React from "react";
import { CartItem } from "../../../types/cartType";
import { useAppDispatch } from "../../../State/Store";
import { updateCartItem, deleteCartItem } from "../../../State/customer/cartSlice";

const CartItems = ({ item }: { item: CartItem }) => {
    const dispatch = useAppDispatch();

    const handleUpdateQuantity = (value: number) => () => {
        if (item.quantity + value >= 1) {
            dispatch(updateCartItem({
                jwt: localStorage.getItem("jwt"),
                cartItemId: item.id,
                cartItem: { quantity: item.quantity + value }
            }));
        }
    };

    const handleDeleteItem = () => {
        dispatch(deleteCartItem({
            jwt: localStorage.getItem("jwt") || "",
            cartItemId: item.id
        }));
    };

    return (
        <div className="border rounded-md relative w-full md:w-[650px] p-5 space-y-3">
            <div className="grid grid-cols-[auto_1fr] gap-3">
                <img
                    className="w-[120px] rounded-md"
                    src={item.product.images[0]}
                    alt="product"
                />

                <div className="space-y-2 break-words">
                    <h1 className="font-semibold text-lg">{item.product.seller?.businessDetails.businessName}</h1>
                    <p className="text-gray-600 font-medium text-sm">{item.product.title}</p>
                    <p className="text-gray-400 text-xs">
                        <strong>Sold by:</strong> Natural Lifestyle products Private Limited
                    </p>
                    <p className="text-sm">7 days replacement available</p>
                    <p className="text-sm text-gray-500"><strong>Quantity:</strong> {item.quantity}</p>
                </div>
            </div>

            <Divider />

            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Button onClick={handleUpdateQuantity(-1)} disabled={item.quantity <= 1}>
                        <Remove />
                    </Button>
                    <span>{item.quantity}</span>
                    <Button onClick={handleUpdateQuantity(1)}>
                        <AddIcon />
                    </Button>
                </div>
                <div className="pr-5">
                    <p className="text-gray-700 font-medium">₹{item.sellingPrice}</p>
                </div>
            </div>

            <div className="absolute top-1 right-1">
                <IconButton color='primary' onClick={handleDeleteItem}>
                    <Close />
                </IconButton>
            </div>
        </div>
    );
};

export default CartItems;
