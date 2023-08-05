import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "./shop/shop.slice";
import userReducer from "./user/user.slice";
import productReducer from "./product/product.slice";

const store = configureStore({
    reducer: {
        user: userReducer,
        shop: shopReducer,
        product: productReducer,
    },
});

// store
export default store;

// type
export type RootState = ReturnType<typeof store.getState>;
export type Dispatcher = typeof store.dispatch;
