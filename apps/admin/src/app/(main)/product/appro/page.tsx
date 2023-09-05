"use client";
import NewApprovisionnement from "@/components/product/NewApprovisionnement";
import SupplyingProvider from "@/components/product/context/SupplyingContext";
import React from "react";

const Page = () => {
    return (
        <section className="px-5">
            <div className="max-w-[700px]">
                <SupplyingProvider>
                    <NewApprovisionnement />
                </SupplyingProvider>
            </div>
        </section>
    );
};

export default Page;
