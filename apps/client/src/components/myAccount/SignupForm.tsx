"use client";
import { authUrl } from "@/redux/helper.api";
import axios from "axios";
import Link from "next/link";
import React, { FormEventHandler, useRef, useState } from "react";
import { message } from "antd";
import { useRouter } from "next/navigation";

const SignupForm = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const nameRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const pswRef = useRef<HTMLInputElement>(null);
    const cpswRef = useRef<HTMLInputElement>(null);

    const submit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const payload = {
            name: nameRef.current.value.trim(),
            username: usernameRef.current.value.trim(),
            psw: pswRef.current.value.trim(),
            cpsw: cpswRef.current.value.trim(),
        };
        if (payload.cpsw != payload.cpsw)
            return messageApi.error("Les mots de passe ne correspondent pas");
        if (!payload.name || !payload.username || !payload.psw)
            return messageApi.error("Tous les champs sont obligatoires");

        setIsLoading(true);
        axios
            .post(
                authUrl.signup,
                { names: payload.name },
                { auth: { username: payload.username, password: payload.psw } }
            )
            .then(() => messageApi.success("Votre compte a été créer"))
            .then(() => setTimeout(() => router.push("/account"), 300))
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
            <h1 className="text-4xl font-bold mb-1 mt-2">Inscription</h1>
            <p className="mb-5 text-neutral-500 italic text-[85%]">
                Devenez membre de First Lady et profitez des reductions à chaque
                promotion
            </p>
            <div className="flex flex-col gap-2 py-3">
                <label htmlFor="email" className="">
                    Votre nom * :
                </label>
                <input
                    type="text"
                    id="names"
                    minLength={3}
                    placeholder="Akaza Shuna"
                    ref={nameRef}
                    className="border border-black rounded-r-full rounded-l-full py-3 px-6"
                />
            </div>
            <div className="flex flex-col gap-2 py-3">
                <label htmlFor="email" className="">
                    Choisir un nom d'utilisateur * :
                </label>
                <input
                    type="text"
                    id="username"
                    minLength={6}
                    placeholder="lettres et chiffres. mininum 6 caractère"
                    ref={usernameRef}
                    className="border border-black rounded-r-full rounded-l-full py-3 px-6"
                />
            </div>
            <div className="flex flex-col gap-2 py-3">
                <label htmlFor="psw" className="">
                    Mot de passe * :
                </label>
                <input
                    type="password"
                    id="psw"
                    placeholder="Au moins 6 caractères"
                    ref={pswRef}
                    minLength={6}
                    className="border border-black rounded-r-full rounded-l-full py-3 px-6"
                />
            </div>
            <div className="flex flex-col gap-2 py-3">
                <label htmlFor="psw" className="">
                    Confirmer * :
                </label>
                <input
                    type="password"
                    id="cpsw"
                    placeholder="Confirmer le mot de passe"
                    ref={cpswRef}
                    minLength={6}
                    className="border border-black rounded-r-full rounded-l-full py-3 px-6"
                />
            </div>
            <div className="flex flex-col gap-4 py-4">
                <button className="border bg-red-600 text-white rounded-r-full rounded-l-full py-3 flex justify-center gap-2">
                    {isLoading && (
                        <span className="h-4 w-4 aspect-square rounded-full border-2 border-transparent border-t-white animate-spin" />
                    )}
                    <span>S'inscrire</span>
                </button>
                <div className="flex items-center gap-2 px-2">
                    <hr className="grow border" />
                    <span>ou</span>
                    <hr className="grow border" />
                </div>
                <p className="self-center text-[85%] text-neutral-600">
                    <span>Déjà membre ? </span>
                    <Link className="underline text-red-600" href={"/account"}>
                        Connectez-vous ici
                    </Link>
                </p>
            </div>
        </form>
    );
};

export default SignupForm;
