import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import addressService from "./addressService";

const initialState = {
    addresses: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ""
}

export const fetchAddresses =createAsyncThunk(
    "address/getAll",
    async (_, thunkAPI) => {
        try {
            return await addressService.getAddresses();
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const createAddress =createAsyncThunk(
    "address/create",
    async (addressData, thunkAPI) => {
        try {
            return await addressService.createAddress(
                addressData
            );
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updateAddress =createAsyncThunk(
    "address/update",
    async ({ id, addressData }, thunkAPI) => {
        try {
            return await addressService.updateAddress(
                id,
                addressData
            );
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deleteAddress = createAsyncThunk(
    "address/delete",
    async (id, thunkAPI) => {
        try {
            return await addressService.deleteAddress(id);
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const setDefaultAddress = createAsyncThunk(
    "address/default",
    async (id, thunkAPI) => {
        try {
            return await addressService.setDefaultAddress(id);
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const addressSlice = createSlice({
    name: "address",
    initialState,

    reducers:{
        reset:(state)=>{
            state.isLoading=false;
            state.isSuccess=false;
            state.isError=false;
            state.message="";
        }
    },

    extraReducers: (builder) => {
        builder
        // Fetch Addresses
        .addCase(fetchAddresses.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchAddresses.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.addresses = action.payload;
        })
        .addCase(fetchAddresses.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        // Create Address
        .addCase(createAddress.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createAddress.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.addresses.push(action.payload);
            state.message = "Address added successfully";
        })
        .addCase(createAddress.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        // Update Address
        .addCase(updateAddress.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateAddress.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.addresses = state.addresses.map((address) =>
                address._id === action.payload._id
                    ? action.payload
                    : address
            );
            state.message = "Address updated successfully";
        })
        .addCase(updateAddress.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
         // Delete Address
        .addCase(deleteAddress.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteAddress.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.addresses = action.payload;
            state.message = "Address deleted successfully";
        })
        .addCase(deleteAddress.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(setDefaultAddress.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(setDefaultAddress.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.addresses = state.addresses.map(address => ({
                ...address,
                isDefault:
                address._id === action.payload._id,
            }));
            state.message = "Default address updated";
        })
        .addCase(setDefaultAddress.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    },
});
export const { reset } = addressSlice.actions;
export default addressSlice.reducer;