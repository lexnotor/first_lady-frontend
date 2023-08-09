import OrderTable from "@/components/order/OrderTable";
import StoreProvider from "@/redux/StoreProvider";
import React from "react";

const Page = () => {
    return (
        <div className="px-5">
            <StoreProvider>
                <OrderTable />
            </StoreProvider>
        </div>
    );
};

export default Page;
