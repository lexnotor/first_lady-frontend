"use client";
import NewApprovisionnement from "@/components/product/NewApprovisionnement";
import SupplyingProvider from "@/components/product/context/SupplyingContext";
import StoreProvider from "@/redux/StoreProvider";
import React from "react";

const Page = () => {
    return (
        <section className="px-5">
            <div className="max-w-[700px]">
                <StoreProvider>
                    <SupplyingProvider>
                        <NewApprovisionnement />
                    </SupplyingProvider>
                </StoreProvider>
            </div>
        </section>
    );
};

export default Page;
