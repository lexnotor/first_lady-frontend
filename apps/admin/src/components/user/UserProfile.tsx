"use client";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import useAuth from "@/hooks/useAuth";
import useRoles from "@/hooks/useRoles";
import { updateUserPayload } from "@/redux/user";
import { updateUser } from "@/redux/user/user.slice";
import { message } from "antd";
import React, { useRef, useState } from "react";
import { BsCheckCircle } from "react-icons/bs";

const UserProfile = () => {
    const [toast, contextHold] = message.useMessage();
    const dispatch = useAppDispatch();
    const { account } = useAuth();
    const { myRoles, allRoles } = useRoles();

    const [isClear, setIsSclear] = useState(false);
    const oldSecretRef = useRef<HTMLInputElement>(null),
        newSecretRef = useRef<HTMLInputElement>(null),
        confSecretRef = useRef<HTMLInputElement>(null);

    const submitSecret: React.FormEventHandler = (e) => {
        e.preventDefault();
        const oldSecret = oldSecretRef.current.value,
            newSecret = newSecretRef.current.value,
            confSecret = confSecretRef.current.value;
        if (confSecret != newSecret)
            return toast.error("Les mots de passe ne correspondent pas");

        const payload: updateUserPayload = {
            secret: confSecret,
            oldSecret,
        };
        dispatch(updateUser(payload))
            .then(({ payload }: any) => {
                if (!payload.id) throw new Error("Mot de passe incorect");
                toast.success("Mot de passe mis à jour");
                oldSecretRef.current.value = "";
                newSecretRef.current.value = "";
                confSecretRef.current.value = "";
            })
            .catch((error) => {
                toast.error(error?.message);
            });
    };

    return (
        <div>
            {contextHold}
            <section className="flex gap-4 border p-4 rounded-xl border-primary-700">
                <div className="bg-primary-600 w-36 h-36 rounded-full"></div>
                <div className="flex flex-col justify-center gap-4">
                    <h2 className="flex gap-2 items-center">
                        <span className="italic">Nom: </span>
                        <span className="font-bold text-xl">
                            {account?.data?.names}
                        </span>
                    </h2>
                    <h2 className="flex gap-2 items-center">
                        <span className="italic">Username: </span>
                        <span className="font-bold text-xl">
                            @{account?.data?.username}
                        </span>
                    </h2>
                </div>
            </section>
            <section className="my-4 flex gap-4">
                <article className="flex flex-col gap-4 border p-4 rounded-xl border-primary-700">
                    <h1 className="font-bold">Roles et Permissions</h1>
                    <ul>
                        {allRoles.map((item) => {
                            return (
                                <li
                                    key={item.id}
                                    className="flex flex-col my-3"
                                >
                                    <h5 className="flex gap-2 items-center font-bold">
                                        <span
                                            className={`text-lg ${
                                                myRoles.find(
                                                    (myr) => myr.id == item.id
                                                )
                                                    ? "text-secondary-800"
                                                    : "text-secondary-600/20"
                                            }`}
                                        >
                                            <BsCheckCircle />
                                        </span>
                                        <span>{item.title}</span>
                                    </h5>
                                    <span className="pl-6">
                                        {item.description}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                </article>
                <article className="flex grow max-w-sm flex-col gap-4 border p-4 rounded-xl border-primary-700">
                    <h1 className="font-bold">Changer mot de passe</h1>
                    <form
                        onSubmit={submitSecret}
                        className="flex flex-col gap-5"
                    >
                        <div className="flex flex-col gap-3">
                            <label htmlFor="">Ancien mot de passe</label>
                            <input
                                type={`${isClear ? "text" : "password"}`}
                                required
                                className="bg-slate-800 py-3 px-3 rounded-lg"
                                ref={oldSecretRef}
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="">Nouveau mot de passe</label>
                            <input
                                type={`${isClear ? "text" : "password"}`}
                                required
                                minLength={6}
                                className="bg-slate-800 py-3 px-3 rounded-lg"
                                ref={newSecretRef}
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="">Confirmer mot de passe</label>
                            <input
                                type={`${isClear ? "text" : "password"}`}
                                required
                                minLength={6}
                                className="bg-slate-800 py-3 px-3 rounded-lg"
                                ref={confSecretRef}
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="show_secret"
                                onChange={(e) => setIsSclear(e.target.checked)}
                            />
                            <label htmlFor="show_secret">
                                Montrer mot de passe
                            </label>
                        </div>
                        <div className="flex justify-end">
                            <button className="px-6 py-1 border border-secondary-800 text-secondary-800 hover:bg-secondary-800 hover:text-primary-800 rounded-lg duration-500">
                                Changer
                            </button>
                        </div>
                    </form>
                </article>
                <article className="flex grow max-w-sm flex-col gap-4 border p-4 rounded-xl border-primary-700">
                    <h1 className="font-bold">Profile</h1>
                </article>
            </section>
        </div>
    );
};

export default UserProfile;
