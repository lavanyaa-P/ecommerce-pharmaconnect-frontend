import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../config/api";

// Define the type for a Deal
interface Deal {
    id?: number;
    discount: number;
    category: {
        id: number;
        categoryId: string;
        image: string;
        name?: string;
    };
}

// Define the state
interface DealsState {
    deals: Deal[];
    loading: boolean;
    error: string | null;
    dealCreated: boolean;
    dealUpdated: boolean;
}

// Initial state
const initialState: DealsState = {
    deals: [],
    loading: false,
    error: null,
    dealCreated: false,
    dealUpdated: false,
};

// Thunk: Create a new deal
export const createDeal = createAsyncThunk(
    "deals/createDeal",
    async (deal: any, { rejectWithValue }) => {
        try {
            const response = await api.post("/admin/deals", deal, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
            });
            console.log("created deal", response.data);
            return response.data;
        } catch (error: any) {
            console.log("error", error.response);
            return rejectWithValue(
                error.response?.data?.message || "Failed to create deal"
            );
        }
    }
);

// Thunk: Get all deals
export const getAllDeals = createAsyncThunk(
    "deals/getAllDeals",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/admin/deals", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
            });
            console.log("get all deal", response.data);
            return response.data;
        } catch (error: any) {
            console.log("error", error.response);
            return rejectWithValue(
                error.response?.data?.message || "Failed to get deals"
            );
        }
    }
);

// Deal Slice
const dealSlice = createSlice({
    name: "deal",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Create Deal
            .addCase(createDeal.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.dealCreated = false;
            })
            .addCase(createDeal.fulfilled, (state, action: PayloadAction<Deal>) => {
                state.loading = false;
                state.deals.push(action.payload);
                state.dealCreated = true;
            })
            .addCase(createDeal.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.dealCreated = false;
            })
            // Get All Deals
            .addCase(getAllDeals.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllDeals.fulfilled, (state, action: PayloadAction<Deal[]>) => {
                state.loading = false;
                state.deals = action.payload;
            })
            .addCase(getAllDeals.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default dealSlice.reducer;
