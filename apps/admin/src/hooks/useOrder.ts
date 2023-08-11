"use client";
import { useEffect, useMemo } from "react";
import { useAppSelector } from "./useAppSelector";
import { useAppDispatch } from "./useAppDispatch";
import { getAllOrders } from "@/redux/order/order.slice";

const useOrder = () => {
    const dispatch = useAppDispatch();
    const { orders, thread } = useAppSelector((state) => state.order);

    const isLoadingOrders = useMemo(
        () =>
            thread.some(
                (task) =>
                    task.status == "LOADING" && task.action == "GET_ALL_ORDERS"
            ),
        [thread]
    );

    useEffect(() => {
        if (orders.length == 0 && !isLoadingOrders) dispatch(getAllOrders());
    }, [dispatch, orders.length, isLoadingOrders]);

    return { orders, thread };
};

export default useOrder;
