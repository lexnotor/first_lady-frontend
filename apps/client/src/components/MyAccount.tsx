"use client";
import logo from "@/assets/logo_sm.png";
import no_image from "@/assets/no_user.png";
import { userUrl } from "@/redux/helper.api";
import { ApiResponse, UserInfo } from "@/types";
import axios, { AxiosResponse } from "axios";
import Image from "next/image";
import {
    FormEventHandler,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import LoginForm from "./myAccount/LoginForm";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BiEdit } from "react-icons/bi";
import Link from "next/link";
import { message } from "antd";

const MyAccount = () => {
    const [token, setToken] = useState<string>(null);
    const [data, setData] = useState<UserInfo>();
    const [searchParams, router, pathname] = [
        useSearchParams(),
        useRouter(),
        usePathname(),
    ];

    const [signStatus, setSigninStatus] = useState("LOOKING");
    const getMyAccount = useCallback((token: string) => {
        axios
            .get(userUrl.getMe, {
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
        getMyAccount(token);
    }, [getMyAccount, token]);
    const emailRef = useRef<HTMLInputElement>(null),
        namesRef = useRef<HTMLInputElement>(null),
        adressRef = useRef<HTMLInputElement>(null);

    if (signStatus == "LOOKING")
        return (
            <div className="w-full h-[80vh] flex flex-col justify-center items-center text-neutral-400 italic">
                <span className="h-20 w-20 border-2 border-transparent border-t-black rounded-full animate-spin" />
            </div>
        );

    if (signStatus == "DISCONNECTED") return <LoginForm />;

    const submitChange: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        axios
            .put(
                userUrl.getMe,
                {
                    email: emailRef.current.value || undefined,
                    names: namesRef.current.value || undefined,
                    address: adressRef.current.value || undefined,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((res: AxiosResponse<ApiResponse<UserInfo>>) => res.data.data)
            .then((res) => {
                setData(res ?? null);
                message.success("Profile mis à jour");
                router.push(pathname);
            })
            .catch(() => {
                message.error("Veillez saisir des imformations correctes");
            });
    };

    return (
        <div>
            <h1 className="flex gap-2 items-center p-2 bg-white shadow-lg">
                <Image
                    src={logo}
                    alt="Première Dame"
                    width={400}
                    height={400}
                    className="mx-a w-[3rem] object-contain"
                />
                <span className="text-xl font-bold">Mon profil</span>
                <button className="ml-auto py-2 px-4 rounded-lg border border-red-600 text-red-600">
                    Déconnexion
                </button>
            </h1>
            <header className="flex flex-col justify-center mt-4 gap-2 items-center">
                <Image
                    src={no_image}
                    alt="Profile"
                    width={500}
                    height={500}
                    className="w-32 aspect-square rounded-full border-8 border-slate-400/30"
                />
                <p className="text-2xl font-bold">{data?.names}</p>
                <p className="text-neutral-400 italic">@{data?.username}</p>
            </header>
            <section className="px-4 mt-6 flex flex-col gap-6">
                <div>
                    <p className="text-base mb-2 flex gap-3 items-center">
                        <span>Noms</span>
                        <Link href="?editing=true">
                            <BiEdit />
                        </Link>
                    </p>
                    <input
                        disabled={!searchParams.get("editing")}
                        type="text"
                        className="border rounded-lg border-neutral-300 w-full py-3 px-4"
                        defaultValue={data?.names}
                        placeholder="Non définie"
                        ref={namesRef}
                    />
                </div>
                <div>
                    <p className="text-base mb-2 flex gap-3 items-center">
                        <span>Email</span>
                        <Link href="?editing=true">
                            <BiEdit />
                        </Link>
                    </p>
                    <input
                        disabled={!searchParams.get("editing")}
                        type="email"
                        className="border rounded-lg border-neutral-300 w-full py-3 px-4"
                        defaultValue={data?.email}
                        placeholder="Non définie"
                        ref={emailRef}
                    />
                </div>
                <div>
                    <p className="text-base mb-2 flex gap-3 items-center">
                        <span>Adresse de livraison</span>
                        <Link href="?editing=true">
                            <BiEdit />
                        </Link>
                    </p>
                    <input
                        disabled={!searchParams.get("editing")}
                        type="text"
                        className="border rounded-lg border-neutral-300 w-full py-3 px-4"
                        defaultValue={data?.address}
                        placeholder="Non définie"
                        ref={adressRef}
                    />
                </div>
            </section>
            {!!searchParams.get("editing") && (
                <form
                    onSubmit={submitChange}
                    className="px-4 flex gap-4 items-center mt-8"
                >
                    <Link
                        href="?"
                        className="text-center basis-1/2 py-2 px-4 rounded-lg border"
                    >
                        Annuler
                    </Link>
                    <button className="basis-1/2 py-2 px-4 rounded-lg border border-red-600 bg-red-600 text-white">
                        Enregistrer
                    </button>
                </form>
            )}
        </div>
    );
};

export default MyAccount;
