import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import * as userService from "./userService";

const initialState = {
    users: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
};

export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async (token, thunkAPI) => {
        try {
            return await userService.getUsers(token);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                    error.message
            );
        }
    }
);

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export default userSlice.reducer;