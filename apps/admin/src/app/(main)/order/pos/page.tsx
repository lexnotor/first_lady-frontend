import SaleCart from "@/components/order/SaleCart";
import SaleSearch from "@/components/order/SaleSearch";
import StoreProvider from "@/redux/StoreProvider";

const Page = () => {
    return (
        <div className="px-5 flex gap-4 h-[calc(100vh-90px)]">
            <div className="w-96 shrink-0 h-full bg-primary-700 rounded-md overflow-y-auto p-4">
                <StoreProvider>
                    <SaleCart />
                </StoreProvider>
            </div>
            <div className="grow bg-primary-700 px-4">
                <StoreProvider>
                    <SaleSearch />
                </StoreProvider>
            </div>
        </div>
    );
};

export default Page;
