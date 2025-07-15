import React, { useEffect } from "react";
import OrderItem from "./OrderItemCard";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchUserOrderHistory } from "../../../State/customer/orderSlice";

const Orders = () => {
    const dispatch = useAppDispatch();
    const { orders, loading } = useAppSelector(store => store.order); // destructure safely

    useEffect(() => {
        dispatch(fetchUserOrderHistory(localStorage.getItem("jwt") || ""));
    }, [dispatch]);

    return (
        <div className="text-sm min-h-screen">
            <div className="pb-5">
                <h1 className="font-semibold">All orders</h1>
                <p>from anytime</p>
            </div>

            <div className="space-y-2">
                {loading && <p>Loading orders...</p>}

                {!loading && (!orders || orders.length === 0) && (
                    <p>No orders found.</p>
                )}

                {!loading && orders?.length > 0 && (
                    orders.map(order =>
                        order.orderItems?.map((item) => (
                            <OrderItem key={item.id} order={order} item={item} />
                        ))
                    )
                )}
            </div>
        </div>
    );
};

export default Orders;
