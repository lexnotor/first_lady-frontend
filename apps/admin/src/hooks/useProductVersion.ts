import { getProductsVersion } from "@/redux/product/product.slice";
import { useEffect, useMemo } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";

const useProductVersion = () => {
    const dispatch = useAppDispatch();
    const { productVersion, thread } = useAppSelector((state) => state.product);
    const isAllReadyInit = useMemo(
        () => thread.some((item) => item.action == "GET_PRODUCTS_VERSION"),
        [thread]
    );

    useEffect(() => {
        if (!isAllReadyInit) dispatch(getProductsVersion());
    }, [productVersion, isAllReadyInit, dispatch]);

    return { productVersion, thread };
};

export default useProductVersion;
