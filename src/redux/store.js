import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";
import couponReducer from "./couponSlice";
import orderReducer from "./OrderSlice";

const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
        coupon: couponReducer,
        order: orderReducer,
    },
});

export default store;