import EditProduct from "@/components/product/EditProduct";
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
                </EditProductContextProvider>
            </StoreProvider>
        </section>
    );
};

export default Page;
