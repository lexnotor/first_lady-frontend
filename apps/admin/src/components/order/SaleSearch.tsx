"use client";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { ApiResponse, ProductInfo } from "@/redux";
import { productUrl } from "@/redux/helper.api";
import { addLocalItem } from "@/redux/order/order.slice";
import Image from "next/image";
import React, { useRef, useState } from "react";

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
            <div className="w-full h-[calc(100%-2rem)] overflow-y-auto grid grid-cols-4 gap-3 [&>div]:border-none [&>div]:border-primary-200 [&>div]:rounded-none [&>div]:h-56">
                {result.map((item) =>
                    item.product_v.map((ver) => (
                        <div key={ver.id} className="flex flex-col justify-end">
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
