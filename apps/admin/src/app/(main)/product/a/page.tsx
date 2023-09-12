import EditProduct from "@/components/product/EditProduct";
import EditVersion from "@/components/product/EditVersion";
import ListeProduct from "@/components/product/ListeProduct";
import SearchBar from "@/components/product/SearchBar";
import EditProductContextProvider from "@/components/product/context/EditProductContext";
import StoreProvider from "@/redux/StoreProvider";

const Page = () => {
    return (
        <section className="px-5">
            <StoreProvider>
                <SearchBar />
                <EditProductContextProvider>
                    <ListeProduct />
                    <EditProduct />
                    <EditVersion />
                </EditProductContextProvider>
            </StoreProvider>
        </section>
    );
};

export default Page;
