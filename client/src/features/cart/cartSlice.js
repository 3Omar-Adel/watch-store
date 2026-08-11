import { createSlice } from "@reduxjs/toolkit";

const cartFromStorage =
    JSON.parse(localStorage.getItem("cart")) || [];

const initialState = {
    cartItems: cartFromStorage,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,

    reducers: {

        addToCart: (state, action) => {
            const item = action.payload;
            const existItem = state.cartItems.find(
                (product) => product._id === item._id
            );

        if (existItem) {
            existItem.quantity += item.quantity || 1;
        } else {

        state.cartItems.push({
            ...item,
            quantity: item.quantity || 1,
        });
        }

        localStorage.setItem(
        "cart",
        JSON.stringify(state.cartItems)
        );},

        removeFromCart: (state, action) => {

    state.cartItems = state.cartItems.filter(
        item => item._id !== action.payload
    );

    localStorage.setItem(
        "cart",
        JSON.stringify(state.cartItems)
    );

},

        increaseQuantity: (state, action) => {
            const item = state.cartItems.find(
                (product) => product._id === action.payload
            );

            if (item) {
                item.quantity += 1;
            }
        },

        decreaseQuantity: (state, action) => {
            const item = state.cartItems.find(
                (product) => product._id === action.payload
            );
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },

        clearCart: (state) => {
            state.cartItems = [];
        },
    },

});

export const {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;