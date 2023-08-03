import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/user.slice";

const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

// store
export default store;

// type
export type RootState = ReturnType<typeof store.getState>;
export type Dispatcher = typeof store.dispatch;
