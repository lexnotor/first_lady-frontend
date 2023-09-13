import FilterBar from "@/components/order/FilterBar";
import OrderTable from "@/components/order/OrderTable";
import StoreProvider from "@/redux/StoreProvider";
import React from "react";

enum OrderState {
    DONE = "TERMINER",
    PENDING = "EN_COURS",
    ERROR = "ERREUR",
}

const Page = () => {
    return (
        <div className="px-5">
            <FilterBar />
            <StoreProvider>
                <OrderTable status={OrderState.PENDING} />
            </StoreProvider>
        </div>
    );
};

export default Page;
