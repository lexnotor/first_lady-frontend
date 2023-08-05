import { createSlice } from "@reduxjs/toolkit";
import { ProductInfo } from "..";

type Status = "LOADING" | "ERROR" | "FULLFILED";
interface ProductState {
    products: ProductInfo[];
    search: ProductInfo[];
    thread: {
        id: string;
        action: "CREATE_PRODUCT" | "SEARCH_PRODUCT" | "DELETE_PRODUCT";
        status: Status;
        payload?: object;
        message?: { content: string; display: boolean };
    }[];
}

const initialState: ProductState = {
    products: [],
    search: [],
    thread: [],
};

const productSlice = createSlice({
    initialState,
    name: "products",
    reducers: {},
});

export default productSlice.reducer;
