import { ProductInfo, ProductVersionInfo } from "@/redux";
import React, { createContext, useContext, useRef } from "react";

interface SupplyingType {
    product?: React.MutableRefObject<{
        ver: ProductVersionInfo;
        pro: ProductInfo;
    }>;
    quantityRef?: React.MutableRefObject<HTMLInputElement>;
    priceRef?: React.MutableRefObject<HTMLInputElement>;
}

const supplyingContext = createContext<SupplyingType>({});

const SupplyingProvider = ({ children }: React.PropsWithChildren) => {
    const product = useRef(null);
    const quantityRef = useRef(null);
    const priceRef = useRef(null);

    return (
        <supplyingContext.Provider value={{ quantityRef, priceRef, product }}>
            {children}
        </supplyingContext.Provider>
    );
};

export default SupplyingProvider;

export const useSupplyingContext = () => useContext(supplyingContext);
