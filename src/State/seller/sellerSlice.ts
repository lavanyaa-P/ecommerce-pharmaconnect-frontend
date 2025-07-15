import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";

export const fetchSellerProfile = createAsyncThunk(
  "/sellers/fetchSellerProfile",
  async (jwt: string, { rejectWithValue }) => {
    try {
      const response = await api.get("/sellers/profile", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("fetch seller profile", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error------", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ✅ NEW: Register seller thunk
export const registerSeller = createAsyncThunk(
  "/sellers/register",
  async (sellerData: any, { rejectWithValue }) => {
    try {
      const response = await api.post("/sellers", sellerData); // Update endpoint if needed
      console.log("Seller registered:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Seller registration failed:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Define initial state
interface SellerState {
  sellers: any[];
  selectedSeller: any;
  profile: any;
  report: any;
  loading: boolean;
  error: any;
}

const initialState: SellerState = {
  sellers: [],
  selectedSeller: null,
  profile: null,
  report: null,
  loading: false,
  error: null,
};

// Create slice
const sellerSlice = createSlice({
  name: "sellers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // ✅ Handle seller profile fetch
      .addCase(fetchSellerProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSellerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchSellerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Handle seller registration
      .addCase(registerSeller.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerSeller.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload; // You can update other parts of state if needed
      })
      .addCase(registerSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default sellerSlice.reducer;
