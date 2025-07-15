import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HomeCategory, HomeData } from "../../types/homeCategoryType";
import { api } from "../../config/api";

// 🔄 Fetch Home Page Data
export const fetchHomePageData = createAsyncThunk<HomeData, void, { rejectValue: string }>(
    'home/fetchHomePageData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/home-page');
            console.log("home page", response.data);
            return response.data;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch home page data';
            console.log("error", errorMessage, error);
            return rejectWithValue(errorMessage);
        }
    }
);

// ➕ Create Home Categories
export const createHomeCategories = createAsyncThunk<HomeData, HomeCategory[], { rejectValue: string }>(
    'home/createHomeCategories',
    async (homeCategories, { rejectWithValue }) => {
        try {
            const response = await api.post('/home/categories', homeCategories);
            console.log("home categories", response.data);
            return response.data;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || 'Failed to create home categories';
            console.log("error", errorMessage, error);
            return rejectWithValue(errorMessage);
        }
    }
);

const initialState: {
    homeData: HomeData | null;
    loading: boolean;
    error: string | null;
} = {
    homeData: null,
    loading: false,
    error: null,
};

// 🧩 Slice
const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHomePageData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHomePageData.fulfilled, (state, action) => {
                state.loading = false;
                state.homeData = action.payload;
            })
            .addCase(fetchHomePageData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to fetch";
            })
            .addCase(createHomeCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createHomeCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.homeData = action.payload;
            })
            .addCase(createHomeCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to create categories";
            });
    },
});

// ✅ Export reducer
export default customerSlice.reducer;