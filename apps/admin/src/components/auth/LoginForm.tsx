"use client";
import useToggle from "@/hooks/toggle";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import useAuth from "@/hooks/useAuth";
import useShop from "@/hooks/useShop";
import { loginUser } from "@/redux/user/user.slice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEventHandler, useEffect, useRef } from "react";
import Checkbox from "ui/Checkbox";

const LoginForm = () => {
    const dispatch = useAppDispatch();

    const { shops } = useShop();
    // Form data
    const [longSession, toggleLongSession] = useToggle(true);

    const shopRef = useRef<HTMLSelectElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const secretRef = useRef<HTMLInputElement>(null);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        const [email, secret, shopId] = [
            emailRef.current.value,
            secretRef.current.value,
            shopRef.current.value,
        ];

        const payload = {
            username: email,
            secret,
            shopId,
        };

        dispatch(loginUser(payload));
    };

    // Account Verification
    const { account, isPendindLogin } = useAuth();
    const router = useRouter();
    useEffect(() => {
        if (account.token) router.push("/");
    });

    return (
        <form className="flex flex-col gap-6" onSubmit={submit}>
            <div className="flex gap-4">
                <select
                    className="py-2 px-4 w-full border border-neutral-400 rounded-lg focus:outline-none bg-white"
                    placeholder="Choisir votre boutique"
                    ref={shopRef}
                >
                    {shops.map((shop) => (
                        <option key={shop.id} value={shop.id}>
                            {shop.title}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex gap-4">
                <input
                    type="text"
                    placeholder="Votre email"
                    className="py-2 px-4 w-full border border-neutral-400 rounded-lg focus:outline-none"
                    ref={emailRef}
                />
            </div>
            <div className="flex gap-4">
                <input
                    type="password"
                    placeholder="Mot de passe"
                    className="py-2 px-4 w-full border border-neutral-400 rounded-lg focus:outline-none"
                    ref={secretRef}
                />
            </div>
            <div className="flex gap-4">
                <label
                    htmlFor="long_session"
                    className="flex items-center gap-2 cursor-pointer"
                >
                    <Checkbox
                        toggler={() => toggleLongSession()}
                        isChecked={longSession}
                        id="long_session"
                    />
                    <span>Rester connecter</span>
                </label>
            </div>
            <div className="flex gap-4 flex-col">
                <button
                    className="block py-2 px-4 text-center rounded-lg border bg-neutral-700 text-white font-semibold w-full"
                    disabled={isPendindLogin}
                >
                    {isPendindLogin ? (
                        <span
                            hidden={isPendindLogin}
                            className="w-4 h-4 inline-block animate-spin border border-transparent border-t-neutral-200 rounded-full"
                        />
                    ) : (
                        <span>Se connecter</span>
                    )}
                </button>
                <Link href={"/signup"} className="block text-center underline">
                    Je n'ai pas encore de compte
                </Link>
            </div>
        </form>
    );
};

export default LoginForm;
