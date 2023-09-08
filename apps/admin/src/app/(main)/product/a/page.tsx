import ListeProduct from "@/components/product/ListeProduct";
import SearchBar from "@/components/product/SearchBar";
import StoreProvider from "@/redux/StoreProvider";

const Page = () => {
    return (
        <section className="px-5">
            <StoreProvider>
                <SearchBar />
                <ListeProduct />
            </StoreProvider>
        </section>
    );
};

export default Page;
