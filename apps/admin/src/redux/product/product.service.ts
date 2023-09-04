import { AsyncThunkPayloadCreator } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import {
    ApiResponse,
    CategoryInfo,
    CategoryStats,
    ProductInfo,
    ProductStats,
    ProductVersionInfo,
} from "..";
import { productUrl } from "../helper.api";
import { RootState } from "../store";
import { getOneProduct as getOneProductRe } from "./product.slice";
import { CreateVersionPayload } from ".";

const createProduct: AsyncThunkPayloadCreator<ProductInfo, any> = async (
    payload = {},
    thunkAPI
) => {
    const {
        user: { token },
    } = thunkAPI.getState() as RootState;
    const { title, description, category, brand } = payload;
    try {
        const res: AxiosResponse<ApiResponse<ProductInfo>> = await axios.post(
            productUrl.createProduct,
            {
                title,
                description,
                category,
                brand,
            },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return res.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error.message ?? "FAIL_TO_CREATE_PRODUCT"
        );
    }
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

const createProductVersion: AsyncThunkPayloadCreator<
    ProductVersionInfo,
    CreateVersionPayload
> = async (payload, thunkAPI) => {
    const {
        user: { token },
    } = thunkAPI.getState() as RootState;
    const { title, product, description, quantity, price } = payload;
    try {
        const res: AxiosResponse<ApiResponse<ProductVersionInfo>> =
            await axios.post(
                productUrl.createProductVersion,
                { title, product, description, quantity, price },
                { headers: { Authorization: `Bearer ${token}` } }
            );

        return res.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error.message ?? "FAIL_TO_CREATE_PRODUCT_VERSION"
        );
    }
};

const getProductsVersion: AsyncThunkPayloadCreator<
    ProductVersionInfo[]
> = async (_, thunkAPI) => {
    try {
        const res: AxiosResponse<ApiResponse<ProductVersionInfo[]>> =
            await axios.get(productUrl.findProductVersion);

        res.data.data.forEach((productV) =>
            thunkAPI.dispatch(
                getOneProductRe({
                    productId:
                        productV.product?.id ?? (productV.product as string),
                })
            )
        );
        return res.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error.message ?? "FAIL_TO_FETCH_PRODUCT_VERSION"
        );
    }
};
const getProducts: AsyncThunkPayloadCreator<ProductInfo[], any> = async (
    _,
    thunkAPI
) => {
    try {
        const res: AxiosResponse<ApiResponse<ProductInfo[]>> = await axios.get(
            productUrl.findProduct
        );
        return res.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error.message ?? "FAIL_TO_FETCH_PRODUCT"
        );
    }
};

const getOneProduct: AsyncThunkPayloadCreator<
    ProductInfo,
    { productId: string; refresh?: boolean }
> = async (payload, thunkAPI) => {
    const { productId, refresh } = payload;
    const {
        product: { products },
    } = thunkAPI.getState() as RootState;
    const oldProduct = products.find((item) => item.id == productId);
    if (oldProduct && !refresh) return oldProduct;

    try {
        const res: AxiosResponse<ApiResponse<ProductInfo>> = await axios.get(
            productUrl.getOneProduct(productId)
        );
        return res.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error?.message ?? "FAIL_TO_LOAD_PRODUCT"
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

const loadCategorieStat: AsyncThunkPayloadCreator<CategoryStats[]> = async (
    _,
    thunkAPI
) => {
    try {
        const res = await axios.get(productUrl.loadCategorieStat);
        return res.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || "FAIL_TO_GET_STAT");
    }
};

const getProductStats: AsyncThunkPayloadCreator<ProductStats> = async (
    _,
    thunkAPI
) => {
    try {
        const res: AxiosResponse<ApiResponse<ProductStats>> = await axios.get(
            productUrl.getStats
        );

        return res.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message ?? "FAIL_TO_LOAD_STATS");
    }
};

export const productService = {
    createProduct,
    createCategory,
    getCategories,
    loadCategorieStat,
    getProducts,
    getProductStats,
    getOneProduct,
    getProductsVersion,
    createProductVersion,
};
