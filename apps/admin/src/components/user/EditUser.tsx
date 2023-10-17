"use client";
import { Drawer } from "antd";
import React from "react";
import { AntConfig } from "ui";
import { useUserEditingContext } from "./contexts/EditUserContext";

const EditUser = () => {
    const {
        editing,
        setEditing,
        addressRef,
        emailRef,
        namesRef,
        secretRef,
        usernameRef,
    } = useUserEditingContext();

    const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
    };

    return (
        <AntConfig>
            <Drawer
                open={!!editing}
                title="Modifier Utilisateur"
                onClose={() => setEditing(null)}
                destroyOnClose
            >
                <form
                    onSubmit={submit}
                    className="flex flex-col h-full overflow-y-auto pr-2"
                >
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="" className="">
                            id
                        </label>
                        <input
                            disabled
                            type="text"
                            className="bg-slate-800 py-2 px-3 rounded-lg"
                            value={editing?.id}
                        />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="" className="">
                            Nom
                        </label>
                        <input
                            type="text"
                            className="bg-slate-800 py-2 px-3 rounded-lg"
                            defaultValue={editing?.names}
                            ref={namesRef}
                        />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="" className="">
                            Username
                        </label>
                        <input
                            type="text"
                            className="bg-slate-800 py-2 px-3 rounded-lg"
                            defaultValue={editing?.username}
                            ref={usernameRef}
                        />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="" className="">
                            Password
                        </label>
                        <input
                            type="text"
                            className="bg-slate-800 py-2 px-3 rounded-lg"
                            ref={secretRef}
                        />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="" className="">
                            Email
                        </label>
                        <input
                            type="text"
                            className="bg-slate-800 py-2 px-3 rounded-lg"
                            defaultValue={editing?.email}
                            ref={emailRef}
                        />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="" className="">
                            Address
                        </label>
                        <textarea
                            className="bg-slate-800 py-2 px-3 rounded-lg resize-none"
                            rows={4}
                            defaultValue={editing?.address}
                            ref={addressRef}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="flex gap-2">
                            <input type="checkbox" />
                            <span>OWNER</span>
                        </label>
                        <label className="flex gap-2">
                            <input type="checkbox" />
                            <span>OWNER</span>
                        </label>
                    </div>
                    <div className="flex gap-2 pt-4">
                        <button
                            onClick={() => setEditing(null)}
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
    );
};

export default EditUser;
