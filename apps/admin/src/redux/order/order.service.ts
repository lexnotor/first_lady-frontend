import { AsyncThunkPayloadCreator } from "@reduxjs/toolkit";
import { ApiResponse, OrderInfo } from "..";
import axios, { AxiosResponse } from "axios";
import { orderUrl } from "../helper.api";

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

export const ordersService = { getAllOrders };
