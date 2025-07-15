import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";
import { Address } from "../../types/addressType";

interface AddressState {
    addresses: Address[];
    loading: boolean;
    error: string | null;
}

const initialState: AddressState = {
    addresses: [],
    loading: false,
    error: null,
};

// ✅ GET all addresses
export const fetchUserAddresses = createAsyncThunk<Address[], string>(
    "address/fetchUserAddresses",
    async (jwt, { rejectWithValue }) => {
        try {
            const res = await api.get("/api/address", {
                headers: { Authorization: `Bearer ${jwt}` },
            });
            return res.data;
        } catch (err: any) {
            return rejectWithValue("Failed to fetch addresses");
        }
    }
);

// ✅ ADD new address
export const addNewAddress = createAsyncThunk<
    Address,
    { jwt: string; address: Address }
>("address/addNewAddress", async ({ jwt, address }, { rejectWithValue }) => {
    try {
        const res = await api.post("/api/address", address, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        return res.data;
    } catch (err: any) {
        return rejectWithValue("Failed to add address");
    }
});

const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserAddresses.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserAddresses.fulfilled, (state, action) => {
                state.addresses = action.payload;
                state.loading = false;
            })
            .addCase(fetchUserAddresses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(addNewAddress.fulfilled, (state, action) => {
                state.addresses.push(action.payload);
            });
    },
});

export default addressSlice.reducer;
