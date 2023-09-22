import { AsyncThunkPayloadCreator } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
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
        return thunkAPI.rejectWithValue(error.message || "FAIL_TO_LOAD_SHOP");
    }
};

export const shopService = { getShopList };
