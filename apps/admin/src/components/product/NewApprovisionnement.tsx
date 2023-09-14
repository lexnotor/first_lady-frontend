"use client";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { ApiResponse, ProductInfo } from "@/redux";
import { productUrl } from "@/redux/helper.api";
import { addVersionQuantity } from "@/redux/product/product.slice";
import { Modal } from "antd";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { AntConfig, Button } from "ui";
import { useSupplyingContext } from "./context/SupplyingContext";
import { BsImage } from "react-icons/bs";

const NewApprovisionnement = () => {
    const dispatch = useAppDispatch();
    const { priceRef, product, quantityRef } = useSupplyingContext();

    const [isearching, setIsearching] = useState(false);

    const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        dispatch(
            addVersionQuantity({
                price: +priceRef.current.value ?? 0,
                product: product.current?.ver?.id,
                quantity: +quantityRef.current.value,
            })
        );
    };

    return (
        <>
            <form onSubmit={submit}>
                <div className="table-form w-full">
                    <div className="input-group">
                        <label htmlFor="title" className="input-label">
                            Variante
                        </label>
                        {product?.current ? (
                            <div className="input-content">
                                <input
                                    type="text"
                                    minLength={3}
                                    id="title"
                                    placeholder="VL3094.324"
                                    onChange={() => setIsearching(true)}
                                    value={`${product.current.pro.title} (${product.current.ver.title})`}
                                />
                            </div>
                        ) : (
                            <Button
                                type="button"
                                onClick={() => setIsearching(true)}
                            >
                                Choisir
                            </Button>
                        )}
                    </div>
                    <div className="input-group">
                        <label htmlFor="quantity" className="input-label">
                            Quantité
                        </label>
                        <div className="input-content">
                            <input
                                type="number"
                                min={0}
                                id="quantity"
                                defaultValue={0}
                                placeholder="0"
                                ref={quantityRef}
                            />
                        </div>
                    </div>
                    <div className="input-group">
                        <label htmlFor="price" className="input-label">
                            Prix
                        </label>
                        <div className="input-content">
                            <input
                                type="number"
                                min={0}
                                id="price"
                                defaultValue={0}
                                placeholder="0"
                                ref={priceRef}
                            />
                        </div>
                    </div>
                </div>
                <div className="text-right mt-4">
                    <Button size="middle">Enregistrer</Button>
                </div>
            </form>
            <SearchForm {...{ isearching, setIsearching }} />
        </>
    );
};

const SearchForm = ({ isearching, setIsearching }) => {
    const [result, setResult] = useState<ProductInfo[]>([]);

    const { product, priceRef } = useSupplyingContext();
    const inputRef = useRef<HTMLInputElement>(null);

    const search: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        fetch(`${productUrl.findProduct}?text=${inputRef.current.value}`)
            .then((res) => res.json())
            .then((res: ApiResponse<ProductInfo[]>) =>
                setResult(res.data ?? [])
            )
            .catch(() => setResult([]));
    };
    return (
        <AntConfig>
            <Modal
                closable
                footer={false}
                onCancel={() => setIsearching(false)}
                open={isearching}
                centered
                width={600}
            >
                <div className="w-full max-h-[calc(100vh-10rem)] flex flex-col gap-2">
                    {/* search bar */}
                    <form
                        className="w-96 flex gap-4 sticky top-0 pt-2"
                        onSubmit={search}
                    >
                        <label className="bg-transparent text-primary-200 border rounded-2xl grow">
                            <input
                                type="text"
                                className="py-1 px-4 bg-transparent w-full"
                                placeholder="Produit ..."
                                ref={inputRef}
                            />
                        </label>
                        <button className="cursor-pointer px-4 py-1 text-primary-200 border border-primary-200 hover:bg-secondary-800 active:!bg-secondary-600 hover:text-black transition-colors duration-500 rounded-3xl">
                            Search
                        </button>
                    </form>

                    {/* search result */}
                    <div className="w-full h-[calc(100%-2rem)] overflow-y-auto grid grid-cols-4 gap-4 pt-2 pr-2 [&>div]:border-none [&>div]:border-primary-200 [&>div]:rounded-none ">
                        {result.map((item) =>
                            item.product_v.map((ver) => (
                                <div
                                    key={ver.id}
                                    className="flex flex-col justify-end"
                                >
                                    {ver?.photo?.photo?.link ? (
                                        <Image
                                            width={500}
                                            alt="Photo"
                                            height={500}
                                            src={ver?.photo?.photo?.link}
                                            className="object-cover aspect-square rounded-lg shadow-lg"
                                        />
                                    ) : (
                                        <div className="text-primary-500 flex flex-col gap-2 justify-center items-center rounded-lg  cursor-pointer">
                                            <span className="text-8xl">
                                                <BsImage />
                                            </span>
                                        </div>
                                    )}
                                    <p className="text-[85%] mt-2">
                                        {item.title}
                                    </p>
                                    <p className="text-[85%]">{ver.title}</p>
                                    <p className="flex justify-between items-center">
                                        <span className="text-[85%]">
                                            {ver.price} $
                                        </span>
                                        <span>
                                            <button
                                                onClick={() => {
                                                    product.current = {
                                                        ver,
                                                        pro: item,
                                                    };
                                                    priceRef.current.value =
                                                        ver.price + "";
                                                    setIsearching(false);
                                                }}
                                                className="cursor-pointer text-secondary-800 px-2 py-[0px] border border-secondary-800 hover:bg-secondary-800 active:!bg-secondary-600 hover:text-primary-700 transition-colors duration-500 rounded-3xl"
                                            >
                                                Choisir
                                            </button>
                                        </span>
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </Modal>
        </AntConfig>
    );
};

export default NewApprovisionnement;
