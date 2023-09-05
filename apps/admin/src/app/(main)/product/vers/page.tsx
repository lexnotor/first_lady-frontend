import NewVersionForm from "@/components/product/NewVersionForm";
import StoreProvider from "@/redux/StoreProvider";
import React from "react";

const Page = () => {
    return (
        <section className="px-5">
            <StoreProvider>
                <NewVersionForm />
            </StoreProvider>
        </section>
    );
};

export default Page;
