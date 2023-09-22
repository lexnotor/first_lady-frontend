"use client";
import { cartUrl } from "@/redux/helper.api";
import { ProductVersionInfo } from "@/types";
import { message } from "antd";
import axios from "axios";
import React from "react";

const FooterSection = ({
    productV,
    getQuantity,
    close,
}: {
    productV: ProductVersionInfo;
    getQuantity: () => number;
    close: () => any;
}) => {
    const addCart: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        axios
            .post(
                cartUrl.addItem,
                { product_v: productV?.id, quantity: getQuantity() },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage?.getItem(
                            "user_token"
                        )}`,
                    },
                }
            )
            .then(() => message.success("Produit ajouté au pagnier"))
            .then(() => setTimeout(close, 1000))
            .catch(() => message.error("Veillez ressayer"));
    };
    return (
        <form
            onSubmit={addCart}
            className="fixed bottom-0 w-full bg-white mt-auto pr-8 mb-6 flex justify-end gap-4"
        >
            <button
                type="button"
                onClick={close}
                className="border border-neutral-700 py-2 px-4 rounded-lg"
            >
                Quitter
            </button>
            <button className="border border-red-500 bg-red-500 text-white py-2 px-4 rounded-lg">
                Ajouter au pagnier
            </button>
        </form>
    );
};

export default FooterSection;
