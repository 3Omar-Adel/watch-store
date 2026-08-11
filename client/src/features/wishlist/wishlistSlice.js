import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import wishlistService from "./wishlistService";

const initialState = {
    wishlistItems: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
};

// Get Wishlist
export const fetchWishlist = createAsyncThunk(
    "wishlist/getAll",
    async (_, thunkAPI) => {
        try {
            return await wishlistService.getWishlist();
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message;

            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Add / Remove Wishlist
export const toggleWishlist = createAsyncThunk(
    "wishlist/toggle",
    async (productId, thunkAPI) => {
        try {
            return await wishlistService.toggleWishlist(productId);
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message;

            return thunkAPI.rejectWithValue(message);
        }
    }
);

const wishlistSlice = createSlice({
    name: "wishlist",

    initialState,

    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        },
    },

    extraReducers: (builder) => {
        builder

            // Fetch Wishlist
            .addCase(fetchWishlist.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.wishlistItems = action.payload;
            })

            .addCase(fetchWishlist.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            // Toggle Wishlist
            .addCase(toggleWishlist.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(toggleWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.wishlistItems = action.payload.products;
                state.message = action.payload.message;
            })

            .addCase(toggleWishlist.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
            });
    },
});

export const { reset } = wishlistSlice.actions;

export default wishlistSlice.reducer;