import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OrderInfo, ProductInfo, ProductVersionInfo } from "..";
import { ordersService } from "./order.service";

type Status = "LOADING" | "ERROR" | "FULLFILED";

interface OrderState {
    orders: OrderInfo[];
    local_cart: {
        product_v_id: string;
        product_v: ProductVersionInfo;
        product: ProductInfo;
        quantity: number;
    }[];
    thread: {
        id: string;
        action: "GET_ALL_ORDERS" | "SAVE_LOCAL_ORDER";
        status: Status;
        payload?: object;
        message?: { content: string; display: boolean };
    }[];
}

const initialState: OrderState = {
    orders: [],
    thread: [],
    local_cart: [],
};

const getAllOrders = createAsyncThunk(
    "order/getAllOrders",
    ordersService.getAllOrders
);
const saveLocalOrder = createAsyncThunk(
    "order/saveLocalOrder",
    ordersService.saveLocalOrder
);

const orderSlice = createSlice({
    initialState,
    name: "order",
    reducers: {
        addLocalItem: (
            state,
            {
                payload,
            }: { payload: { p_v: ProductVersionInfo; p: ProductInfo } }
        ) => {
            const item = state.local_cart.find(
                (item) => item.product_v_id == payload.p_v.id
            );

            if (!!item) item.quantity++;
            else
                state.local_cart.push({
                    product_v: payload.p_v,
                    quantity: 1,
                    product_v_id: payload.p_v.id,
                    product: payload.p,
                });
        },
        setItemQty: (
            state,
            { payload }: { payload: { id: string; quantity: number } }
        ) => {
            const item = state.local_cart.find(
                (item) => item.product_v_id == payload.id
            );
            item.quantity = payload.quantity < 1 ? 1 : payload.quantity;
        },
        emptyCart: (state) => {
            state.local_cart = [];
        },
    },
    extraReducers: (builder) =>
        builder
            // getAllOrders
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
            })
            // saveLocalOrder
            .addCase(saveLocalOrder.pending, (state, { meta }) => {
                state.thread.push({
                    id: meta.requestId,
                    action: "SAVE_LOCAL_ORDER",
                    status: "LOADING",
                });
            })
            .addCase(saveLocalOrder.fulfilled, (state, { meta, payload }) => {
                state.orders.unshift(payload);

                const task = state.thread.find(
                    (item) => item.id == meta.requestId
                );
                if (task) task.status = "FULLFILED";
            })
            .addCase(saveLocalOrder.rejected, (state, { meta }) => {
                const task = state.thread.find(
                    (item) => item.id == meta.requestId
                );
                if (task) task.status = "ERROR";
            }),
});

// reducer
export default orderSlice.reducer;

// async
export { getAllOrders, saveLocalOrder };

// sync
export const { addLocalItem, setItemQty, emptyCart } = orderSlice.actions;
