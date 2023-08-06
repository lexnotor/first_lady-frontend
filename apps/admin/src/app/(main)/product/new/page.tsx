import NewProductForm from "@/components/product/NewProductForm";
import StoreProvider from "@/redux/StoreProvider";

const Page = () => {
    return (
        <section className="px-5">
            <div className="max-w-[700px]">
                <StoreProvider>
                    <NewProductForm />
                </StoreProvider>
            </div>
            <div></div>
        </section>
    );
};

export default Page;
