import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../config/api";

// ✅ Thunk for sending OTP
export const sendLoginSignupOtp = createAsyncThunk(
  "auth/sendOtp",
  async ({ email }: { email: string }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/sent/login-signup-otp", {
        email,
        role: "ROLE_SELLER", // 👈 Very important
      });
      console.log("OTP sent response:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Error sending OTP:", error);
      return rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);

// ✅ Auth slice state type
interface AuthState {
  otpSent: boolean;
  loading: boolean;
  error: string | null;
}

// ✅ Initial state
const initialState: AuthState = {
  otpSent: false,
  loading: false,
  error: null,
};

// ✅ Logout thunk
export const logout = createAsyncThunk<any,any>(
  "/auth/logout",
  async (navigate, { rejectWithValue }) => {
    try {
      localStorage.clear();
      console.log("logout success");
      navigate("/")
    } catch (error) {
      console.log("error--- ", error);
      return rejectWithValue("Logout failed");
    }
  }
);

// ✅ Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendLoginSignupOtp.pending, (state) => {
        state.loading = true;
        state.otpSent = false;
        state.error = null;
      })
      .addCase(sendLoginSignupOtp.fulfilled, (state) => {
        state.loading = false;
        state.otpSent = true;
      })
      .addCase(sendLoginSignupOtp.rejected, (state, action) => {
        state.loading = false;
        state.otpSent = false;
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.otpSent = false;
        state.loading = false;
        state.error = null;
      });
  },
});

export default authSlice.reducer;
