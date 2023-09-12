"use client";
import { Drawer } from "antd";
import React from "react";
import { useEditProductContext } from "./context/EditProductContext";
import { AntConfig } from "ui";
import useProduct from "@/hooks/useProduct";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { updateProduct } from "@/redux/product/product.slice";

const EditProduct = () => {
    const { editing, setEditing, categoryRef, descriptionRef, titleRef } =
        useEditProductContext();
    const dispatch = useAppDispatch();

    const submit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const payload = {
            productId: editing.product.id,
            title: titleRef.current.value,
            category: categoryRef.current.value,
            description: descriptionRef.current.value,
        };

        if (payload.category == "0")
            return alert("Veuillez choisir une category");

        await dispatch(updateProduct(payload));
        setEditing(null);
    };
    const { category } = useProduct();
    return (
        <AntConfig>
            <Drawer
                open={!!editing}
                onClose={() => setEditing(null)}
                title="Modifier Produit"
                destroyOnClose
            >
                <form onSubmit={submit} className="flex flex-col h-full">
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="" className="">
                            Designation
                        </label>
                        <input
                            ref={titleRef}
                            type="text"
                            className="bg-slate-800 py-2 px-3 rounded-lg"
                            defaultValue={editing?.product?.title}
                        />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="" className="">
                            Categorie
                        </label>
                        <select
                            className="bg-slate-800 py-2 px-3 rounded-lg"
                            ref={categoryRef}
                        >
                            {!editing?.product?.category && (
                                <option value={0}>Aucun</option>
                            )}
                            {category.map((item) => (
                                <option
                                    key={item.id}
                                    value={item.id}
                                    selected={
                                        item.id ==
                                        editing?.product?.category?.id
                                    }
                                >
                                    {item.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="" className="">
                            Description
                        </label>
                        <textarea
                            ref={descriptionRef}
                            defaultValue={editing?.product?.description}
                            className="bg-slate-800 py-2 px-3 rounded-lg resize-none"
                            rows={4}
                        />
                    </div>
                    <div className="flex gap-2 pt-4">
                        <button
                            onClick={() => setEditing(null)}
                            type="button"
                            className="basis-1/2 px-4 py-1 border border-secondary-800 text-secondary-800 hover:bg-secondary-800 hover:text-primary-800 rounded-lg duration-500"
                        >
                            Annuler
                        </button>
                        <button className="basis-1/2 px-4 py-1 border border-secondary-800 text-secondary-800 hover:bg-secondary-800 hover:text-primary-800 rounded-lg duration-500">
                            Enregistrer
                        </button>
                    </div>
                </form>
            </Drawer>
        </AntConfig>
    );
};

export default EditProduct;
