"use client";
import { productUrl } from "@/redux/helper.api";
import { ApiResponse, ProductVersionInfo } from "@/types";
import { ConfigProvider, Drawer } from "antd";
import axios, { AxiosResponse } from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import FooterSection from "./FooterSection";
import ItemSection from "./ItemSection";
import RelatedItem from "./RelatedItem";

const DetailProdut = () => {
    const [searchParam, router, pathname] = [
        useSearchParams(),
        useRouter(),
        usePathname(),
    ];

    const [productV, setProductV] = useState<ProductVersionInfo>({});

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

    const qtyRef = useRef<HTMLInputElement>(null);
    const [quantity, setQuantity] = useState(1);
    useEffect(() => {
        if (searchParam.get("detail")) {
            getData(searchParam.get("detail"));
        } else setProductV(null);
    }, [searchParam]);

    return (
        <Drawer
            open={!!searchParam.get("detail")}
            title={false}
            footer={false}
            placement="bottom"
            closable={false}
            onClose={close}
            height={"90vh"}
            destroyOnClose
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
                        <ItemSection
                            productV={productV}
                            ref={qtyRef}
                            setQuantity={setQuantity}
                            quantity={quantity}
                        />
                        <RelatedItem product_v={productV} />
                        <FooterSection
                            close={close}
                            productV={productV}
                            quantity={quantity}
                        />
                    </section>
                )}
            </div>
        </Drawer>
    );
};

const wrapAntConfig = (Content: React.FunctionComponent) => {
    return function DetailProdut() {
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
                <Content />
            </ConfigProvider>
        );
    };
};

export default wrapAntConfig(DetailProdut);
