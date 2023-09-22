"use client";
import { cartUrl } from "@/redux/helper.api";
import type { ApiResponse, CartProductInfo } from "@/types";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import CartItem from "./CartItem";

const MyCart = () => {
    const [token, setToken] = useState<string>(null);
    const [data, setData] = useState<CartProductInfo[]>([]);
    const [signStatus, setSigninStatus] = useState("LOOKING");
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

    return (
        <div>
            <ul className="flex flex-col gap-4">
                {data?.map((item) => {
                    return (
                        <li key={item.id}>
                            <CartItem item={item} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default MyCart;
