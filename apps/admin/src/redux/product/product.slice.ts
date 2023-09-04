import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    CategoryInfo,
    ProductInfo,
    ProductStats,
    ProductVersionInfo,
} from "..";
import { productService } from "./product.service";

type Status = "LOADING" | "ERROR" | "FULLFILED";
interface ProductState {
    products: ProductInfo[];
    productVersion?: ProductVersionInfo[];
    category: CategoryInfo[];
    categoryStat: {
        id: string;
        products: string;
        title: string;
    }[];
    productStat: ProductStats;
    search: ProductInfo[];
    thread: {
        id: string;
        action:
            | "CREATE_PRODUCT"
            | "CREATE_PRODUCT_VERSION"
            | "CREATE_CATEGORY"
            | "GET_PRODUCTS"
            | "GET_PRODUCTS_VERSION"
            | "GET_ONE_PRODUCTS"
            | "GET_CATEGORIES"
            | "LOAD_CATEGORY_STAT"
            | "LOAD_PRODUCT_STAT"
            | "SEARCH_PRODUCT"
            | "DELETE_PRODUCT";
        status: Status;
        payload?: object;
        message?: { content: string; display: boolean };
    }[];
}

const createProduct = createAsyncThunk(
    "product/createProduct",
    productService.createProduct
);

const createProductVersion = createAsyncThunk(
    "product/createProductVersion",
    productService.createProductVersion
);

const createCategory = createAsyncThunk(
    "product/createCategory",
    productService.createCategory
);

const getCategories = createAsyncThunk(
    "product/getCategories",
    productService.getCategories
);

const loadCategorieStat = createAsyncThunk(
    "product/loadCategorieStat",
    productService.loadCategorieStat
);

const getProducts = createAsyncThunk(
    "product/getProducts",
    productService.getProducts
);

const getProductsVersion = createAsyncThunk(
    "product/getProductsVersion",
    productService.getProductsVersion
);
const getOneProduct = createAsyncThunk(
    "product/getOneProduct",
    productService.getOneProduct
);

const getProductStats = createAsyncThunk(
    "product/getProductStats",
    productService.getProductStats
);

const initialState: ProductState = {
    products: [],
    category: [],
    productVersion: [],
    productStat: null,
    categoryStat: [],
    search: [],
    thread: [],
};

const productSlice = createSlice({
    initialState,
    name: "product",
    reducers: {},
    extraReducers: (builder) =>
        builder
            // createProduct
            .addCase(createProduct.pending, (state, { meta }) => {
                state.thread.push({
                    id: meta.requestId,
                    action: "CREATE_PRODUCT",
                    status: "LOADING",
                });
            })
            .addCase(createProduct.fulfilled, (state, { meta, payload }) => {
                state.products.unshift(payload);

                const task = state.thread.find(
                    (item) => item.id == meta.requestId
                );
                if (task) task.status = "FULLFILED";
            })
            .addCase(createProduct.rejected, (state, { meta }) => {
                const task = state.thread.find(
                    (item) => item.id == meta.requestId
                );
                if (task) task.status = "ERROR";
            })
            // createProductVersion
            .addCase(createProductVersion.pending, (state, { meta }) => {
                state.thread.push({
                    id: meta.requestId,
                    action: "CREATE_PRODUCT_VERSION",
                    status: "LOADING",
                });
            })
            .addCase(
                createProductVersion.fulfilled,
                (state, { meta, payload }) => {
                    state.productVersion.unshift(payload);

                    const task = state.thread.find(
                        (item) => item.id == meta.requestId
                    );
                    if (task) task.status = "FULLFILED";
                }
            )
            .addCase(createProductVersion.rejected, (state, { meta }) => {
                const task = state.thread.find(
                    (item) => item.id == meta.requestId
                );
                if (task) task.status = "ERROR";
            })
            // createCategory
            .addCase(createCategory.pending, (state, { meta }) => {
                state.thread.push({
                    id: meta.requestId,
                    action: "CREATE_CATEGORY",
                    status: "LOADING",
                });
            })
            .addCase(createCategory.fulfilled, (state, { meta, payload }) => {
                state.category.unshift(payload);

                const task = state.thread.find(
                    (item) => item.id == meta.requestId
                );
                if (task) task.status = "FULLFILED";
            })
            .addCase(createCategory.rejected, (state, { meta }) => {
                const task = state.thread.find(
                    (item) => item.id == meta.requestId
                );
                if (task) task.status = "ERROR";
            })
            // getCategories
            .addCase(getCategories.pending, (state, { meta }) => {
                state.thread.push({
                    id: meta.requestId,
                    action: "GET_CATEGORIES",
                    status: "LOADING",
                });
            })
            .addCase(getCategories.fulfilled, (state, { meta, payload }) => {
                state.category.unshift(...payload);

                const task = state.thread.find(
                    (item) => item.id == meta.requestId
                );
                if (task) task.status = "FULLFILED";
            })
            .addCase(getCategories.rejected, (state, { meta }) => {
                const task = state.thread.find(
                    (item) => item.id == meta.requestId
                );
                if (task) task.status = "ERROR";
            })
            // loadCategoriesStat
            .addCase(loadCategorieStat.pending, (state, { meta }) => {
                state.thread.push({
                    id: meta.requestId,
                    action: "LOAD_CATEGORY_STAT",
                    status: "LOADING",
                });
            })
            .addCase(
                loadCategorieStat.fulfilled,
                (state, { meta, payload }) => {
                    state.categoryStat = payload;

                    const task = state.thread.find(
                        (item) => item.id == meta.requestId
                    );
                    if (task) task.status = "FULLFILED";
                }
            )
            .addCase(loadCategorieStat.rejected, (state, { meta }) => {
                const task = state.thread.find(
                    (item) => item.id == meta.requestId
                );
                if (task) task.status = "ERROR";
            })
            // getProducts
            .addCase(getProducts.pending, (state, { meta }) => {
                state.thread.push({
                    id: meta.requestId,
                    action: "GET_PRODUCTS",
                    status: "LOADING",
                });
            })
            .addCase(getProducts.fulfilled, (state, { meta, payload }) => {
                state.products.push(...payload);

                const task = state.thread.find(
                    (item) => item.id == meta.requestId
                );
                if (task) task.status = "FULLFILED";
            })
            .addCase(getProducts.rejected, (state, { meta }) => {
                const task = state.thread.find(
                    (item) => item.id == meta.requestId
                );
                if (task) task.status = "ERROR";
            })
            // getProductsVersion
            .addCase(getProductsVersion.pending, (state, { meta }) => {
                state.thread.push({
                    id: meta.requestId,
                    action: "GET_PRODUCTS_VERSION",
                    status: "LOADING",
                });
            })
            .addCase(
                getProductsVersion.fulfilled,
                (state, { meta, payload }) => {
                    state.productVersion = payload;

                    const task = state.thread.find(
                        (item) => item.id == meta.requestId
                    );
                    if (task) task.status = "FULLFILED";
                }
            )
            .addCase(getProductsVersion.rejected, (state, { meta }) => {
                const task = state.thread.find(
                    (item) => item.id == meta.requestId
                );
                if (task) task.status = "ERROR";
            })
            // getOneProduct
            .addCase(getOneProduct.pending, (state, { meta }) => {
                state.thread.push({
                    id: meta.requestId,
                    action: "GET_ONE_PRODUCTS",
                    status: "LOADING",
                });
            })
            .addCase(getOneProduct.fulfilled, (state, { meta, payload }) => {
                const index = state.products.findIndex(
                    (item) => item.id == payload.id
                );

                state.products.splice(index, 1, payload);

                const task = state.thread.find(
                    (item) => item.id == meta.requestId
                );
                if (task) task.status = "FULLFILED";
            })
            .addCase(getOneProduct.rejected, (state, { meta }) => {
                const task = state.thread.find(
                    (item) => item.id == meta.requestId
                );
                if (task) task.status = "ERROR";
            })
            // getProductStats
            .addCase(getProductStats.pending, (state, { meta }) => {
                state.thread.push({
                    id: meta.requestId,
                    action: "LOAD_PRODUCT_STAT",
                    status: "LOADING",
                });
            })
            .addCase(getProductStats.fulfilled, (state, { meta, payload }) => {
                state.productStat = payload;

                const task = state.thread.find(
                    (item) => item.id == meta.requestId
                );
                if (task) task.status = "FULLFILED";
            })
            .addCase(getProductStats.rejected, (state, { meta }) => {
                const task = state.thread.find(
                    (item) => item.id == meta.requestId
                );
                if (task) task.status = "ERROR";
            }),
});

// reducer
export default productSlice.reducer;

// async
export {
    createProduct,
    createCategory,
    getCategories,
    loadCategorieStat,
    getProducts,
    getOneProduct,
    getProductStats,
    getProductsVersion,
    createProductVersion,
};

// sync
export {};
