"use client";
import { Drawer, message } from "antd";
import React, { useEffect, useRef } from "react";
import { AntConfig } from "ui";
import { useUserEditingContext } from "./contexts/EditUserContext";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { assignRole, updateUser } from "@/redux/user/user.slice";
import useRoles from "@/hooks/useRoles";
import { RoleInfo } from "@/redux";

const EditUser = () => {
    const {
        editing,
        setEditing,
        addressRef,
        emailRef,
        namesRef,
        secretRef,
        usernameRef,
        roleRef,
    } = useUserEditingContext();
    const dispatch = useAppDispatch();
    const [toast, contextHold] = message.useMessage();

    const changed = useRef<Record<string, boolean>>({});

    const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const names = namesRef.current.value,
            address = addressRef.current.value,
            secret = secretRef.current.value,
            email = addressRef.current.value,
            roles = roleRef.current;

        const payload: Parameters<typeof updateUser>[number] = {
            names: changed.current.names ? names : undefined,
            address: changed.current.address ? address : undefined,
            secret: changed.current.secret ? secret : undefined,
            email: changed.current.email ? email : undefined,
            userId: editing.id,
        };

        dispatch(updateUser(payload))
            .then(({ payload }: any) => {
                if (!payload.id) throw new Error("Données entrées son invalid");
                toast.success("Profile mis à jour");
                if (changed.current.roles)
                    return dispatch(
                        assignRole({
                            roles: roles.map((item) => item.id),
                            user_id: editing.id,
                        })
                    );
            })
            .then((action: any) => {
                if (changed.current.roles && !action.payload.id)
                    throw new Error("ROLES_ERROR");
                if (changed.current.roles) toast.success("Roles mis à jour");
                setEditing(null);
            })
            .catch(({ message }) => toast.error(message));
    };

    const { allRoles } = useRoles();

    const hasRole = (role: RoleInfo) => {
        return (
            Array.isArray(editing?.shops) &&
            editing.shops[0]?.roles &&
            !!editing.shops[0].roles.find((item) => item.role.id == role.id)
        );
    };
    const toggleRole = (role: RoleInfo) => {
        const index = roleRef.current.findIndex((item) => item.id == role.id);
        index == -1
            ? roleRef.current.push(role)
            : roleRef.current.splice(index, 1);
    };

    useEffect(() => {
        roleRef.current = (editing?.shops[0] && editing.shops[0].roles) || [];
    }, [editing?.shops, roleRef]);

    return (
        <AntConfig>
            {contextHold}
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
                            onChange={() => (changed.current.names = true)}
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
                            onChange={() => (changed.current.username = true)}
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
                            onChange={() => (changed.current.secret = true)}
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
                            onChange={() => (changed.current.email = true)}
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
                            onChange={() => (changed.current.address = true)}
                        />
                    </div>
                    {editing?.shops[0] && (
                        <div className="flex flex-col gap-2">
                            {allRoles.map((item) => (
                                <label className="flex gap-2" key={item.id}>
                                    <input
                                        type="checkbox"
                                        name={item.id}
                                        id={item.id}
                                        defaultChecked={hasRole(item)}
                                        onChange={() => {
                                            changed.current.roles;
                                            toggleRole(item);
                                        }}
                                    />
                                    <span>{item.title}</span>
                                </label>
                            ))}
                        </div>
                    )}
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
