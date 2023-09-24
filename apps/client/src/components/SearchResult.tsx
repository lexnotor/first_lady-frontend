"use client";
import { productUrl } from "@/redux/helper.api";
import { ApiResponse, ProductVersionInfo } from "@/types";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { message } from "antd";

const SearchResult = () => {
    const [searchParam, pathname, router] = [
        useSearchParams(),
        usePathname(),
        useRouter(),
    ];
    const [result, setResult] = useState<ProductVersionInfo[]>([]);

    const search = useCallback(async (payload: string) => {
        try {
            const res: AxiosResponse<ApiResponse<ProductVersionInfo[]>> =
                await axios.get(productUrl.findProductVersion + "?" + payload);
            if (res.status == 200) setResult(res.data.data);
        } catch (error) {
            setResult([]);
            message.info("Aucune correspondance trouvée");
        }
    }, []);

    useEffect(() => {
        const query = new URLSearchParams(searchParam.toString());
        query.set("minQty", query.get("minQty") ?? "1");
        if (
            !searchParam.get("page") ||
            isNaN(+searchParam.get("page")) ||
            +searchParam.get("page") < 1
        ) {
            query.set("page", "1");
            router.push(pathname + "?" + query.toString());
        } else search(query.toString());
    }, [search, searchParam, pathname, router]);

    const changePage = (number: number) => {
        const next = +searchParam.get("page") + number;
        const query = new URLSearchParams(searchParam.toString());
        query.set("page", `${next}`);
        router.push(pathname + "?" + query.toString());
    };

    const generateLink = (id: string) => {
        const query = new URLSearchParams(searchParam.toString());
        query.set("detail", id);
        return pathname + "?" + query.toString();
    };

    return (
        <div>
            {result?.length == 0 && (
                <div className="flex justify-center items-center text-neutral-500 h-[80vh]">
                    <span>Aucun produit trouvé</span>
                </div>
            )}
            <ul className="grid grid-cols-2 gap-4">
                <li className="flex flex-col gap-3">
                    {result
                        .slice(0, Math.ceil(result.length / 2))
                        .map((item) => (
                            <Link key={item.id} href={generateLink(item.id)}>
                                <ProductCard productV={item} />
                            </Link>
                        ))}
                </li>
                <li className="flex flex-col gap-3">
                    {result.slice(Math.ceil(result.length / 2)).map((item) => (
                        <Link key={item.id} href={generateLink(item.id)}>
                            <ProductCard productV={item} />
                        </Link>
                    ))}
                </li>
            </ul>
            <div className="flex justify-center gap-4 mt-5">
                <button
                    onClick={() => changePage(-1)}
                    className="disabled:hidden border border-neutral-600 rounded-lg py-2 px-5"
                    disabled={!(+searchParam.get("page") > 1)}
                >
                    Precedent
                </button>
                <button
                    onClick={() => changePage(1)}
                    className="disabled:hidden border border-neutral-600 rounded-lg py-2 px-5"
                    disabled={result?.length < 20}
                >
                    Suivant
                </button>
            </div>
        </div>
    );
};

export default SearchResult;
