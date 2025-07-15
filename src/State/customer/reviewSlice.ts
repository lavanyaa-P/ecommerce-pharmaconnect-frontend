import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Review } from '../../types/reviewType';

interface ReviewState {
    reviews: Review[];
    loading: boolean;
    error: string | null;
}

const initialState: ReviewState = {
    reviews: [],
    loading: false,
    error: null,
};

export const addReviewThunk = createAsyncThunk<
    Review,
    { productId: number; comment: string; rating: number },
    { rejectValue: string }
>(
    'review/addReview',
    async ({ productId, comment, rating }, thunkAPI) => {
        try {
            const token = localStorage.getItem('jwt') || '';
            const { data } = await axios.post(
                `http://localhost:5454/api/reviews`,
                null,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // ✅ FIXED
                    },
                    params: {
                        productId,
                        comment,
                        rating,
                    },
                }
            );
            return data;
        } catch (error: any) {
            console.error("Review submit error:", error.response?.data || error.message); // ✅ log error
            return thunkAPI.rejectWithValue('Failed to add review');
        }
    }
);


// ✅ Fetch reviews by product ID
export const fetchProductReviews = createAsyncThunk<Review[], number, { rejectValue: string }>(
    'review/fetchProductReviews',
    async (productId, thunkAPI) => {
        try {
            const { data } = await axios.get(`http://localhost:5454/api/reviews/product/${productId}`);
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue('Failed to fetch reviews');
        }
    }
);

const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductReviews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductReviews.fulfilled, (state, action: PayloadAction<Review[]>) => {
                state.loading = false;
                state.reviews = action.payload;
            })
            .addCase(fetchProductReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
            })
            .addCase(addReviewThunk.fulfilled, (state, action: PayloadAction<Review>) => {
                state.reviews.push(action.payload);
            });
    },
});

export default reviewSlice.reducer;
