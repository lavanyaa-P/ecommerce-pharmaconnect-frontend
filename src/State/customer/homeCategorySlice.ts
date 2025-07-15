import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HomeCategory } from "../../types/homeCategoryType";
import { api } from "../../config/api";


const API_URL = "/admin";

// 🔄 Update a HomeCategory
export const updateHomeCategory = createAsyncThunk<
    HomeCategory,
    { id: number; data: HomeCategory },
    { rejectValue: string }
>(
    'homeCategory/updateHomeCategory',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await api.patch(`${API_URL}/home-category/${id}`, data);
            console.log("Category updated", response);
            return response.data;
        } catch (error: any) {
            console.log("Error", error);
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data.message || 'Update failed');
            } else {
                return rejectWithValue('An error occurred while updating the category.');
            }
        }
    }
);

// 🔄 Fetch All HomeCategories
export const fetchHomeCategories = createAsyncThunk<
    HomeCategory[],
    void,
    { rejectValue: string }
>(
    'homeCategory/fetchHomeCategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`${API_URL}/home-category`);
            console.log("Fetched categories", response.data);
            return response.data;
        } catch (error: any) {
            console.log("Error", error.response);
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch categories');
        }
    }
);

// 🔠 State Interface
interface HomeCategoryState {
    categories: HomeCategory[];
    loading: boolean;
    error: string | null;
    categoryUpdated: boolean;
}

// 🌱 Initial State
const initialState: HomeCategoryState = {
    categories: [],
    loading: false,
    error: null,
    categoryUpdated: false,
};

// 🧩 Slice
const homeCategorySlice = createSlice({
    name: 'homeCategory',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // --- updateHomeCategory ---
        builder.addCase(updateHomeCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.categoryUpdated = false;
        });

        builder.addCase(updateHomeCategory.fulfilled, (state, action: PayloadAction<HomeCategory>) => {
            state.loading = false;
            state.categoryUpdated = true;

            const index = state.categories.findIndex((category) => category.id === action.payload.id);
            if (index !== -1) {
                state.categories[index] = action.payload;
            } else {
                state.categories.push(action.payload);
            }
        });

        builder.addCase(updateHomeCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Failed to update category";
        });

        // --- fetchHomeCategories ---
        builder.addCase(fetchHomeCategories.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.categoryUpdated = false;
        });

        builder.addCase(fetchHomeCategories.fulfilled, (state, action: PayloadAction<HomeCategory[]>) => {
            state.loading = false;
            state.categories = action.payload;
        });

        builder.addCase(fetchHomeCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Failed to fetch categories";
        });
    }
});

export default homeCategorySlice.reducer;