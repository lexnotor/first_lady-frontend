import EditProduct from "@/components/product/EditProduct";
import EditVersion from "@/components/product/EditVersion";
import ListeVariante from "@/components/product/ListeVariante";
import SearchBar from "@/components/product/SearchBar";
import EditProductContextProvider from "@/components/product/context/EditProductContext";
import StoreProvider from "@/redux/StoreProvider";

const Page = () => {
    return (
        <section className="px-5">
            <StoreProvider>
                <SearchBar />
                <EditProductContextProvider>
                    <ListeVariante />
                    <EditProduct />
                    <EditVersion />
                </EditProductContextProvider>
            </StoreProvider>
        </section>
    );
};

export default Page;
