import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../../config/api";
import { Order, OrderItem, OrderState } from "../../types/orderType";
import { Address } from "../../types/userTypes";

const initialState: OrderState = {
    orders: [],
    orderItem: null,
    currentOrder: null,
    paymentOrder: null,
    loading: false,
    error: null,
    orderCanceled: false
};

const API_URL = "/api/orders";

// Fetch user order history
export const fetchUserOrderHistory = createAsyncThunk<Order[], string>(
    "orders/fetchUserOrderHistory",
    async (jwt, { rejectWithValue }) => {
        try {
            const response = await api.get(`${API_URL}/user`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("order history fetched", response.data);
            return response.data;
        } catch (error: any) {
            console.log("error", error.response);
            return rejectWithValue(
                error.response?.data?.error || "Failed to fetch order history"
            );
        }
    }
);

// Fetch order by ID
export const fetchOrderById = createAsyncThunk<
    Order,
    { orderId: number; jwt: string }
>(
    "orders/fetchOrderById",
    async ({ orderId, jwt }, { rejectWithValue }) => {
        try {
            const response = await api.get(`${API_URL}/${orderId}`, {
                headers: { Authorization: `Bearer ${jwt}` },
            });
            console.log("order fetched", response.data);
            return response.data;
        } catch (error: any) {
            console.log("error", error.response);
            return rejectWithValue("Failed to fetch order");
        }
    }
);

// Create a new order
export const createOrder = createAsyncThunk<
    any,
    { address: Address; jwt: string; paymentGateway: string }
>(
    "orders/createOrder",
    async ({ address, jwt, paymentGateway }, { rejectWithValue }) => {
        try {
            const response = await api.post(API_URL, address, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
                params: { paymentMethod: paymentGateway },
            });
            console.log("order created", response.data);
            if (response.data.payment_link_url) {
                window.location.href = response.data.payment_link_url;
            }
            return response.data;
        } catch (error: any) {
            console.log("error", error.response);
            return rejectWithValue("Failed to create order");
        }
    }
);

// Fetch Order Item by ID
export const fetchOrderItemById = createAsyncThunk<
    OrderItem,
    { orderItemId: number; jwt: string }
>(
    "orders/fetchOrderItemById",
    async ({ orderItemId, jwt }, { rejectWithValue }) => {
        try {
            const response = await api.get(`${API_URL}/item/${orderItemId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("order item fetched", response.data);
            return response.data;
        } catch (error: any) {
            console.log("error", error.response);
            return rejectWithValue("Failed to fetch order item");
        }
    }
);

// Cancel Order
export const cancelOrder = createAsyncThunk<Order, number>(
    "orders/cancelOrder",
    async (orderId, { rejectWithValue }) => {
        try {
            const response = await api.put(`${API_URL}/${orderId}/cancel`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
            });
            console.log("cancel order", response.data);
            return response.data;
        } catch (error: any) {
            console.log("error", error.response);
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue("An error occurred while cancelling the order.");
        }
    }
);

// Order slice
const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // Fetch user order history
            .addCase(fetchUserOrderHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.orderCanceled = false;
            })
            .addCase(fetchUserOrderHistory.fulfilled, (state, action: PayloadAction<Order[]>) => {
                state.orders = action.payload;
                state.loading = false;
            })

            .addCase(fetchUserOrderHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Fetch order by ID
            .addCase(fetchOrderById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrderById.fulfilled, (state, action: PayloadAction<Order>) => {
                state.currentOrder = action.payload;
                state.loading = false;
            })
            .addCase(fetchOrderById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Create order
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, action: PayloadAction<any>) => {
                state.paymentOrder = action.payload;
                state.loading = false;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Fetch order item by ID
            .addCase(fetchOrderItemById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrderItemById.fulfilled, (state, action: PayloadAction<OrderItem>) => {
                state.orderItem = action.payload;
                state.loading = false;
            })
            .addCase(fetchOrderItemById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Cancel Order
            .addCase(cancelOrder.fulfilled, (state, action: PayloadAction<Order>) => {
                state.currentOrder = action.payload;
                state.orderCanceled = true;
                state.loading = false;
            })
            .addCase(cancelOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export default orderSlice.reducer;



