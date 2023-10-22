"use client";

import { cartUrl } from "@/redux/helper.api";
import { ApiResponse } from "@/types";
import { message } from "antd";
import axios, { AxiosResponse } from "axios";
import React from "react";

const RemoveCartItem = ({
    selected = [],
    toggleSelected,
    getMyCart,
}: {
    selected?: string[];
    toggleSelected: React.Dispatch<string>;
    getMyCart: (token: string) => void;
}) => {
    const [toast, contextHold] = message.useMessage();
    const deleteAll = () => {
        axios
            .delete(cartUrl.emptyCart, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "user_token"
                    )}`,
                },
            })
            .then((res: AxiosResponse<ApiResponse<string>>) => res.data.data)
            .then(() => {
                toggleSelected("ALL");
            })
            .catch(() => {
                toast.error("Suppression impossible");
            });
    };
    const removeMany = () => {
        const request = selected.map(async (item) => {
            return axios
                .delete(cartUrl.removeItem(item), {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "user_token"
                        )}`,
                    },
                })
                .then(
                    (res: AxiosResponse<ApiResponse<string>>) => res.data.data
                )
                .then((id) => id)
                .catch(() => null) as Promise<string>;
        });
        Promise.all(request).then((ids) => {
            ids.forEach((id) => {
                toggleSelected(id);
                getMyCart(localStorage.getItem("user_token"));
            });
        });
    };

    return (
        <>
            {contextHold}
            {selected.length > 0 ? (
                <button
                    onClick={removeMany}
                    className="py-1 px-4 rounded-lg bg-red-600 text-white"
                >
                    Supprimer
                </button>
            ) : (
                <button
                    className="py-1 px-4 rounded-lg bg-red-600 text-white"
                    onClick={deleteAll}
                >
                    Vider mon pagnier
                </button>
            )}
        </>
    );
};

export default RemoveCartItem;
