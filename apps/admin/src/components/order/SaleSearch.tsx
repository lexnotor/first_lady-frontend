"use client";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { ApiResponse, ProductInfo } from "@/redux";
import { productUrl } from "@/redux/helper.api";
import { addLocalItem } from "@/redux/order/order.slice";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { BsImage } from "react-icons/bs";

const SaleSearch = () => {
    const dispatch = useAppDispatch();
    const [result, setResult] = useState<ProductInfo[]>([]);
    const controller = useRef<AbortController>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        controller.current?.abort();
        controller.current = new AbortController();
        fetch(`${productUrl.findProduct}?text=${inputRef.current.value}`)
            .then((res) => res.json())
            .then((res: ApiResponse<ProductInfo[]>) =>
                setResult(res.data ?? [])
            )
            .catch(() => setResult([]));
    };

    return (
        <div className="w-full max-h-full flex flex-col gap-4">
            {/* search bar */}
            <form
                className="w-96 flex gap-4 sticky top-0 pt-4"
                onSubmit={submit}
            >
                <label className="bg-primary-600 rounded-2xl grow">
                    <input
                        type="text"
                        className="py-2 px-4 bg-transparent w-full"
                        placeholder="Produit ..."
                        ref={inputRef}
                    />
                </label>
                <button className="cursor-pointer px-4 py-1 text-secondary-800 border border-secondary-800 hover:bg-secondary-800 active:!bg-secondary-600 hover:text-black transition-colors duration-500 rounded-3xl">
                    Submit
                </button>
            </form>

            {/* search result */}
            <div className="w-full h-[calc(100%-2rem)] overflow-y-auto grid grid-cols-4 gap-4 pt-2 px-2 pb-4">
                {result.map((item) =>
                    item.product_v.map((ver) => (
                        <div
                            key={ver.id}
                            className="flex flex-col justify-end shadow-md shadow-primary-900 p-1 rounded-lg"
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
                            <p className="text-[85%] pt-2">{item.title}</p>
                            <p className="text-[85%]">{ver.title}</p>
                            <p className="flex justify-between items-center">
                                <span>{ver.price} $</span>
                                <span>
                                    <button
                                        onClick={() =>
                                            dispatch(
                                                addLocalItem({
                                                    p: item,
                                                    p_v: ver,
                                                })
                                            )
                                        }
                                        className="cursor-pointer text-xl px-2 py-[0px] text-secondary-800 border border-secondary-800 hover:bg-secondary-800 active:!bg-secondary-600 hover:text-black transition-colors duration-500 rounded-3xl"
                                    >
                                        +
                                    </button>
                                </span>
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default SaleSearch;
