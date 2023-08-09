import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OrderInfo } from "..";
import { ordersService } from "./order.service";

type Status = "LOADING" | "ERROR" | "FULLFILED";

interface OrderState {
    orders: OrderInfo[];
    thread: {
        id: string;
        action: "GET_ALL_ORDERS";
        status: Status;
        payload?: object;
        message?: { content: string; display: boolean };
    }[];
}

const initialState: OrderState = {
    orders: [],
    thread: [],
};

const getAllOrders = createAsyncThunk(
    "order/getAllOrders",
    ordersService.getAllOrders
);

const orderSlice = createSlice({
    initialState,
    name: "order",
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(getAllOrders.pending, (state, { meta }) => {
                state.thread.push({
                    id: meta.requestId,
                    action: "GET_ALL_ORDERS",
                    status: "LOADING",
                });
            })
            .addCase(getAllOrders.fulfilled, (state, { meta, payload }) => {
                state.orders = payload;

                const task = state.thread.find(
                    (item) => item.id == meta.requestId
                );
                if (task) task.status = "FULLFILED";
            })
            .addCase(getAllOrders.rejected, (state, { meta }) => {
                const task = state.thread.find(
                    (item) => item.id == meta.requestId
                );
                if (task) task.status = "ERROR";
            }),
});

// reducer
export default orderSlice.reducer;

// async
export { getAllOrders };

// sync
