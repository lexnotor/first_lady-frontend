"use client";

import { useEffect, useMemo } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import { getShopList } from "@/redux/shop/shop.slice";

const useShop = () => {
    const dispatch = useAppDispatch();
    const shop = useAppSelector((state) => state.shop);

    const onLoading = useMemo(() => {
        return shop.thread.filter((task) => task.status == "LOADING");
    }, [shop.thread]);

    const alreadyGetAll = useMemo(() => {
        return shop.thread.some((item) => item.action == "GET_ALL_SHOP");
    }, [shop.thread]);

    useEffect(() => {
        if (!alreadyGetAll) dispatch(getShopList());
    }, [alreadyGetAll, dispatch, shop.data.length]);

    return { onLoading, shops: shop.data };
};

export default useShop;
