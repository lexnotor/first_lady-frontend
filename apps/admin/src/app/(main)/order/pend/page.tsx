import OrderTable from "@/components/order/OrderTable";
import StoreProvider from "@/redux/StoreProvider";
import React from "react";

enum OrderState {
    DONE = "DONE",
    PENDING = "PENDING",
    ERROR = "ERROR",
}

const Page = () => {
    return (
        <div className="px-5">
            <StoreProvider>
                <OrderTable status={OrderState.PENDING} />
            </StoreProvider>
        </div>
    );
};

export default Page;
