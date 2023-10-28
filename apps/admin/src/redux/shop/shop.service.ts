import { AsyncThunkPayloadCreator } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ApiResponse, ShopInfo } from "..";
import { shopUrl } from "../helper.api";
import { RootState } from "../store";

const getShopList: AsyncThunkPayloadCreator<ShopInfo[], void> = async (
    _,
    thunkAPI
) => {
    const {
        user: { token },
    } = thunkAPI.getState() as RootState;

    try {
        const res: AxiosResponse<ApiResponse<ShopInfo[]>> = await axios.get(
            shopUrl.findShop(),
            { headers: { Authorization: `Bearer ${token}` } }
        );

        return res.data.data;
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        return thunkAPI.rejectWithValue({
            error: err?.response.data?.message ?? "FAIL_TO_LOAD_SHOP",
            code_error: err?.response?.status ?? 0,
        });
    }
};

export const shopService = { getShopList };
