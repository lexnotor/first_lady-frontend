"use client";
import no_image from "@/assets/no_image.png";
import { cartUrl } from "@/redux/helper.api";
import { ApiResponse, UserInfo } from "@/types";
import axios, { AxiosResponse } from "axios";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import LoginForm from "./LoginForm";

const MyAccount = () => {
    const [token, setToken] = useState<string>(null);
    const [data, setData] = useState<UserInfo>();
    const [signStatus, setSigninStatus] = useState("LOOKING");
    const getMyCart = useCallback((token: string) => {
        axios
            .get(cartUrl.getMyCart, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res: AxiosResponse<ApiResponse<UserInfo>>) => res.data.data)
            .then((res) => {
                setData(res ?? null);
            })
            .catch(() => {
                setData(null);
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

    if (signStatus == "DISCONNECTED") return <LoginForm />;

    return (
        <div>
            <h1 className="text-xl font-bold p-4 bg-white shadow-lg">
                Mon profil
            </h1>
            <header className="flex gap-3 items-center">
                <Image
                    src={no_image}
                    alt="Profile"
                    width={500}
                    height={500}
                    className="w-40 aspect-square rounded-full border-2 border-black"
                />
                <p>{data?.names} </p>
            </header>
            <section>
                <div>
                    <span>Adresse</span>
                    {data?.address ? (
                        <span>{data?.address} </span>
                    ) : (
                        <span>{<BiSolidEdit />}</span>
                    )}
                </div>
            </section>
            <footer></footer>
        </div>
    );
};

export default MyAccount;
