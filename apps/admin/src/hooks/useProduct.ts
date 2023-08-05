"use client";

import { useEffect, useMemo } from "react";
import { useAppSelector } from "./useAppSelector";
import { useAppDispatch } from "./useAppDispatch";
import { getCategories } from "@/redux/produc/product.slice";

const useProduct = () => {
    const dispatch = useAppDispatch();

    const { category, products, search, thread } = useAppSelector(
        (state) => state.product
    );

    const isLookingCategory = useMemo(() => {
        return thread.some(
            (task) =>
                task.status == "LOADING" && task.action == "GET_CATEGORIES"
        );
    }, [thread]);

    useEffect(() => {
        if (category.length == 0 && !isLookingCategory)
            dispatch(getCategories());
    }, [dispatch, category.length, isLookingCategory]);

    return { category, products, search, thread };
};

export default useProduct;
