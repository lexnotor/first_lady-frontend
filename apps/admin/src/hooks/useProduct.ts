"use client";

import { useEffect, useMemo } from "react";
import { useAppSelector } from "./useAppSelector";
import { useAppDispatch } from "./useAppDispatch";
import {
    getCategories,
    getProductStats,
    getProducts,
    loadCategorieStat,
} from "@/redux/product/product.slice";

const useProduct = () => {
    const dispatch = useAppDispatch();

    const { category, products, search, thread, categoryStat, productStat } =
        useAppSelector((state) => state.product);

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

    const alreadyLoadStats = useMemo(() => {
        return thread.some((task) => task.action == "GET_PRODUCTS");
    }, [thread]);

    useEffect(() => {
        if (!alreadySearchProduct) dispatch(getProducts({}));
    }, [dispatch, products.length, alreadySearchProduct]);

    useEffect(() => {
        if (!alreadySearchCategory) dispatch(getCategories({}));
    }, [dispatch, category.length, alreadySearchCategory]);

    useEffect(() => {
        if (!alreadyLoadStats) dispatch(getProductStats());
    }, [dispatch, productStat, alreadyLoadStats]);

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
        productStat,
        alreadySearchCategory,
    };
};

export default useProduct;
