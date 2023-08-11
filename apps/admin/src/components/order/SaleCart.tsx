"use client";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useLocatCart } from "@/hooks/useLocalCart";
import {
    emptyCart,
    saveLocalOrder,
    setItemQty,
} from "@/redux/order/order.slice";
import Image from "next/image";
import React from "react";

const SaleCart = () => {
    const { local_cart } = useLocatCart();
    const dispatch = useAppDispatch();

    const submit = async () => {
        if (local_cart.length == 0) return alert("Please add Items in Cart");

        const payload = local_cart.map((item) => ({
            id: item.product_v_id,
            qty: item.quantity,
        }));

        await dispatch(saveLocalOrder(payload));
        alert("SALE_SAVED");
    };

    return (
        <div className="w-full h-full flex flex-col">
            <h2 className="flex justify-between">
                <span>Panier</span>
                <span className="font-bold text-secondary-800">
                    Total:{" "}
                    {local_cart?.reduce(
                        (prev, cur) =>
                            prev + cur.quantity * cur.product_v.price,
                        0
                    )}{" "}
                    USD
                </span>
            </h2>
            <div className="h-[calc(100%-1.5rem-1.5rem)] overflow-y-auto flex flex-col gap-4 mt-4">
                {local_cart.length == 0 ? (
                    <span>Pas de produit</span>
                ) : (
                    local_cart.map((item) => (
                        <div className="flex gap-4" key={item.product_v_id}>
                            <Image
                                alt="pagne"
                                src={
                                    "https://cdn.pixabay.com/photo/2023/08/05/18/12/dahlia-8171538_960_720.jpg"
                                }
                                width={200}
                                height={200}
                                className="aspect-square w-6 rounded"
                            />
                            <p>
                                {item.product.title} ({item.product_v.title} -{" "}
                                {item.product_v.price} $)
                            </p>
                            <p className="ml-auto flex gap-2">
                                <button
                                    onClick={() =>
                                        dispatch(
                                            setItemQty({
                                                id: item.product_v_id,
                                                quantity: item.quantity - 1,
                                            })
                                        )
                                    }
                                    className="cursor-pointer text-sm px-2 py-[0px] text-secondary-800 border border-secondary-800 hover:bg-secondary-800 active:!bg-secondary-600 hover:text-black transition-colors duration-500 rounded-3xl"
                                >
                                    -
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                    onClick={() =>
                                        dispatch(
                                            setItemQty({
                                                id: item.product_v_id,
                                                quantity: item.quantity + 1,
                                            })
                                        )
                                    }
                                    className="cursor-pointer text-sm px-2 py-[0px] text-secondary-800 border border-secondary-800 hover:bg-secondary-800 active:!bg-secondary-600 hover:text-black transition-colors duration-500 rounded-3xl"
                                >
                                    +
                                </button>
                            </p>
                        </div>
                    ))
                )}
            </div>
            <footer className="shrink-0 flex gap-4">
                <button
                    onClick={() => dispatch(emptyCart())}
                    className="cursor-pointer w-[50%] px-4 py-1 text-secondary-800 border border-secondary-800 hover:bg-secondary-800 active:!bg-secondary-600 hover:text-black transition-colors duration-500 rounded-3xl"
                >
                    Vider
                </button>
                <button
                    onClick={submit}
                    className="cursor-pointer w-[50%] px-4 py-1 text-secondary-800 border border-secondary-800 hover:bg-secondary-800 active:!bg-secondary-600 hover:text-black transition-colors duration-500 rounded-3xl"
                >
                    Save
                </button>
            </footer>
        </div>
    );
};

export default SaleCart;
