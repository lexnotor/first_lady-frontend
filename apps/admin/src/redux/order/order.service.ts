import { AsyncThunkPayloadCreator } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { ApiResponse, CartProductInfo, OrderInfo } from "..";
import { cartUrl, orderUrl } from "../helper.api";
import { RootState } from "../store";

const getAllOrders: AsyncThunkPayloadCreator<OrderInfo[]> = async (
    _,
    thunkAPI
) => {
    try {
        const res: AxiosResponse<ApiResponse<OrderInfo[]>> = await axios.get(
            orderUrl.findOrders
        );
        return res.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error.message ?? "FAIL_TO_FETCH_ORDERS"
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

export const ordersService = { getAllOrders, saveLocalOrder };
