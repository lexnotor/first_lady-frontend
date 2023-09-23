"use client";
import { cartUrl, paymentUrl } from "@/redux/helper.api";
import type { ApiResponse, CartProductInfo } from "@/types";
import { message } from "antd";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import { useCallback, useEffect, useReducer, useState } from "react";
import { BiCheck, BiCreditCard } from "react-icons/bi";
import CartItem from "./CartItem";

const MyCart = () => {
    const [token, setToken] = useState<string>(null);
    const [data, setData] = useState<CartProductInfo[]>([]);
    const [signStatus, setSigninStatus] = useState("LOOKING");
    const [selected, toggleSelected] = useReducer(
        (state: string[], payload: string) => {
            const index = state.indexOf(payload);
            if (index == -1) return [payload, ...state];
            else return [...state.slice(0, index), ...state.slice(index + 1)];
        },
        []
    );

    const getMyCart = useCallback((token: string) => {
        axios
            .get(cartUrl.getMyCart, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(
                (res: AxiosResponse<ApiResponse<CartProductInfo[]>>) =>
                    res.data.data
            )
            .then((res) => {
                setData(res ?? []);
            })
            .catch(() => {
                setData([]);
            });
    }, []);

    useEffect(() => {
        const loadToken = () => {
            const token = localStorage.getItem("user_token");
            setToken(token);

            if (token) setSigninStatus("CONNECTED");
            else setSigninStatus("DISCONNECTED");

            !token && setTimeout(loadToken, 3000);
        };

        loadToken();
    }, []);

    useEffect(() => {
        getMyCart(token);
    }, [getMyCart, token]);

    if (signStatus == "LOOKING")
        return (
            <div className="w-full h-[80vh] flex flex-col justify-center items-center text-neutral-400 italic">
                <span className="h-20 w-20 border-2 border-transparent border-t-black rounded-full animate-spin" />
            </div>
        );

    if (signStatus == "DISCONNECTED")
        return (
            <div className="w-full h-[80vh] flex flex-col justify-center items-center text-neutral-400">
                <p>Veuillez vous connecter pour accéder</p>
                <p>à votre pagnier </p>
                <Link
                    className="py-2 px-4 rounded-r-full rounded-l-full bg-transparent border-black border text-black mt-8"
                    href={"/login?redirect=order"}
                >
                    Se connecter
                </Link>
                <Link
                    className="py-2 px-4  underline text-[85%] text-neutral-800 mt-0"
                    href={"/signup?redirect=order"}
                >
                    Créer un compte
                </Link>
            </div>
        );

    if (!data.length)
        return (
            <div className="w-full h-[80vh] flex flex-col justify-center items-center">
                <p>Aucune produit pour le moment</p>
            </div>
        );
    const beginPaiement = () => {
        axios
            .post(
                paymentUrl.requestPayement,
                { card_product_id: selected, shop_id: data[0]?.shop?.id },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then((res: AxiosResponse<string>) => res.data)
            .then((res) => (window.location.href = res))
            .catch(() => message.error("Erreur Réseau"));
    };

    return (
        <div>
            {selected.length > 0 && (
                <div className="px-4 py-2 flex justify-between gap-3 items-center">
                    <span className="text-3xl ">
                        <BiCreditCard />
                    </span>
                    <button
                        onClick={beginPaiement}
                        className="py-1 px-4 rounded-lg bg-red-600 text-white"
                    >
                        Payer ({selected.length})
                    </button>
                </div>
            )}
            <ul className="flex flex-col gap-4 p-4">
                {data?.map((item) => {
                    return (
                        <li
                            key={item.id}
                            className="flex gap-2"
                            onClick={() => toggleSelected(item?.id)}
                        >
                            <div className="w-5 flex">
                                {selected.includes(item?.id) ? (
                                    <span className="self-center relative text-2xl text-red-600 w-full aspect-square  border border-red-600 rounded-full">
                                        <BiCheck className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                    </span>
                                ) : (
                                    <span className="self-center w-full aspect-square  border border-neutral-700 rounded-full" />
                                )}
                            </div>
                            <div className="grow">
                                <CartItem item={item} />
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default MyCart;
