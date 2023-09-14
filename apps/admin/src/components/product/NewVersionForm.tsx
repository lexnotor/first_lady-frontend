"use client";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import useProduct from "@/hooks/useProduct";
import { ProductVersionInfo } from "@/redux";
import {
    createProductVersion,
    updateProductVersion,
} from "@/redux/product/product.slice";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { BsImage } from "react-icons/bs";
import { Button } from "ui";

const NewVersionForm = () => {
    const dispatch = useAppDispatch();
    const { products } = useProduct();

    const productRef = useRef<HTMLSelectElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const quantityRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const imageRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<File>(null);

    const submit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        const payload = {
            product: productRef.current.value,
            title: titleRef.current.value,
            quantity: +quantityRef.current.value,
            price: +priceRef.current.value,
            description: descriptionRef.current.value,
        };
        if (!payload.product || !payload.title)
            return alert("Veuillez completer tous les champs requis");

        await dispatch(createProductVersion(payload)).then((res) => {
            if (image && (res.payload as ProductVersionInfo).id) {
                return dispatch(
                    updateProductVersion({
                        productVId: (res.payload as ProductVersionInfo).id,
                        file: image,
                    })
                );
            }
        });

        productRef.current.value = "";
        titleRef.current.value = "";
        quantityRef.current.value = "0";
        priceRef.current.value = "0";
        descriptionRef.current.value = "";
        imageRef.current.value = null;
        setImage(null);
    };

    return (
        <form className="w-[40rem]" onSubmit={submit}>
            <section className="table-form w-full">
                <div className="input-group">
                    <label htmlFor="" className="input-label">
                        Product :
                    </label>
                    <div className="input-content">
                        <select ref={productRef}>
                            {products.map((product) => (
                                <option key={product?.id} value={product.id}>
                                    {product.title}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="input-group">
                    <label htmlFor="" className="input-label">
                        Designation* :
                    </label>
                    <div className="input-content">
                        <input
                            type="text"
                            placeholder="Variante B02"
                            ref={titleRef}
                        />
                    </div>
                </div>
                <div className="input-group">
                    <label htmlFor="" className="input-label">
                        Quantité :
                    </label>
                    <div className="input-content">
                        <input
                            type="number"
                            placeholder="0"
                            defaultValue={0}
                            ref={quantityRef}
                        />
                    </div>
                </div>
                <div className="input-group">
                    <label htmlFor="" className="input-label">
                        Prix :
                    </label>
                    <div className="input-content">
                        <input
                            type="number"
                            placeholder="0"
                            defaultValue={0}
                            ref={priceRef}
                        />
                    </div>
                </div>
                <div className="input-group">
                    <label htmlFor="" className="input-label">
                        Description :
                    </label>
                    <div className="input-content">
                        <textarea
                            className="resize-none py-1 px-4 rounded-lg"
                            rows={4}
                            placeholder="Designation"
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
                            {image ? (
                                <Image
                                    width={500}
                                    alt="Photo"
                                    height={500}
                                    src={URL.createObjectURL(image)}
                                    className="w-28 h-28 object-cover"
                                />
                            ) : (
                                <div className="text-primary-500 flex flex-col gap-2 justify-center items-center w-32 h-40 rounded-lg bg-primary-700 cursor-pointer">
                                    <span className="text-8xl">
                                        <BsImage />
                                    </span>
                                    <span className="text-[85%]">
                                        Select Photo
                                    </span>
                                </div>
                            )}
                            <input
                                type="file"
                                name=""
                                id=""
                                hidden
                                ref={imageRef}
                                onChange={(e) =>
                                    setImage(e.target.files.item(0))
                                }
                            />
                        </label>
                    </div>
                </div>
            </section>

            <div className="text-right mt-4">
                <Button size="middle">Enregistrer</Button>
            </div>
        </form>
    );
};

export default NewVersionForm;
