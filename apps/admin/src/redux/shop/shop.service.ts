import { AsyncThunkPayloadCreator } from "@reduxjs/toolkit";
import { ApiResponse, ShopInfo } from "..";
import axios, { AxiosResponse } from "axios";
import { shopUrl } from "../helper.api";

const getShopList: AsyncThunkPayloadCreator<ShopInfo[], void> = async (
    _,
    thunkAPI
) => {
    try {
        const res: AxiosResponse<ApiResponse<ShopInfo[]>> = await axios.get(
            shopUrl.findShop()
        );

        return res.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || "FAIL_TO_LOAD_SHOP");
    }
};

export const shopService = { getShopList };
