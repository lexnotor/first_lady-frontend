"use client";

import { useCallback } from "react";
import { useAppSelector } from "./useAppSelector";

const useLocatCart = () => {
    const { local_cart } = useAppSelector((state) => state.order);
    const isInCart = useCallback(
        (product_v_id: string) =>
            local_cart.some((item) => item.product_v_id == product_v_id),
        [local_cart]
    );

    return { local_cart, isInCart };
};

export { useLocatCart };
