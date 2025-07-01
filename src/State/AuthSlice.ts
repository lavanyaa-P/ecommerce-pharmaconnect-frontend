import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of your auth state
interface AuthState {
  email: string;
  otpSent: boolean;
  isAuthenticated: boolean;
}

// Initial state
const initialState: AuthState = {
  email: "",
  otpSent: false,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    sendLoginSignupOtp: (state, action: PayloadAction<{ email: string }>) => {
      state.email = action.payload.email;
      state.otpSent = true;
    },
    signin: (state, action: PayloadAction<{ email: string; otp: string }>) => {
      // You can add real auth logic later
      state.isAuthenticated = true;
    },
  },
});

export const { sendLoginSignupOtp, signin } = authSlice.actions;
export default authSlice.reducer;
