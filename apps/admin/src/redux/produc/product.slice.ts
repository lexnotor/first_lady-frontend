import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CategoryInfo, ProductInfo } from "..";
import { productService } from "./product.service";

type Status = "LOADING" | "ERROR" | "FULLFILED";
interface ProductState {
    products: ProductInfo[];
    category: CategoryInfo[];
    search: ProductInfo[];
    thread: {
        id: string;
        action:
            | "CREATE_PRODUCT"
            | "CREATE_CATEGORY"
            | "GET_CATEGORIES"
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
const createCategory = createAsyncThunk(
    "product/createCategory",
    productService.createCategory
);
const getCategories = createAsyncThunk(
    "product/getCategories",
    productService.getCategories
);

const initialState: ProductState = {
    products: [],
    category: [],
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
            }),
});

// reducer
export default productSlice.reducer;

// async
export { createProduct, createCategory, getCategories };

// sync
export {};
