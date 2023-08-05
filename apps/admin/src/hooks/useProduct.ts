"use client";

import { useEffect, useMemo } from "react";
import { useAppSelector } from "./useAppSelector";
import { useAppDispatch } from "./useAppDispatch";
import { getCategories } from "@/redux/product/product.slice";

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

    const alreadySearchCategory = useMemo(() => {
        return thread.some((task) => task.action == "GET_CATEGORIES");
    }, [thread]);

    useEffect(() => {
        if (category.length == 0 && !alreadySearchCategory)
            dispatch(getCategories({}));
    }, [dispatch, category.length, alreadySearchCategory]);

    return { category, products, search, thread, isLookingCategory };
};

export default useProduct;
