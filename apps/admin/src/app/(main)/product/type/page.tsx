import ListeCategory from "@/components/product/ListeCategory";
import StoreProvider from "@/redux/StoreProvider";
import React from "react";

const Page = () => {
    return (
        <div className="flex gap-4 px-4">
            <section className="grow">
                <StoreProvider>
                    <ListeCategory />
                </StoreProvider>
            </section>
            <section className="shrink-0 w-96 bg-primary-700 p-4 rounded-2xl self-start">
                <h3 className="font-bold text-center">Nouvelle categorie</h3>
            </section>
        </div>
    );
};

export default Page;
