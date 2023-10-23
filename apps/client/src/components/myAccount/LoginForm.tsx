"use client";
import logo from "@/assets/logo.png";
import { authUrl } from "@/redux/helper.api";
import { ApiResponse } from "@/types";
import { message } from "antd";
import axios, { AxiosResponse } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEventHandler, useRef, useState } from "react";

const LoginForm = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const usernameRef = useRef<HTMLInputElement>(null);
    const pswRef = useRef<HTMLInputElement>(null);

    const submit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const payload = {
            username: usernameRef.current.value.trim(),
            psw: pswRef.current.value.trim(),
        };
        if (!payload.username || !payload.psw)
            return messageApi.error("Tous les champs sont obligatoires");

        setIsLoading(true);
        axios
            .post(
                authUrl.login,
                {},
                { auth: { username: payload.username, password: payload.psw } }
            )
            .then((res: AxiosResponse<ApiResponse<string>>) => res.data.data)
            .then((token) => localStorage.setItem("user_token", token))
            .then(() => messageApi.success("Vous êtes connecté"))
            .then(() => setTimeout(() => router.refresh(), 200))
            .then(() => setIsLoading(false))
            .catch((error) => {
                setIsLoading(false);
                messageApi.error(error?.message);
            });
    };

    return (
        <form
            onSubmit={submit}
            className="p-4 flex flex-col justify-center h-full"
        >
            {contextHolder}
            <h1 className="flex gap-2 justify-between items-center p-2 bg-white">
                <Image
                    src={logo}
                    alt="Première Dame"
                    width={400}
                    height={400}
                    className="w-fit h-[3rem] object-contain"
                />
            </h1>
            <h1 className="text-4xl font-bold mb-1 mt-2">Connexion</h1>
            <p className="mb-5 text-neutral-500 italic text-[85%]">
                Profiter des meilleurs ventes du moment chez First-Lady
            </p>
            <div className="flex flex-col gap-2 py-3">
                <label htmlFor="email" className="">
                    Votre nom d'utilisateur :
                </label>
                <input
                    type="text"
                    id="username"
                    placeholder="Ex: akaza34"
                    ref={usernameRef}
                    className="border border-black rounded-r-full rounded-l-full py-3 px-6"
                />
            </div>
            <div className="flex flex-col gap-2 py-3">
                <label htmlFor="pwd" className="">
                    Mot de passe :
                </label>
                <input
                    type="password"
                    id="pwd"
                    placeholder="******"
                    ref={pswRef}
                    className="border border-black rounded-r-full rounded-l-full py-3 px-6"
                />
            </div>
            <div className="flex flex-col gap-4 py-4">
                <button className="border bg-red-600 text-white rounded-r-full rounded-l-full py-3">
                    {isLoading && (
                        <span className="h-4 w-4 aspect-square rounded-full border-2 border-transparent border-t-white animate-spin" />
                    )}
                    <span>Se connecter</span>
                </button>
                <div className="flex items-center gap-2 px-2">
                    <hr className="grow border" />
                    <span>ou</span>
                    <hr className="grow border" />
                </div>
                <p className="self-center text-[85%] text-neutral-600">
                    <span>Pas encore de compte ? </span>
                    <Link
                        className="underline text-red-600"
                        href={"/account/register"}
                    >
                        Créer un compte
                    </Link>
                </p>
            </div>
        </form>
    );
};

export default LoginForm;
