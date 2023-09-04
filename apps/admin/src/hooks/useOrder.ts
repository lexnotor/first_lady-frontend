"use client";
import { useEffect, useMemo } from "react";
import { useAppSelector } from "./useAppSelector";
import { useAppDispatch } from "./useAppDispatch";
import { getAllOrders, loadOrderStat } from "@/redux/order/order.slice";

const useOrder = () => {
    const dispatch = useAppDispatch();
    const { orders, thread, orderStats } = useAppSelector(
        (state) => state.order
    );

    const isLoadingOrders = useMemo(
        () => thread.some((task) => task.action == "GET_ALL_ORDERS"),
        [thread]
    );

    const alreadyLoadStats = useMemo(() => {
        return thread.some((task) => task.action == "LOAD_ORDER_STATS");
    }, [thread]);

    useEffect(() => {
        if (!alreadyLoadStats) dispatch(loadOrderStat());
    }, [dispatch, orderStats, alreadyLoadStats]);

    useEffect(() => {
        if (!isLoadingOrders) dispatch(getAllOrders());
    }, [dispatch, orders.length, isLoadingOrders]);

    return { orders, thread, orderStats };
};

export default useOrder;
