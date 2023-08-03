import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { shopService } from "./shop.service";
import { ShopInfo } from "..";

type Status = "LOADING" | "ERROR" | "FULLFILED";

interface ShopState {
    data: ShopInfo[];
    thread: {
        id: string;
        action: "GET_ALL_SHOP";
        status: Status;
        payload?: object;
        message?: { content: string; display: boolean };
    }[];
}

const initialState: ShopState = {
    data: [],
    thread: [],
};

const getShopList = createAsyncThunk(
    "shop/getShopList",
    shopService.getShopList
);

const shopSlice = createSlice({
    initialState,
    name: "shop",
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(getShopList.pending, (state, { meta }) => {
                state.thread.push({
                    id: meta.requestId,
                    status: "LOADING",
                    action: "GET_ALL_SHOP",
                });
            })
            .addCase(getShopList.fulfilled, (state, { payload, meta }) => {
                state.data = payload;
                const tasks = state.thread.find(
                    (task) => task.id == meta.requestId
                );
                if (tasks) tasks.status = "FULLFILED";
            })
            .addCase(getShopList.rejected, (state, { meta }) => {
                const tasks = state.thread.find((task) => {
                    return task.id == meta.requestId;
                });
                if (tasks) tasks.status = "ERROR";
            }),
});

// async
export { getShopList };

// sync
export {};

// reducer
export default shopSlice.reducer;
