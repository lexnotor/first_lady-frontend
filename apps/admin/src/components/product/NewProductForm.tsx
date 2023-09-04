"use client";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import useProduct from "@/hooks/useProduct";
import {
    createProduct,
    createProductVersion,
} from "@/redux/product/product.slice";
import React, { useEffect, useMemo, useState } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { BsImage } from "react-icons/bs";
import { Button } from "ui";
import NewProductContextProvider, {
    useNewProductContext,
} from "./context/NewProductContext";
import { Modal } from "antd";
import { ProductInfo } from "@/redux";

const ProductSection = () => {
    const { category } = useProduct();
    const { brandRef, categoryRef, descriptionRef, titleRef } =
        useNewProductContext();
    return (
        <section className="table-form w-[80%]">
            <div className="input-group">
                <label htmlFor="title" className="input-label">
                    Nom du product
                </label>
                <div className="input-content">
                    <input
                        type="text"
                        minLength={3}
                        id="title"
                        placeholder="VL3094.324"
                        ref={titleRef}
                    />
                </div>
            </div>
            <div className="input-group">
                <label htmlFor="brand" className="input-label">
                    Marque
                </label>
                <div className="input-content">
                    <input
                        type="text"
                        placeholder="Vlisco"
                        id="brand"
                        ref={brandRef}
                    />
                </div>
            </div>
            <div className="input-group">
                <label htmlFor="categorie" className="input-label">
                    Categorie
                </label>
                <div className="input-content">
                    <select name="categorie" id="categorie" ref={categoryRef}>
                        {category.map((cat) => (
                            <option value={cat.id} key={cat.id}>
                                {cat.title}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="input-group">
                <label htmlFor="description" className="input-label">
                    Description
                </label>
                <div className="input-content">
                    <textarea
                        name="description"
                        id="description"
                        placeholder="Desciption du produit"
                        ref={descriptionRef}
                    />
                </div>
            </div>
            <div className="input-group">
                <label htmlFor="description" className="input-label">
                    Image
                </label>
                <div className="input-content">
                    <label>
                        <div className="text-primary-500 flex flex-col gap-2 justify-center items-center w-32 h-40 rounded-lg bg-primary-700 cursor-pointer">
                            <span className="text-8xl">
                                <BsImage />
                            </span>
                            <span className="text-[85%]">Select picture</span>
                        </div>
                        <input type="file" name="" id="" hidden />
                    </label>
                </div>
            </div>
        </section>
    );
};
const VariantSection = () => {
    const { addVersion, deleteVersion, versions, setEditing } =
        useNewProductContext();
    return (
        <section className="shrink-0 w-96 p-4 bg-primary-600 rounded-lg">
            <h3 className="flex justify-between items-center mb-4">
                <span className="font-bold text-lg">Variants</span>
                <button
                    onClick={addVersion}
                    type="button"
                    className="hover:bg-secondary-800 text-secondary-800 border-secondary-800 border hover:text-primary-600 py-1 px-4 rounded-lg"
                >
                    Ajouter une variante
                </button>
            </h3>
            <ul>
                {versions.map((item) => (
                    <li
                        key={item.id}
                        className="flex py-1 items-center justify-between"
                    >
                        <div className="flex flex-col">
                            <h5 className="flex gap-2 items-center font-bold">
                                <span>{item.title || "Titre"}</span>
                                <span className="text-lg">
                                    <BiEdit />
                                </span>
                            </h5>
                            <p className="text-primary-400 text-[85%]">
                                {item.description.slice(0, 100) ||
                                    "Description ..."}
                            </p>
                            <p className="flex gap-2 text-[85%]">
                                <span>{item.price ?? 0} USD</span>
                                <span>|</span>
                                <span>x {item.quantity ?? 0}</span>
                            </p>
                        </div>
                        <div className="text-2xl">
                            <button
                                type="button"
                                onClick={() => deleteVersion(item.id)}
                                className="hover:text-red-400"
                            >
                                <BiTrash />
                            </button>
                            <button
                                type="button"
                                onClick={() => setEditing(item.id)}
                                className="hover:text-secondary-800"
                            >
                                <BiEdit />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};
const ModalSection = () => {
    const { editing, versions, setEditing } = useNewProductContext();
    const current = useMemo(
        () => (editing ? versions.find((item) => item.id == editing) : null),
        [editing, versions]
    );

    const [temp, setTemp] = useState<(typeof versions)[number]>({
        description: "",
        id: "",
        price: 0,
        quantity: 0,
        title: "",
    });

    const save = () => {
        current.description = temp.description;
        current.price = temp.price;
        current.quantity = temp.quantity;
        current.title = temp.title;
        setEditing(null);
    };

    useEffect(() => {
        setTemp({
            id: current?.id,
            title: current?.title,
            description: current?.description,
            price: current?.price,
            quantity: current?.quantity,
        });
    }, [editing, current]);
    return (
        <Modal
            destroyOnClose
            title={"Editer Variante"}
            footer={false}
            closable={false}
            onCancel={() => setEditing(null)}
            open={!!editing}
        >
            {current ? (
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="">Designation</label>
                        <input
                            type="text"
                            onChange={(e) =>
                                setTemp((old) => ({
                                    ...old,
                                    title: e.target.value,
                                }))
                            }
                            className="py-1 px-4 border rounded-lg"
                            placeholder="Designation"
                            value={temp.title}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="">Prix</label>
                        <input
                            type="text"
                            onChange={(e) =>
                                setTemp((old) => ({
                                    ...old,
                                    price: +e.target.value,
                                }))
                            }
                            className="py-1 px-4 border rounded-lg"
                            placeholder="Prix"
                            value={temp.price}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="">Quantité</label>
                        <input
                            type="text"
                            onChange={(e) =>
                                setTemp((old) => ({
                                    ...old,
                                    quantity: +e.target.value,
                                }))
                            }
                            className="py-1 px-4 border rounded-lg"
                            placeholder="Designation"
                            value={temp.quantity}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="">Description</label>
                        <textarea
                            onChange={(e) =>
                                setTemp((old) => ({
                                    ...old,
                                    description: e.target.value,
                                }))
                            }
                            className="resize-none py-1 px-4 border rounded-lg"
                            rows={4}
                            placeholder="Designation"
                            value={temp.description}
                        />
                    </div>
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={save}
                            className="bg-secondary-800 text-primary-600 py-1 px-4 rounded-lg"
                        >
                            OK
                        </button>
                        <button
                            type="button"
                            onClick={save}
                            className="border border-secondary-800 text-secondary-800 py-1 px-4 rounded-lg"
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </Modal>
    );
};

/*title description brand sales category quantity price */
const NewProductForm = () => {
    const dispatch = useAppDispatch();
    const { brandRef, categoryRef, descriptionRef, titleRef, versions } =
        useNewProductContext();

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

        dispatch(
            createProduct({
                title,
                description,
                brand,
                category,
                quantity,
            })
        )
            .then(({ payload }: { payload: ProductInfo }) => {
                titleRef.current.value = "";
                descriptionRef.current.value = "";
                brandRef.current.value = "";

                if (payload?.id)
                    versions.forEach((ver) =>
                        dispatch(
                            createProductVersion({
                                description: ver.description,
                                price: ver.price,
                                quantity: ver.quantity,
                                product: payload.id,
                                title: ver.title,
                            })
                        )
                    );
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
