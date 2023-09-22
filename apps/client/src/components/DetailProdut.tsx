"use client";
import { cartUrl, productUrl } from "@/redux/helper.api";
import { ApiResponse, ProductVersionInfo } from "@/types";
import { ConfigProvider, Drawer, message } from "antd";
import axios, { AxiosResponse } from "axios";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import no_image from "@/assets/no_image.png";
import { BiMinus, BiPlus } from "react-icons/bi";
import ProductCard from "./ProductCard";

const DetailProdut = () => {
    const [searchParam, router, pathname] = [
        useSearchParams(),
        useRouter(),
        usePathname(),
    ];

    const isOpen = useMemo(() => {
        return !!searchParam.get("detail");
    }, [searchParam]);
    const [productV, setProductV] = useState<ProductVersionInfo>({});
    const [related, setRelated] = useState<ProductVersionInfo[]>([]);

    const close = () => {
        const query = new URLSearchParams(searchParam.toString());
        query.delete("detail");
        router.push(pathname + "?" + query.toString());
    };

    const getData = (id: string) => {
        axios
            .get(productUrl.getOneProductVersion(id))
            .then((res: AxiosResponse<ApiResponse<ProductVersionInfo>>) => {
                return res.data.data;
            })
            .then((res) => setProductV(res))
            .catch(() => setProductV(null));
    };
    const getRelated = useCallback(
        (payload: string) => {
            const query = new URLSearchParams(payload);
            query.set("minQty", "1");
            query.set("categoryId", productV?.product?.category?.id);
            axios
                .get(productUrl.findProductVersion + "?" + query.toString())
                .then(
                    (res: AxiosResponse<ApiResponse<ProductVersionInfo[]>>) =>
                        res.data.data
                )
                .then((res) =>
                    setRelated(res.filter((item) => item?.id != productV?.id))
                )
                .catch(() => setRelated([]));
        },
        [productV?.id, productV?.product?.category?.id]
    );

    const [quantity, setQuantity] = useState(1);

    const addCart: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        axios
            .post(
                cartUrl.addItem,
                { product_v: productV?.id, quantity },
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

    useEffect(() => {
        if (isOpen) {
            getData(searchParam.get("detail"));
            getRelated(searchParam.toString());
        } else setProductV(null);
    }, [isOpen, searchParam, getRelated]);

    return (
        <ConfigProvider
            theme={{
                components: {
                    Drawer: {
                        colorBgElevated: "#13132100",
                        colorBgContainer: "#13132100",
                        paddingSM: 0,
                        padding: 0,
                        paddingLG: 0,
                    },
                },
            }}
        >
            <Drawer
                open={isOpen}
                title={false}
                footer={false}
                placement="bottom"
                closable={false}
                onClose={close}
                height={"90vh"}
            >
                <div className="bg-white h-full overflow-y-scroll rounded-t-xl pt-4 px-4">
                    {productV == null ? (
                        <div className="w-full h-full flex flex-col justify-center items-center text-neutral-400 italic">
                            <span>Le produit n'a pas été trouvé</span>
                        </div>
                    ) : productV?.id == undefined ? (
                        <div className="w-full h-full flex flex-col justify-center items-center text-neutral-400 italic">
                            <span className="h-20 w-20 border-2 border-transparent border-t-black rounded-full animate-spin" />
                        </div>
                    ) : (
                        <section className="flex flex-col gap h-full">
                            <header className="flex gap-4">
                                <div className="w-32 h-32 ">
                                    <Image
                                        src={
                                            productV?.photo?.photo?.link ??
                                            no_image
                                        }
                                        height={500}
                                        width={500}
                                        alt="productv"
                                        className="w-full aspect-square object-contain rounded-lg shadow-md"
                                    />
                                </div>
                                <div className="grow">
                                    <h3 className="font-bold">
                                        {productV?.product?.title}
                                    </h3>
                                    <h4 className="text-neutral-500 text-[85%]">
                                        {productV?.title}
                                    </h4>
                                    <p>
                                        {productV?.description.slice(0, 40)}...
                                    </p>
                                    <div className="flex justify-between">
                                        <span className="text-[115%] font-bold">
                                            {productV?.price} USD
                                        </span>
                                        <div className="flex gap-2 items-center">
                                            <span
                                                onClick={() =>
                                                    setQuantity(
                                                        (old) => --old || 1
                                                    )
                                                }
                                                className="active:bg-red-600 active:text-white p-1 border border-red-600 text-red-600 rounded-md self-center aspect-square"
                                            >
                                                <BiMinus />
                                            </span>
                                            <span>{quantity}</span>
                                            <span
                                                onClick={() =>
                                                    setQuantity(
                                                        (old) => ++old || 1
                                                    )
                                                }
                                                className="active:bg-red-600 active:text-white p-1 border border-red-600 text-red-600 rounded-md self-center aspect-square"
                                            >
                                                <BiPlus />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </header>
                            <h2 className="font-bold text-[115%] mt-5">
                                Description
                            </h2>
                            <div>{productV?.description}</div>
                            <h2 className="font-bold text-[115%] mt-5">
                                Produit similaires
                            </h2>
                            <ul className="flex overflow-x-auto gap-4">
                                {related.map((item) => (
                                    <li key={item?.id} className="w-48 py-4">
                                        <ProductCard productV={item} />
                                    </li>
                                ))}
                            </ul>

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
                        </section>
                    )}
                </div>
            </Drawer>
        </ConfigProvider>
    );
};

export default DetailProdut;
