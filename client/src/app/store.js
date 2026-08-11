import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import cartReducer from "../features/cart/cartSlice"
import wishlistReducer from "../features/wishlist/wishlistSlice";
import authReducer from "../features/auth/authSlice";
import snackbarReducer from "../features/snackbar/snackbarSlice";
import addressReducer from "../features/address/addressSlice";
import orderReducer from "../features/order/orderSlice";
import userReducer from "../features/user/userSlice";


const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        cart: cartReducer,
        wishlist: wishlistReducer,
        snackbar: snackbarReducer,
        address: addressReducer,
        order: orderReducer,
        users: userReducer,
    },
});

store.subscribe(() => {
    localStorage.setItem(
        "cart",
        JSON.stringify(store.getState().cart.cartItems)
    );
});

export default store;