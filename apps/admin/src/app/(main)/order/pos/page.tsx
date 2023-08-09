import SaleSearch from "@/components/order/SaleSearch";
import React from "react";

const Page = () => {
    return (
        <div className="px-5 flex gap-4 h-[calc(100vh-90px)]">
            <div className="w-96 shrink-0 h-full bg-primary-700 rounded-md overflow-y-auto p-4">
                <h2>Panier (Admin)</h2>
            </div>
            <div className="grow">
                {" "}
                <SaleSearch />
            </div>
        </div>
    );
};

export default Page;
