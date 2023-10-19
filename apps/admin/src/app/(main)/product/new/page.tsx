"use client";
import ListeProduit from "@/components/product/ListeProduit";
import { NewProductForm } from "@/components/product/NewProductForm";
import StoreProvider from "@/redux/StoreProvider";

const Page = () => {
    return (
        <section className="px-5">
            <div className="">
                <StoreProvider>
                    <NewProductForm />
                    <div className="h-6" />
                    <ListeProduit />
                </StoreProvider>
            </div>
            <div></div>
        </section>
    );
};

export default Page;
