import FilterBar from "@/components/order/FilterBar";
import OrderTable from "@/components/order/OrderTable";
import StoreProvider from "@/redux/StoreProvider";

enum OrderState {
    DONE = "TERMINER",
    PENDING = "EN_COURS",
    ERROR = "ERREUR",
}

const Page = () => {
    return (
        <div className="px-5">
            <FilterBar status={OrderState.DONE} />
            <StoreProvider>
                <OrderTable status={OrderState.DONE} />
            </StoreProvider>
        </div>
    );
};

export default Page;
