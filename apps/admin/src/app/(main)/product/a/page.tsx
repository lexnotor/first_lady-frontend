import ListeProduct from "@/components/product/ListeProduct";
import StoreProvider from "@/redux/StoreProvider";

const Page = () => {
    return (
        <section className="px-5">
            <StoreProvider>
                <ListeProduct />
            </StoreProvider>
        </section>
    );
};

export default Page;
