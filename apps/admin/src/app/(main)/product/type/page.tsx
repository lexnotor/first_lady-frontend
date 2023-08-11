import ListeCategory from "@/components/product/ListeCategory";
import NewCategoryForm from "@/components/product/NewCategoryForm";
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
            <section className="shrink-0 w-96 rounded-2xl self-start overflow-hidden bg-primary-800">
                <h3 className="font-bold bg-primary-700 text-center p-2">
                    Nouvelle categorie
                </h3>
                <StoreProvider>
                    <NewCategoryForm />
                </StoreProvider>
            </section>
        </div>
    );
};

export default Page;
