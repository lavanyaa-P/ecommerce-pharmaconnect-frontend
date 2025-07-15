import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../config/api";
import { User, USER_ROLE } from "../types/userTypes";
import { toast } from "react-toastify";

export interface SendOtpPayload {
  email: string;
  role?: USER_ROLE;
}

export const sendLoginSignupOtp = createAsyncThunk(
  "auth/sendOtp",
  async (
    { email, role }: SendOtpPayload,
    { rejectWithValue }
  ) => {
    try {
      const payload: any = { email };
      if (role) payload.role = role;

      const response = await api.post("/auth/sent/login-signup-otp", payload);
      console.log("OTP sent response:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP ❌");
      return rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);

export const signin = createAsyncThunk<any, any>(
  "/auth/signin",
  async (loginRequest, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/signin", loginRequest);
      localStorage.setItem("jwt", response.data.jwt);
      toast.success("Login successful 🎉");
      return response.data.jwt;
    } catch (error: any) {
      console.log("error ----- ", error);
      toast.error("Login failed ❌");
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

export const signup = createAsyncThunk<any, any>(
  "/auth/signup",
  async (signupRequest, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/signup", signupRequest);
      console.log("signup otp", response.data);
      localStorage.setItem("jwt", response.data.jwt);
      toast.success("Signup successful 🎉");
      return response.data.jwt;
    } catch (error: any) {
      console.log("error ----- ", error);
      toast.error("Signup failed ❌");
      return rejectWithValue(error.response?.data || "Signup failed");
    }
  }
);

export const fetchUserProfile = createAsyncThunk<any, any>(
  "/auth/fetchUserProfile",
  async ({ jwt }, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/users/profile", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      return response.data;
    } catch (error: any) {
      console.log("error ----- ", error);
      toast.error("Failed to fetch profile ❌");
      return rejectWithValue(error.response?.data || "Fetching profile failed");
    }
  }
);

export const logout = createAsyncThunk<any, any>(
  "/auth/logout",
  async (navigate, { rejectWithValue }) => {
    try {
      localStorage.clear();
      toast.success("Logged out successfully");
      console.log("logout success");
      navigate("/");
    } catch (error) {
      console.log("error--- ", error);
      toast.error("Logout failed ❌");
      return rejectWithValue("Logout failed");
    }
  }
);

interface AuthState {
  jwt: string | null;
  otpSent: boolean;
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
}

const initialState: AuthState = {
  jwt: null,
  otpSent: false,
  isLoggedIn: false,
  user: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sendLoginSignupOtp.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(sendLoginSignupOtp.fulfilled, (state) => {
      state.loading = false;
      state.otpSent = true;
    });

    builder.addCase(sendLoginSignupOtp.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(signin.fulfilled, (state, action) => {
      state.jwt = action.payload;
      state.isLoggedIn = true;
    });

    builder.addCase(signup.fulfilled, (state, action) => {
      state.jwt = action.payload;
      state.isLoggedIn = true;
    });

    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.user = action.payload;
    });

    builder.addCase(logout.fulfilled, (state) => {
      state.jwt = null;
      state.isLoggedIn = false;
      state.user = null;
    });
  },
});

export default authSlice.reducer;