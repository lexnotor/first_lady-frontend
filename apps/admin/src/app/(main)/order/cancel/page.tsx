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
            <FilterBar status={OrderState.ERROR} />
            <StoreProvider>
                <OrderTable status={OrderState.ERROR} />
            </StoreProvider>
        </div>
    );
};

export default Page;
