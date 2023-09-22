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
import {
    getOneProduct as getOneProductRe,
    getOneProductVersion as getOneProductVRe,
} from "./product.slice";
import {
    AddVersionQuantityPayload,
    CreateVersionPayload,
    UpdateProductPayload,
    UpdateVersionPayload,
} from ".";

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

        thunkAPI.dispatch(
            getOneProductRe({
                productId: res.data.data.product.id,
                refresh: true,
            })
        );

        return res.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error.message ?? "FAIL_TO_CREATE_PRODUCT_VERSION"
        );
    }
};

const addVersionQuantity: AsyncThunkPayloadCreator<
    ProductVersionInfo,
    AddVersionQuantityPayload
> = async (payload, thunkAPI) => {
    const {
        user: { token },
    } = thunkAPI.getState() as RootState;

    const { price, product, quantity } = payload;

    try {
        const res: AxiosResponse<ApiResponse<ProductVersionInfo>> =
            await axios.put(
                productUrl.addQuantityProductVersion(product),
                { price, quantity },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
        // mettre à jour le produit
        thunkAPI.dispatch(
            getOneProductRe({
                productId:
                    res.data.data.product?.id ??
                    (res.data.data.product as string),
                refresh: true,
            })
        );

        return res.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error?.message ?? "FAIL_TO_ADD_QUANTITY"
        );
    }
};

const getProductsVersion: AsyncThunkPayloadCreator<
    ProductVersionInfo[]
> = async (_, thunkAPI) => {
    const {
        user: { token },
    } = thunkAPI.getState() as RootState;

    try {
        const res: AxiosResponse<ApiResponse<ProductVersionInfo[]>> =
            await axios.get(productUrl.findProductVersion, {
                headers: { Authorization: `Bearer ${token}` },
            });

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
    const {
        user: { token },
    } = thunkAPI.getState() as RootState;

    try {
        const res: AxiosResponse<ApiResponse<ProductInfo[]>> = await axios.get(
            productUrl.findProduct,
            { headers: { Authorization: `Bearer ${token}` } }
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

    const {
        user: { token },
    } = thunkAPI.getState() as RootState;

    try {
        const res: AxiosResponse<ApiResponse<ProductInfo>> = await axios.get(
            productUrl.getOneProduct(productId),
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return res.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error?.message ?? "FAIL_TO_LOAD_PRODUCT"
        );
    }
};
const getOneProductVersion: AsyncThunkPayloadCreator<
    ProductVersionInfo,
    { productVId: string; refresh?: boolean }
> = async (payload, thunkAPI) => {
    const { productVId, refresh } = payload;
    const {
        product: { productVersion },
    } = thunkAPI.getState() as RootState;
    const oldProduct = productVersion.find((item) => item.id == productVId);
    if (oldProduct && !refresh) return oldProduct;

    const {
        user: { token },
    } = thunkAPI.getState() as RootState;

    try {
        const res: AxiosResponse<ApiResponse<ProductVersionInfo>> =
            await axios.get(productUrl.getOneProductVersion(productVId), {
                headers: { Authorization: `Bearer ${token}` },
            });
        return res.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error?.message ?? "FAIL_TO_LOAD_PRODUCT_VERSION"
        );
    }
};

const getCategories: AsyncThunkPayloadCreator<CategoryInfo[], any> = async (
    payload = {},
    thunkAPI
) => {
    const {} = payload;
    const {
        user: { token },
    } = thunkAPI.getState() as RootState;

    try {
        const res: AxiosResponse<ApiResponse<CategoryInfo[]>> = await axios.get(
            productUrl.findCategory,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return res.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error.message || "FAIL_TO_FETCH_CATEGORIES"
        );
    }
};

const deleteProductVersion: AsyncThunkPayloadCreator<string, string> = async (
    versionId,
    thunkAPI
) => {
    const {
        user: { token },
    } = thunkAPI.getState() as RootState;
    try {
        const res: AxiosResponse<ApiResponse<string>> = await axios.delete(
            productUrl.deleteProductVersion(versionId),
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return res.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error.message || "FAIL_TO_DELETE_PRODUCT_VERSION"
        );
    }
};

const loadCategorieStat: AsyncThunkPayloadCreator<CategoryStats[]> = async (
    _,
    thunkAPI
) => {
    const {
        user: { token },
    } = thunkAPI.getState() as RootState;

    try {
        const res = await axios.get(productUrl.loadCategorieStat, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || "FAIL_TO_GET_STAT");
    }
};

const getProductStats: AsyncThunkPayloadCreator<ProductStats> = async (
    _,
    thunkAPI
) => {
    const {
        user: { token },
    } = thunkAPI.getState() as RootState;

    try {
        const res: AxiosResponse<ApiResponse<ProductStats>> = await axios.get(
            productUrl.getStats,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        return res.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message ?? "FAIL_TO_LOAD_STATS");
    }
};

const updateProduct: AsyncThunkPayloadCreator<
    ProductInfo,
    UpdateProductPayload
> = async (payload, thunkAPI) => {
    const {
        user: { token },
    } = thunkAPI.getState() as RootState;
    const { productId, ...rest } = payload;

    try {
        const res: AxiosResponse<ApiResponse<ProductInfo>> = await axios.put(
            productUrl.updateProduct(productId),
            rest,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        const vers = res.data.data.product_v;
        vers.forEach((ver) =>
            thunkAPI.dispatch(
                getOneProductVRe({ productVId: ver.id, refresh: true })
            )
        );

        return res.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error?.message ?? "FAILED_TO_UPDATE_PRODUCT"
        );
    }
};

const updateProductVersion: AsyncThunkPayloadCreator<
    ProductVersionInfo,
    UpdateVersionPayload
> = async (payload, thunkAPI) => {
    const {
        user: { token },
    } = thunkAPI.getState() as RootState;
    const { productVId, ...rest } = payload;

    try {
        const res: AxiosResponse<ApiResponse<ProductVersionInfo>> = rest.file
            ? await axios.putForm(
                  productUrl.addPhotoToVersion(productVId),
                  {
                      file: rest.file,
                  },
                  { headers: { Authorization: `Bearer ${token}` } }
              )
            : await axios.put(
                  productUrl.updateProductVersion(productVId),
                  rest,
                  {
                      headers: { Authorization: `Bearer ${token}` },
                  }
              );

        const new_vers = res.data.data;

        if (new_vers)
            thunkAPI.dispatch(
                getOneProductRe({
                    productId: new_vers.product.id,
                    refresh: true,
                })
            );

        return new_vers;
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error?.message ?? "FAILED_TO_UPDATE_PRODUCT_VERSION"
        );
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
    deleteProductVersion,
    addVersionQuantity,
    updateProduct,
    updateProductVersion,
    getOneProductVersion,
};
