import { AsyncThunkPayloadCreator } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { ApiResponse, CategoryInfo, ProductInfo } from "..";
import { productUrl } from "../helper.api";
import { RootState } from "../store";

const createProduct: AsyncThunkPayloadCreator<ProductInfo, any> = async (
    payload = {},
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

const createCategory: AsyncThunkPayloadCreator<CategoryInfo, any> = async (
    payload = {},
    thunkAPI
) => {
    const {
        user: { token },
    } = thunkAPI.getState() as RootState;
    const { title, description } = payload;
    try {
        const res: AxiosResponse<ApiResponse<CategoryInfo>> = await axios.post(
            productUrl.createCategory,
            { title, description },
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

const getCategories: AsyncThunkPayloadCreator<CategoryInfo[], any> = async (
    payload = {},
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

const loadCategorieStat: AsyncThunkPayloadCreator<
    {
        id: string;
        products: string;
        title: string;
    }[]
> = async (_, thunkAPI) => {
    try {
        const res = await axios.get(productUrl.loadCategorieStat);
        return res.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || "FAIL_TO_GET_STAT");
    }
};

export const productService = {
    createProduct,
    createCategory,
    getCategories,
    loadCategorieStat,
};
