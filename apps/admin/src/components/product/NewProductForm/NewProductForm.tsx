"use client";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { ProductInfo, ProductVersionInfo } from "@/redux";
import {
    createProduct,
    createProductVersion,
    updateProductVersion,
} from "@/redux/product/product.slice";
import React from "react";
import { Button } from "ui";
import NewProductContextProvider, {
    useNewProductContext,
} from "../context/NewProductContext";
import ModalSection from "./ModalSection";
import ProductSection from "./ProductSection";
import VariantSection from "./VariantSection";

/*title description brand sales category quantity price */
const NewProductForm = () => {
    const dispatch = useAppDispatch();
    const {
        brandRef,
        categoryRef,
        descriptionRef,
        titleRef,
        versions,
        setVersion,
    } = useNewProductContext();

    const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const title = titleRef.current.value;
        const description = descriptionRef.current.value;
        const brand = brandRef.current.value;
        const category = categoryRef.current.value;
        const quantity = "0";

        if (title.trim().length < 3)
            return alert("title must contain at least 3 characters");
        if (brand.trim().length < 3)
            return alert("brand must contain at least 3 characters");
        if (category.trim().length < 3)
            return alert("please select a category or create one before");
        if (+quantity.trim() < 0) return alert("please enter valid quantity");

        // CREATION DU PRODUIT
        dispatch(
            createProduct({
                title,
                description,
                brand,
                category,
                quantity,
            })
        )
            // SI PRODUIT CRÉE, ALORS ...
            .then(({ payload }: { payload: ProductInfo }) => {
                // ... CREATION DE SES VERSIONS
                if (payload?.id)
                    return Promise.all(
                        versions.map((ver) =>
                            dispatch(
                                createProductVersion({
                                    description: ver.description,
                                    price: ver.price,
                                    quantity: ver.quantity,
                                    product: payload.id,
                                    title: ver.title,
                                })
                            ).then(
                                ({
                                    payload,
                                }: {
                                    payload: ProductVersionInfo;
                                }) => {
                                    // AJOUT DE LA PHOTO SI SELECTIONNER
                                    if (payload?.id && ver.image)
                                        return dispatch(
                                            updateProductVersion({
                                                productVId: payload?.id,
                                                file: ver.image,
                                            })
                                        );
                                }
                            )
                        )
                    );
            })
            .then(() => {
                titleRef.current.value = "";
                descriptionRef.current.value = "";
                brandRef.current.value = "";
                setVersion([]);
            })
            .catch(alert);
    };

    return (
        <form className="w-full" onSubmit={submit}>
            <div className="flex gap-4">
                {/* PRODUCT DATA */}
                <ProductSection />
                {/* VARIANT_DATA */}
                <VariantSection />
            </div>

            <div className="text-right mt-4">
                <Button size="middle">Enregistrer</Button>
            </div>
            <ModalSection />
        </form>
    );
};

const ContextWrapper = () => (
    <NewProductContextProvider>
        <NewProductForm />
    </NewProductContextProvider>
);

export { ContextWrapper as NewProductForm };
