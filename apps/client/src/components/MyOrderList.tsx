"use client";
import { orderUrl } from "@/redux/helper.api";
import type { ApiResponse, OrderInfo } from "@/types";
import axios, { AxiosResponse } from "axios";
import React, { useCallback, useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import Link from "next/link";

const MyOrderList = () => {
    const [token, setToken] = useState<string>(null);
    const [data, setData] = useState<OrderInfo[]>([]);
    const [signStatus, setSigninStatus] = useState("LOOKING");
    const getMyOrders = useCallback((token: string) => {
        axios
            .get(orderUrl.getMine, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(
                (res: AxiosResponse<ApiResponse<OrderInfo[]>>) => res.data.data
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
            const t = localStorage.getItem("user_token");
            setToken(t);
            if (t) setSigninStatus("CONNECTED");
            else setSigninStatus("DISCONNECTED");
            const isLoaded = !!t;
            !isLoaded && setTimeout(loadToken, 3000);
        };

        loadToken();
    }, []);

    useEffect(() => {
        getMyOrders(token);
    }, [getMyOrders, token]);

    if (signStatus == "LOOKING")
        return (
            <div className="w-full h-[80vh] flex flex-col justify-center items-center text-neutral-400 italic">
                <span className="h-20 w-20 border-2 border-transparent border-t-black rounded-full animate-spin" />
            </div>
        );

    if (signStatus == "DISCONNECTED")
        return (
            <div className="w-full h-[80vh] flex flex-col justify-center items-center text-neutral-400">
                <p>Veuillez vous connecter pour voir</p>
                <p>vos commandes</p>
                <Link
                    className="py-2 px-4 rounded-r-full rounded-l-full bg-transparent border-black border text-black mt-8"
                    href={"/account?redirect=order"}
                >
                    Se connecter
                </Link>
                <Link
                    className="py-2 px-4  underline text-[85%] text-neutral-800 mt-0"
                    href={"/account/register?redirect=order"}
                >
                    Créer un compte
                </Link>
            </div>
        );

    if (!data.length)
        return (
            <div className="w-full h-[80vh] flex flex-col justify-center items-center">
                <p>Aucune Commande pour le moment</p>
                <p>Veuillez rafaichir si vou</p>
            </div>
        );

    return (
        <div>
            <ul className="flex flex-col gap-5">
                {data?.map((order) => {
                    return (
                        <li key={order.id} className="shadow-lg">
                            <OrderCard order={order} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default MyOrderList;
