"use client";
import { cartUrl } from "@/redux/helper.api";
import { ProductVersionInfo } from "@/types";
import { Popover, message } from "antd";
import axios from "axios";
import Link from "next/link";
import React from "react";

const FooterSection = ({
    productV,
    quantity,
    close,
}: {
    productV: ProductVersionInfo;
    quantity: any;
    close: () => any;
}) => {
    const [messageApi, contextHolder] = message.useMessage();
    const addCart: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        axios
            .post(
                cartUrl.addItem,
                { product_v: productV?.id, quantity: quantity },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage?.getItem(
                            "user_token"
                        )}`,
                    },
                }
            )
            .then(() => messageApi.success("Produit ajouté au pagnier"))
            .then(() => setTimeout(close, 1000))
            .catch(() => messageApi.error("Veillez ressayer"));
    };
    return (
        <>
            {contextHolder}
            <form
                onSubmit={addCart}
                className="fixed bottom-0 w-full bg-white mt-auto pr-8 mb-6 flex justify-end gap-4"
            >
                <button
                    type="button"
                    onClick={close}
                    className="border border-neutral-700 py-2 px-4 rounded-lg"
                >
                    Fermer
                </button>
                {localStorage?.getItem("user_token") ? (
                    <button className="border border-red-500 bg-red-500 text-white py-2 px-4 rounded-lg">
                        Ajouter au pagnier
                    </button>
                ) : (
                    <Popover
                        trigger={["hover"]}
                        content={
                            <>
                                Connectez-vous pour ajouter <br /> ce produit à
                                votre pagnier
                            </>
                        }
                    >
                        <Link
                            href={"/account"}
                            className="border border-red-500 bg-red-500 text-white hover:text-white py-2 px-4 rounded-lg"
                        >
                            Se connecter
                        </Link>
                    </Popover>
                )}
            </form>
        </>
    );
};

export default FooterSection;
