import { ProductInfo, ProductVersionInfo } from "@/redux";
import React, { createContext, useContext, useRef } from "react";

interface SupplyingType {
    product?: React.MutableRefObject<{
        ver: ProductVersionInfo;
        pro: ProductInfo;
    }>;
    quantity?: React.MutableRefObject<number>;
    price?: React.MutableRefObject<number>;
}

const supplyingContext = createContext<SupplyingType>({});

const SupplyingProvider = ({ children }: React.PropsWithChildren) => {
    const product = useRef(null);
    const quantity = useRef(0);
    const price = useRef(0);

    return (
        <supplyingContext.Provider value={{ quantity, price, product }}>
            {children}
        </supplyingContext.Provider>
    );
};

export default SupplyingProvider;

export const useSupplyingContext = () => useContext(supplyingContext);
