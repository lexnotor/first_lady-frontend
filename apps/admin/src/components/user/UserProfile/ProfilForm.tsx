"use client";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import useAuth from "@/hooks/useAuth";
import { updateUserPayload } from "@/redux/user";
import { updateUser } from "@/redux/user/user.slice";
import { message } from "antd";
import React, { FormEventHandler, useRef } from "react";

const ProfilForm = () => {
    const dispatch = useAppDispatch();
    const [toast, contextHold] = message.useMessage();

    const { account } = useAuth();
    const nameRef = useRef<HTMLInputElement>(null),
        emailRef = useRef<HTMLInputElement>(null),
        addressRef = useRef<HTMLTextAreaElement>(null);

    const changed = useRef<Record<string, boolean>>({});

    const submit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        const name = nameRef.current.value,
            email = emailRef.current.value,
            address = addressRef.current.value;

        const payload: updateUserPayload = {
            email: changed.current.email ? email : undefined,
            names: changed.current.names ? name : undefined,
            address: changed.current.address ? address : undefined,
        };

        dispatch(updateUser(payload)).then(({ payload }: any) => {
            if (!payload.id) {
                toast.error("Une erreur est suvenue, veillez réessayer");
            } else {
                toast.success("Profile mis à jour");
            }
        });
    };

    return (
        <article className="col-[1_/_span_2] flex grow flex-col gap-4 border p-4 rounded-xl border-primary-700">
            {contextHold}
            <h1 className="font-bold">Profile</h1>
            <form className="grid grid-cols-2 gap-5" onSubmit={submit}>
                <div className="flex flex-col gap-3">
                    <label htmlFor="">Noms</label>
                    <input
                        type="text"
                        required
                        className="bg-slate-800 py-3 px-3 rounded-lg"
                        placeholder="Votre nom"
                        defaultValue={account?.data?.names}
                        ref={nameRef}
                        onChange={() => (changed.current.names = true)}
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <label htmlFor="">Nom d'utilisateur</label>
                    <input
                        type="text"
                        disabled
                        className="bg-slate-800 py-3 px-3 rounded-lg cursor-not-allowed"
                        placeholder="Votre nom d'utilisateur"
                        defaultValue={account?.data?.username}
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <label htmlFor="">Email</label>
                    <input
                        type="email"
                        required
                        className="bg-slate-800 py-3 px-3 rounded-lg"
                        placeholder="Entrer votre email"
                        defaultValue={account?.data?.email}
                        ref={emailRef}
                        onChange={() => (changed.current.email = true)}
                    />
                </div>

                <div className="col-[1_/_span_2] flex flex-col gap-3">
                    <label htmlFor="">Adresse</label>

                    <textarea
                        className="bg-slate-800 py-3 px-3 rounded-lg resize-none"
                        rows={7}
                        placeholder="Entrez votre adresse"
                        defaultValue={account?.data?.address}
                        ref={addressRef}
                        onChange={() => (changed.current.address = true)}
                    ></textarea>
                </div>

                <div className="col-[1_/_span_2] flex justify-end">
                    <button className="px-6 py-1 border border-secondary-800 text-secondary-800 hover:bg-secondary-800 hover:text-primary-800 rounded-lg duration-500">
                        Mettre à jour
                    </button>
                </div>
            </form>
        </article>
    );
};

export default ProfilForm;
