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
            | "ADD_PRODUCT_VERSION_QUANTITY"
            | "GET_PRODUCTS"
            | "GET_PRODUCTS_VERSION"
            | "GET_ONE_PRODUCTS"
            | "GET_ONE_PRODUCT_VERSION"
            | "GET_CATEGORIES"
            | "LOAD_CATEGORY_STAT"
            | "LOAD_PRODUCT_STAT"
            | "SEARCH_PRODUCT"
            | "UPDATE_PRODUCT"
            | "UPDATE_PRODUCT_VERSION"
            | "DELETE_PRODUCT"
            | "DELETE_PRODUCT_VERSION";
        status: Status;
        payload?: object;
        message?: { content: string; display: boolean };
    }[];
}

const addThread = (
    state: ProductState,
    requestId: string,
    action: ProductState["thread"][0]["action"]
) => {
    state.thread.push({
        id: requestId,
        action: action,
        status: "LOADING",
    });
};

const changeThreadStatus = (
    state: ProductState,
    requestId: string,
    status: Status
) => {
    const task = state.thread.find((item) => item.id == requestId);
    if (task) task.status = status;
};

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

const addVersionQuantity = createAsyncThunk(
    "product/addVersionQuantity",
    productService.addVersionQuantity
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

const getOneProductVersion = createAsyncThunk(
    "product/getOneProductVersion",
    productService.getOneProductVersion
);

const getProductStats = createAsyncThunk(
    "product/getProductStats",
    productService.getProductStats
);

const updateProduct = createAsyncThunk(
    "product/updateProduct",
    productService.updateProduct
);

const updateProductVersion = createAsyncThunk(
    "product/updateProductVersion",
    productService.updateProductVersion
);

const deleteProductVersion = createAsyncThunk(
    "product/deleteProductVersion",
    productService.deleteProductVersion
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
                addThread(state, meta.requestId, "CREATE_PRODUCT");
            })
            .addCase(createProduct.fulfilled, (state, { meta, payload }) => {
                state.products.unshift(payload);
                changeThreadStatus(state, meta.requestId, "FULLFILED");
            })
            .addCase(createProduct.rejected, (state, { meta }) => {
                changeThreadStatus(state, meta.requestId, "ERROR");
            })
            // createProductVersion
            .addCase(createProductVersion.pending, (state, { meta }) => {
                addThread(state, meta.requestId, "CREATE_PRODUCT_VERSION");
            })
            .addCase(
                createProductVersion.fulfilled,
                (state, { meta, payload }) => {
                    payload.product_v.forEach((vers) => {
                        if (
                            !state.productVersion.find(
                                (item) => item.id == vers.id
                            )
                        )
                            state.productVersion.unshift(vers);
                    });

                    changeThreadStatus(state, meta.requestId, "FULLFILED");
                }
            )
            .addCase(createProductVersion.rejected, (state, { meta }) => {
                changeThreadStatus(state, meta.requestId, "ERROR");
            })
            // createCategory
            .addCase(createCategory.pending, (state, { meta }) => {
                addThread(state, meta.requestId, "CREATE_CATEGORY");
            })
            .addCase(createCategory.fulfilled, (state, { meta, payload }) => {
                state.category.unshift(payload);

                changeThreadStatus(state, meta.requestId, "FULLFILED");
            })
            .addCase(createCategory.rejected, (state, { meta }) => {
                changeThreadStatus(state, meta.requestId, "ERROR");
            })
            // addVersionQuantity
            .addCase(addVersionQuantity.pending, (state, { meta }) => {
                addThread(
                    state,
                    meta.requestId,
                    "ADD_PRODUCT_VERSION_QUANTITY"
                );
            })
            .addCase(
                addVersionQuantity.fulfilled,
                (state, { meta, payload }) => {
                    const index = state.productVersion.findIndex(
                        (item) => item.key_id == payload.key_id
                    );
                    index != -1
                        ? state.productVersion.splice(index, 1, payload)
                        : state.productVersion.unshift(payload);

                    changeThreadStatus(state, meta.requestId, "FULLFILED");
                }
            )
            .addCase(addVersionQuantity.rejected, (state, { meta }) => {
                changeThreadStatus(state, meta.requestId, "ERROR");
            })
            // getCategories
            .addCase(getCategories.pending, (state, { meta }) => {
                addThread(state, meta.requestId, "GET_CATEGORIES");
            })
            .addCase(getCategories.fulfilled, (state, { meta, payload }) => {
                state.category = payload;

                changeThreadStatus(state, meta.requestId, "FULLFILED");
            })
            .addCase(getCategories.rejected, (state, { meta }) => {
                changeThreadStatus(state, meta.requestId, "ERROR");
            })
            // loadCategoriesStat
            .addCase(loadCategorieStat.pending, (state, { meta }) => {
                addThread(state, meta.requestId, "LOAD_CATEGORY_STAT");
            })
            .addCase(
                loadCategorieStat.fulfilled,
                (state, { meta, payload }) => {
                    state.categoryStat = payload;

                    changeThreadStatus(state, meta.requestId, "FULLFILED");
                }
            )
            .addCase(loadCategorieStat.rejected, (state, { meta }) => {
                changeThreadStatus(state, meta.requestId, "ERROR");
            })
            // getProducts
            .addCase(getProducts.pending, (state, { meta }) => {
                addThread(state, meta.requestId, "GET_PRODUCTS");
            })
            .addCase(getProducts.fulfilled, (state, { meta, payload }) => {
                state.products.push(...payload);

                changeThreadStatus(state, meta.requestId, "FULLFILED");
            })
            .addCase(getProducts.rejected, (state, { meta }) => {
                changeThreadStatus(state, meta.requestId, "ERROR");
            })
            // getProductsVersion
            .addCase(getProductsVersion.pending, (state, { meta }) => {
                addThread(state, meta.requestId, "GET_PRODUCTS_VERSION");
            })
            .addCase(
                getProductsVersion.fulfilled,
                (state, { meta, payload }) => {
                    state.productVersion = payload;

                    changeThreadStatus(state, meta.requestId, "FULLFILED");
                }
            )
            .addCase(getProductsVersion.rejected, (state, { meta }) => {
                changeThreadStatus(state, meta.requestId, "ERROR");
            })
            // getOneProduct
            .addCase(getOneProduct.pending, (state, { meta }) => {
                addThread(state, meta.requestId, "GET_ONE_PRODUCTS");
            })
            .addCase(getOneProduct.fulfilled, (state, { meta, payload }) => {
                const index = state.products.findIndex(
                    (item) => item.id == payload.id
                );

                state.products.splice(index, 1, payload);

                changeThreadStatus(state, meta.requestId, "FULLFILED");
            })
            .addCase(getOneProduct.rejected, (state, { meta }) => {
                changeThreadStatus(state, meta.requestId, "ERROR");
            })
            // getOneProductVersion
            .addCase(getOneProductVersion.pending, (state, { meta }) => {
                addThread(state, meta.requestId, "GET_ONE_PRODUCT_VERSION");
            })
            .addCase(
                getOneProductVersion.fulfilled,
                (state, { meta, payload }) => {
                    const index = state.productVersion.findIndex(
                        (item) => item.key_id == payload.key_id
                    );

                    index == -1
                        ? state.productVersion.unshift(payload)
                        : state.productVersion.splice(index, 1, payload);

                    changeThreadStatus(state, meta.requestId, "FULLFILED");
                }
            )
            .addCase(getOneProductVersion.rejected, (state, { meta }) => {
                changeThreadStatus(state, meta.requestId, "ERROR");
            })
            // getProductStats
            .addCase(getProductStats.pending, (state, { meta }) => {
                addThread(state, meta.requestId, "LOAD_PRODUCT_STAT");
            })
            .addCase(getProductStats.fulfilled, (state, { meta, payload }) => {
                state.productStat = payload;

                changeThreadStatus(state, meta.requestId, "FULLFILED");
            })
            .addCase(getProductStats.rejected, (state, { meta }) => {
                changeThreadStatus(state, meta.requestId, "ERROR");
            })
            // updateProduct
            .addCase(updateProduct.pending, (state, { meta }) => {
                addThread(state, meta.requestId, "UPDATE_PRODUCT");
            })
            .addCase(updateProduct.fulfilled, (state, { meta, payload }) => {
                const index = state.products.findIndex(
                    (item) => item.id == payload.id
                );
                state.products.splice(index, 1, payload);

                changeThreadStatus(state, meta.requestId, "FULLFILED");
            })
            .addCase(updateProduct.rejected, (state, { meta }) => {
                changeThreadStatus(state, meta.requestId, "ERROR");
            })
            // updateProductVersion
            .addCase(updateProductVersion.pending, (state, { meta }) => {
                addThread(state, meta.requestId, "UPDATE_PRODUCT_VERSION");
            })
            .addCase(
                updateProductVersion.fulfilled,
                (state, { meta, payload }) => {
                    // change version
                    const index = state.productVersion.findIndex(
                        (item) => item.key_id == payload.key_id
                    );
                    index != -1
                        ? state.productVersion.splice(index, 1, payload)
                        : state.productVersion.unshift(payload);

                    changeThreadStatus(state, meta.requestId, "FULLFILED");
                }
            )
            .addCase(updateProductVersion.rejected, (state, { meta }) => {
                changeThreadStatus(state, meta.requestId, "ERROR");
            })
            // deleteProductVersion
            .addCase(deleteProductVersion.pending, (state, { meta }) => {
                addThread(state, meta.requestId, "DELETE_PRODUCT_VERSION");
            })
            .addCase(
                deleteProductVersion.fulfilled,
                (state, { meta, payload }) => {
                    const index = state.productVersion.findIndex(
                        (item) => item.id == payload
                    );
                    state.productVersion.splice(index, 1);

                    changeThreadStatus(state, meta.requestId, "FULLFILED");
                }
            )
            .addCase(deleteProductVersion.rejected, (state, { meta }) => {
                changeThreadStatus(state, meta.requestId, "ERROR");
            }),
});

// reducer
export default productSlice.reducer;

// async
export {
    addVersionQuantity,
    createCategory,
    createProduct,
    createProductVersion,
    deleteProductVersion,
    getCategories,
    getOneProduct,
    getProductStats,
    getProducts,
    getProductsVersion,
    loadCategorieStat,
    getOneProductVersion,
    updateProduct,
    updateProductVersion,
};

// sync
export {};
