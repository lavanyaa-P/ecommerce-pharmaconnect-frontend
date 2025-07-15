import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";
import { Seller } from "../../types/SellerTypes";


// Async thunk for seller login
export const sellerLogin = createAsyncThunk<Seller, any>(
  "/auth/signin",
  async (loginRequest, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/signin", loginRequest);
      const jwt = response.data.jwt;
      localStorage.setItem("jwt", jwt);
      return response.data; // Contains full Seller object
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

interface SellerState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  seller: Seller | null;
}

const initialState: SellerState = {
  isAuthenticated: false,
  loading: false,
  error: null,
  seller: null,
};

const sellerAuthSlice = createSlice({
  name: "sellerAuth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sellerLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sellerLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.seller = action.payload; // ✅ store seller info
      })
      .addCase(sellerLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default sellerAuthSlice.reducer;
