"use client";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import useProduct from "@/hooks/useProduct";
import { createProduct } from "@/redux/product/product.slice";
import React, { useRef } from "react";
import { BsImage } from "react-icons/bs";
import { Button } from "ui";

/*title description brand sales category quantity price */
const NewProductForm = () => {
    const dispatch = useAppDispatch();
    const { category } = useProduct();

    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const brandRef = useRef<HTMLInputElement>(null);
    const categoryRef = useRef<HTMLSelectElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);

    const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const title = titleRef.current.value;
        const description = descriptionRef.current.value;
        const brand = brandRef.current.value;
        const category = categoryRef.current.value;
        const quantity = "0";
        const price = priceRef.current.value;

        if (title.trim().length < 3)
            return alert("title must contain at least 3 characters");
        if (brand.trim().length < 3)
            return alert("brand must contain at least 3 characters");
        if (category.trim().length < 3)
            return alert("please select a category or create one before");
        if (+quantity.trim() < 0) return alert("please enter valid quantity");
        if (+price.trim() < 0) return alert("please enter valid price");

        dispatch(
            createProduct({
                title,
                description,
                brand,
                category,
                quantity,
                price,
            })
        )
            .then(() => {
                titleRef.current.value = "";
                descriptionRef.current.value = "";
                brandRef.current.value = "";
                priceRef.current.value = "0";
            })
            .catch(alert);
    };

    return (
        <form className="w-full" onSubmit={submit}>
            <div className="table-form w-full">
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
                        <select
                            name="categorie"
                            id="categorie"
                            ref={categoryRef}
                        >
                            {category.map((cat) => (
                                <option value={cat.id} key={cat.id}>
                                    {cat.title}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="input-group">
                    <label htmlFor="price" className="input-label">
                        Prix
                    </label>
                    <div className="input-content">
                        <input
                            type="number"
                            name="price"
                            id="price"
                            defaultValue={0}
                            min={0}
                            ref={priceRef}
                        />
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
                                <span className="text-[85%]">
                                    Select picture
                                </span>
                            </div>
                            <input type="file" name="" id="" hidden />
                        </label>
                    </div>
                </div>
            </div>

            <div className="text-right mt-4">
                <Button size="middle">Enregistrer</Button>
            </div>
        </form>
    );
};

export default NewProductForm;
