import ordersService from "./ordersService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    orders: [],
    order: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ""
}

export const fetchMyOrders = createAsyncThunk(
    "orders/getMyOrders",
    async (_, thunkAPI) => {
        try {
            return await ordersService.getMyOrders()
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const createOrder = createAsyncThunk (
    "order/createOrder",
    async(order, thunkAPI) => {
        try {
            return await ordersService.createOrder(order)
        } catch(error) {
            const message =
                error.response?.data?.message ||
                error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const fetchOrderById = createAsyncThunk (
    "order/getById",
    async(id, thunkAPI) => {
        try {
            return await ordersService.getOrderById(id)
        } catch(error) {
            const message = 
                error.response?.data?.message ||
                error.message
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const fetchAllOrders = createAsyncThunk(
    "order/getAll",
    async(_, thunkAPI) => {
        try {
            return await ordersService.getAllOrders()
        } catch(error) {
            const message = 
                error.response?.data?.message ||
                error.message
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const updateOrderStatus = createAsyncThunk(
    "order/updateStatus",
    async({id, orderStatus}, thunkAPI) => {
        try {
            return await ordersService.updateOrderStatus(
                id,
                orderStatus
            )
        } catch(error) {
            const message = 
                error.response?.data?.message ||
                error.message
            return thunkAPI.rejectWithValue(message)
        }
    }
)

const orderSlice = createSlice({
    name: "order",
    initialState,

    reducers:{
        reset:(state)=> {
            state.isLoading=false;
            state.isSuccess=false;
            state.isError=false;
            state.message="";
        }
    },
    extraReducers: (builder) => {
        builder
        // fetchMyOrders
        .addCase(fetchMyOrders.pending, (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        })
        .addCase(fetchMyOrders.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.orders = action.payload;
        })
        .addCase(fetchMyOrders.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
        })
        // createOrder
        .addCase(createOrder.pending, (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        })
        .addCase(createOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.orders.push(action.payload);
            state.message = "Order created successfully";
        })
        .addCase(createOrder.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
        })
        // fetchOrderById
        .addCase(fetchOrderById.pending, (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        })
        .addCase(fetchOrderById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.order = action.payload;
        })
        .addCase(fetchOrderById.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
        })
        // fetchAllOrders
        .addCase(fetchAllOrders.pending, (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        })
        .addCase(fetchAllOrders.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.orders = action.payload;
        })
        .addCase(fetchAllOrders.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
        })
        // updateOrderStatus
        .addCase(updateOrderStatus.pending, (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        })
        .addCase(updateOrderStatus.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.orders = state.orders.map((order) =>
                order._id === action.payload._id
                ? action.payload
                : order
                );
            state.message = "Order status updated successfully";
        })
        .addCase(updateOrderStatus.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
        })
    },
})
export const { reset } = orderSlice.actions;
export default orderSlice.reducer;