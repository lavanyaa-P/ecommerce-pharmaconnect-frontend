import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Order, OrderStatus } from '../../types/orderType';
import { api } from '../../config/api';

interface SellerOrderState {
    orders: Order[];
    loading: boolean;
    error: string | null;
}

// Initial state
const initialState: SellerOrderState = {
    orders: [],
    loading: false,
    error: null,
};

// Fetch Seller Orders
export const fetchSellerOrders = createAsyncThunk<Order[], string>(
    'sellerOrders/fetchSellerOrders',
    async (jwt, { rejectWithValue }) => {
        try {
            const response = await api.get('/api/seller/orders', {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log('fetch seller orders', response.data);
            return response.data;
        } catch (error: any) {
            console.log('fetch error', error.response);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Update Order Status
export const updateOrderStatus = createAsyncThunk<
    Order,
    { jwt: string; orderId: number; orderStatus: OrderStatus }
>('sellerOrders/updateOrderStatus', async ({ jwt, orderId, orderStatus }, { rejectWithValue }) => {
    try {
        const response = await api.patch(
            `/api/seller/orders/${orderId}/status`,
            { orderStatus },
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
        );
        console.log('order status updated', response.data);
        return response.data;
    } catch (error: any) {
        console.log('update error', error.response);
        return rejectWithValue(error.response?.data || error.message);
    }
});

// Delete Order
export const deleteOrder = createAsyncThunk<
    any,
    { jwt: string; orderId: number }
>('sellerOrders/deleteOrder', async ({ jwt, orderId }, { rejectWithValue }) => {
    try {
        const response = await api.delete(`/api/seller/orders/${orderId}/delete`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        return response.data;
    } catch (error: any) {
        console.log('delete error', error.response);
        return rejectWithValue(error.response?.data || error.message);
    }
});

// Slice
const sellerOrderSlice = createSlice({
    name: 'sellerOrders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Orders
            .addCase(fetchSellerOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSellerOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchSellerOrders.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    typeof action.payload === 'string'
                        ? action.payload
                        : (action.payload as any)?.message || 'Failed to fetch orders';
            })

            // Update Status
            .addCase(updateOrderStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateOrderStatus.fulfilled, (state, action: PayloadAction<Order>) => {
                state.loading = false;
                const updatedOrder = action.payload;
                const index = state.orders.findIndex((o) => o.id === updatedOrder.id);
                if (index !== -1) {
                    state.orders[index] = updatedOrder;
                }
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    typeof action.payload === 'string'
                        ? action.payload
                        : (action.payload as any)?.message || 'Failed to update order status';
            })

            // Delete Order
            .addCase(deleteOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.loading = false;
                const { orderId } = action.meta.arg;
                state.orders = state.orders.filter((order) => order.id !== orderId);
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    typeof action.payload === 'string'
                        ? action.payload
                        : (action.payload as any)?.message || 'Failed to delete order';
            });
    },
});

export default sellerOrderSlice.reducer;
