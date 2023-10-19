"use client";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import useRoles from "@/hooks/useRoles";
import { RoleInfo } from "@/redux";
import { CreateUserPayload } from "@/redux/user";
import { assignRole, createUser } from "@/redux/user/user.slice";
import { Drawer, message } from "antd";
import { useSearchParams } from "next/navigation";
import React, { useRef, useState } from "react";
import { AntConfig } from "ui";

const NewUser = () => {
    const [toast, contextHold] = message.useMessage();
    const dispatch = useAppDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const namesRef = useRef<HTMLInputElement>(null),
        usernameRef = useRef<HTMLInputElement>(null),
        secretRef = useRef<HTMLInputElement>(null),
        rolesRef = useRef<RoleInfo[]>([]);

    const [searchParams] = [useSearchParams()];

    const { allRoles } = useRoles();

    const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const names = namesRef.current.value,
            username = usernameRef.current.value,
            secret = secretRef.current.value,
            roles = rolesRef.current;

        const payload: CreateUserPayload = {
            names,
            username,
            secret,
        };

        dispatch(createUser(payload))
            .then(({ payload }: any) => {
                if (!payload.id) throw new Error("INVALID INPUT");
                toast.success("Utilisateur créé");
                return dispatch(
                    assignRole({
                        user_id: payload.id,
                        roles: roles.map((item) => item.id),
                    })
                );
            })
            .then(({ payload }: any) => {
                if (!Array.isArray(payload)) throw new Error("ROLE_ERROR");
                toast.success("Roles specifier");
                setIsOpen(false);
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    const toggleRole = (role: RoleInfo) => {
        const index = rolesRef.current.findIndex((item) => item.id == role.id);
        index == -1
            ? rolesRef.current.push(role)
            : rolesRef.current.splice(index, 1);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                style={{
                    display:
                        searchParams.get("type") == "STAFF"
                            ? "inline-block"
                            : "none",
                }}
                className="ml-auto cursor-pointer px-4 py-1 text-secondary-800 border border-secondary-800 hover:bg-secondary-800  hover:text-black transition-colors duration-500 rounded-lg"
            >
                Nouvel utilisateur
            </button>
            {contextHold}

            <AntConfig>
                <Drawer
                    onClose={() => setIsOpen(false)}
                    open={isOpen}
                    title="Nouvel utilisateur"
                    destroyOnClose
                >
                    <form
                        onSubmit={submit}
                        className="flex flex-col h-full overflow-y-auto pr-2"
                    >
                        <div className="flex flex-col gap-2 mb-4">
                            <label className="">Noms</label>
                            <input
                                type="text"
                                required
                                minLength={6}
                                ref={namesRef}
                                className="bg-slate-800 py-2 px-3 rounded-lg"
                            />
                        </div>
                        <div className="flex flex-col gap-2 mb-4">
                            <label className="">Nom d'utilisateur</label>
                            <input
                                type="text"
                                required
                                minLength={6}
                                ref={usernameRef}
                                className="bg-slate-800 py-2 px-3 rounded-lg"
                            />
                        </div>
                        <div className="flex flex-col gap-2 mb-4">
                            <label className="">Mot de passe</label>
                            <input
                                type="text"
                                required
                                minLength={6}
                                ref={secretRef}
                                className="bg-slate-800 py-2 px-3 rounded-lg"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            {allRoles.map((item) => (
                                <label className="flex gap-2" key={item.id}>
                                    <input
                                        type="checkbox"
                                        name={item.id}
                                        id={item.id}
                                        onChange={() => {
                                            toggleRole(item);
                                        }}
                                    />
                                    <span>{item.title}</span>
                                </label>
                            ))}
                        </div>
                        <div className="flex gap-2 pt-4">
                            <button
                                onClick={() => setIsOpen(false)}
                                type="button"
                                className="basis-1/2 px-4 py-1 border border-secondary-800 text-secondary-800 hover:bg-secondary-800 hover:text-primary-800 rounded-lg duration-500"
                            >
                                Annuler
                            </button>
                            <button className="basis-1/2 px-4 py-1 border border-secondary-800 text-secondary-800 hover:bg-secondary-800 hover:text-primary-800 rounded-lg duration-500">
                                Enregistrer
                            </button>
                        </div>
                    </form>
                </Drawer>
            </AntConfig>
        </>
    );
};

export default NewUser;
