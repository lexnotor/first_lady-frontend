import { AsyncThunkPayloadCreator } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { ApiResponse, CategoryInfo, ProductInfo } from "..";
import { productUrl } from "../helper.api";
import { RootState } from "../store";

const createProduct: AsyncThunkPayloadCreator<ProductInfo> = async (
    payload,
    thunkAPI
) => {
    const {
        user: { token },
    } = thunkAPI.getState() as RootState;
    const {} = payload;
    try {
        const res: AxiosResponse<ApiResponse<ProductInfo>> = await axios.post(
            productUrl.createProduct,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return res.data.data;
    } catch (error) {}
};

const createCategory: AsyncThunkPayloadCreator<CategoryInfo> = async (
    payload,
    thunkAPI
) => {
    const {
        user: { token },
    } = thunkAPI.getState() as RootState;
    const {} = payload;
    try {
        const res: AxiosResponse<ApiResponse<CategoryInfo>> = await axios.post(
            productUrl.createCategory,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return res.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error.message || "FAIL_TO_CREATE_CATEGORY"
        );
    }
};

const getCategories: AsyncThunkPayloadCreator<CategoryInfo[]> = async (
    payload,
    thunkAPI
) => {
    const {} = payload;
    try {
        const res: AxiosResponse<ApiResponse<CategoryInfo[]>> = await axios.get(
            productUrl.findCategory
        );
        return res.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error.message || "FAIL_TO_FETCH_CATEGORIES"
        );
    }
};

export const productService = { createProduct, createCategory, getCategories };
