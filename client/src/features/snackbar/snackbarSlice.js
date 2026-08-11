import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    open: false,
    severity: "success",
    message: "",
}

const snackbarSlice = createSlice({
    name: "snakbar",
    initialState,
    reducers: {
        showSnackbar: (state, action) => {
            state.open = true;
            state.severity = action.payload.severity;
            state.message = action.payload.message;
        },
        hideSnackbar: (state) => {
            state.open = false;
        },
    }
})
export const {
    showSnackbar,
    hideSnackbar,
} = snackbarSlice.actions;

export default snackbarSlice.reducer;