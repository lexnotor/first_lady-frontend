"use client";
import { productUrl } from "@/redux/helper.api";
import { ApiResponse, ProductVersionInfo } from "@/types";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import ProductCard from "../ProductCard";

const RelatedItem = ({ product_v }: { product_v: ProductVersionInfo }) => {
    const [related, setRelated] = useState<ProductVersionInfo[]>([]);
    const [searchParam, pathname] = [useSearchParams(), usePathname()];
    const getRelated = useCallback((productV: ProductVersionInfo) => {
        const query = new URLSearchParams();
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
    }, []);
    useEffect(() => {
        getRelated(product_v);
    }, [getRelated, product_v]);

    const generateLink = (id: string) => {
        const query = new URLSearchParams(searchParam.toString());
        query.set("detail", id);
        return pathname + "?" + query.toString();
    };
    return (
        <>
            <h2 className="font-bold text-[115%] mt-5">Produit similaires</h2>
            <ul className="flex overflow-x-auto gap-4">
                {related.map((item) => (
                    <li key={item?.id} className="w-48 py-4">
                        <Link
                            href={generateLink(item.id)}
                            className="h-full w-full hover:text-inherit"
                        >
                            <ProductCard productV={item} />
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default RelatedItem;
