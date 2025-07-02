import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";

// Async thunk for seller login
export const sellerLogin = createAsyncThunk<any, any>(
  "/auth/signin",
  async (loginRequest, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/signing", loginRequest);
      console.log("login otp ", response.data);
      const jwt=response.data.jwt;
      localStorage.setItem("jwt", jwt);
      return response.data;
    } catch (error: any) {
      console.log("error------", error);
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

// Define seller auth state
interface SellerState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: SellerState = {
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Create slice
const sellerAuthSlice = createSlice({
  name: "seller",
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
      })
      .addCase(sellerLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// ✅ Export the reducer as default
export default sellerAuthSlice.reducer;
