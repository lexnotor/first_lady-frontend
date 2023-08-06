"use client";

import { useEffect, useMemo } from "react";
import { useAppSelector } from "./useAppSelector";
import { useAppDispatch } from "./useAppDispatch";
import {
    getCategories,
    getProducts,
    loadCategorieStat,
} from "@/redux/product/product.slice";

const useProduct = () => {
    const dispatch = useAppDispatch();

    const { category, products, search, thread, categoryStat } = useAppSelector(
        (state) => state.product
    );

    const isLookingCategory = useMemo(() => {
        return thread.some(
            (task) =>
                task.status == "LOADING" && task.action == "GET_CATEGORIES"
        );
    }, [thread]);

    const alreadySearchCategory = useMemo(() => {
        return thread.some((task) => task.action == "GET_CATEGORIES");
    }, [thread]);

    const alreadySearchProduct = useMemo(() => {
        return thread.some((task) => task.action == "GET_PRODUCTS");
    }, [thread]);

    useEffect(() => {
        if (category.length == 0 && !alreadySearchProduct)
            dispatch(getProducts({}));
    }, [dispatch, category.length, alreadySearchProduct]);

    useEffect(() => {
        if (category.length == 0 && !alreadySearchCategory)
            dispatch(getCategories({}));
    }, [dispatch, category.length, alreadySearchCategory]);

    useEffect(() => {
        dispatch(loadCategorieStat());
        const timer = setInterval(() => dispatch(loadCategorieStat()), 60_000);

        return () => clearInterval(timer);
    }, [dispatch]);

    return {
        category,
        products,
        search,
        thread,
        isLookingCategory,
        categoryStat,
        alreadySearchProduct,
        alreadySearchCategory,
    };
};

export default useProduct;
