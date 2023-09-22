import { OrderState } from "@/components/order";
import { AsyncThunkPayloadCreator } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import type { ApiResponse, CartProductInfo, OrderInfo, OrderStats } from "..";
import { cartUrl, orderUrl } from "../helper.api";
import { RootState } from "../store";

const getAllOrders: AsyncThunkPayloadCreator<OrderInfo[]> = async (
    _,
    thunkAPI
) => {
    const {
        user: { token },
    } = thunkAPI.getState() as RootState;

    try {
        const res: AxiosResponse<ApiResponse<OrderInfo[]>> = await axios.get(
            orderUrl.findOrders,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return res.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error.message ?? "FAIL_TO_FETCH_ORDERS"
        );
    }
};

const changeOrderState: AsyncThunkPayloadCreator<
    OrderInfo,
    { id: string; state: OrderState }
> = async (payload, thunkAPI) => {
    const {
        user: { token },
    } = thunkAPI.getState() as RootState;
    try {
        const url =
            payload.state == OrderState.DONE
                ? orderUrl.finishOrder
                : orderUrl.cancelOrder;
        const res: AxiosResponse<ApiResponse<OrderInfo>> = await axios.put(
            `${url}/${payload.id}`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
        );

        return res.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error.message ?? "FAIL_TO_CHANGE_STATE"
        );
    }
};

const saveLocalOrder: AsyncThunkPayloadCreator<
    OrderInfo,
    { id: string; qty: number }[]
> = async (payload, thunkAPI) => {
    const {
        user: { token },
    } = thunkAPI.getState() as RootState;

    let items: AxiosResponse<ApiResponse<CartProductInfo>>[];

    // add item in cart
    try {
        items = await Promise.all(
            payload.map((item) =>
                axios.post(
                    cartUrl.addItem,
                    {
                        quantity: item.qty,
                        product_v: item.id,
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                )
            )
        );
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message ?? "FAIL_TO_ADD_ITEMS");
    }

    // save ass order
    try {
        const res: AxiosResponse<ApiResponse<OrderInfo>> = await axios.post(
            orderUrl.saveLocalOrder,
            {
                items_id: items.map((item) => item.data.data?.id),
            },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        return res.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message ?? "FAIL_TO_ADD_ITEMS");
    }
};

const loadOrderStat: AsyncThunkPayloadCreator<OrderStats> = async (
    _,
    thunkAPI
) => {
    const {
        user: { token },
    } = thunkAPI.getState() as RootState;

    try {
        const res: AxiosResponse<ApiResponse<OrderStats>> = await axios.get(
            orderUrl.getStats,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        return res.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message ?? "FAIL_TO_LOAD_STATS");
    }
};

export const ordersService = {
    getAllOrders,
    saveLocalOrder,
    changeOrderState,
    loadOrderStat,
};
