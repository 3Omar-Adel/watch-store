import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getProducts,
    getProductById,
    getFeaturedProducts,
    deleteProduct,
    createProduct,
    updateProduct,
} from "./productService";

const initialState = {
    products: [],
    featuredProducts: [],
    product: null,
    loading: false,
    error: null,
};

// Get All Products
export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (_, thunkAPI) => {
        try {
            return await getProducts();
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);
// 
export const fetchFeaturedProducts = createAsyncThunk(
    "products/fetchFeaturedProducts",
    async () => {
        return await getFeaturedProducts();
    }
);

// Get Product By Id
export const fetchProductById = createAsyncThunk(
    "products/fetchProductById",
    async (id, thunkAPI) => {
        try {
            return await getProductById(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);
// Delete Product 
export const deleteProductById = createAsyncThunk(
    "products/deleteProductById",
    async ({ id, token }, thunkAPI) => {
        try {
            await deleteProduct(id, token);
            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                error.message
            );
        }
    }
);
// Add Product
export const addProduct = createAsyncThunk(
    "products/addProduct",
    async ({ productData, token }, thunkAPI) => {
        try {
            return await createProduct(productData, token);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

// Update Product
export const updateProductById = createAsyncThunk(
    "products/updateProductById",
    async ({ id, productData, token }, thunkAPI) => {
        try {
            return await updateProduct(id, productData, token);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder

            // Fetch All Products
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })

            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch Product By Id
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.product = null;
            })

            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
            })

            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            .addCase(fetchFeaturedProducts.pending, (state) => {
                state.loading = true;
            })

            .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.featuredProducts = action.payload;
            })

            .addCase(fetchFeaturedProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // 
            .addCase(deleteProductById.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.products =
                state.products.filter(
                    (product) =>
                        product._id !== action.payload
                );
            })
            .addCase(deleteProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // ADD
            .addCase(addProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products.unshift(action.payload.product);
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update
            .addCase(updateProductById.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateProductById.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.products.findIndex(
                    p=>p._id===action.payload._id
                );

                if(index!==-1){
                    state.products[index]=action.payload;
                }
            })
            .addCase(updateProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default productSlice.reducer;