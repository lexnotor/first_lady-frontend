import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "./shop/shop.slice";
import userReducer from "./user/user.slice";
import productReducer from "./product/product.slice";
import orderReducer from "./order/order.slice";
import modalReducer from "./modals/modal.slice";
import checkAuth from "./checkAuth";

const store = configureStore({
    reducer: {
        user: userReducer,
        shop: shopReducer,
        product: productReducer,
        order: orderReducer,
        modalmanager: modalReducer,
    },
    middleware: (getDefault) => getDefault().concat([checkAuth]),
});

// store
export default store;

// type
export type RootState = ReturnType<typeof store.getState>;
export type Dispatcher = typeof store.dispatch;
