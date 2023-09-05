"use client";
import { ApiResponse, ProductInfo } from "@/redux";
import { productUrl } from "@/redux/helper.api";
import { Modal } from "antd";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { Button } from "ui";
import { useSupplyingContext } from "./context/SupplyingContext";

const NewApprovisionnement = () => {
    const { price, product, quantity } = useSupplyingContext();

    const [isearching, setIsearching] = useState(false);

    const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        return null;
    };

    return (
        <>
            <form onSubmit={submit}>
                <div className="table-form w-full">
                    <div className="input-group">
                        <label htmlFor="title" className="input-label">
                            Produit
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
                            <Button onClick={() => setIsearching(true)}>
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
                                onChange={(e) =>
                                    (quantity.current = +e.target.value ?? 0)
                                }
                            />
                        </div>
                    </div>
                    <div className="input-group">
                        <label htmlFor="quantity" className="input-label">
                            Prix
                        </label>
                        <div className="input-content">
                            <input
                                type="number"
                                min={0}
                                id="quantity"
                                defaultValue={0}
                                placeholder="0"
                                onChange={(e) =>
                                    (price.current = +e.target.value ?? 0)
                                }
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

    const { product } = useSupplyingContext();
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
        <Modal
            closable
            footer={false}
            onCancel={() => setIsearching(false)}
            open={isearching}
        >
            <div className="w-full max-h-full flex flex-col gap-4">
                {/* search bar */}
                <form
                    className="w-96 flex gap-4 sticky top-0 pt-4"
                    onSubmit={search}
                >
                    <label className="bg-white text-black border rounded-2xl grow">
                        <input
                            type="text"
                            className="py-2 px-4 bg-transparent w-full"
                            placeholder="Produit ..."
                            ref={inputRef}
                        />
                    </label>
                    <button className="cursor-pointer px-4 py-1 text-primary-700 border border-primary-700 hover:bg-secondary-800 active:!bg-secondary-600 hover:text-black transition-colors duration-500 rounded-3xl">
                        Search
                    </button>
                </form>

                {/* search result */}
                <div className="w-full h-[calc(100%-2rem)] overflow-y-auto grid grid-cols-4 gap-3 [&>div]:border-none [&>div]:border-primary-200 [&>div]:rounded-none [&>div]:h-56">
                    {result.map((item) =>
                        item.product_v.map((ver) => (
                            <div
                                key={ver.id}
                                className="flex flex-col justify-end"
                            >
                                <Image
                                    alt="pagne"
                                    src={
                                        "https://cdn.pixabay.com/photo/2023/08/05/18/12/dahlia-8171538_960_720.jpg"
                                    }
                                    width={200}
                                    height={200}
                                    className="aspect-square"
                                />
                                <p>{item.title}</p>
                                <p>{ver.title}</p>
                                <p className="flex justify-between items-center">
                                    <span>{ver.price} $</span>
                                    <span>
                                        <button
                                            onClick={() => {
                                                product.current = {
                                                    ver,
                                                    pro: item,
                                                };
                                                setIsearching(false);
                                            }}
                                            className="cursor-pointer text-primary-700 px-2 py-[0px] border border-primary-700 hover:bg-secondary-800 active:!bg-secondary-600 hover:text-black transition-colors duration-500 rounded-3xl"
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
    );
};

export default NewApprovisionnement;
