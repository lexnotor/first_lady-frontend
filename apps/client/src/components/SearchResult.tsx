"use client";
import { productUrl } from "@/redux/helper.api";
import { ApiResponse, ProductVersionInfo } from "@/types";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const SearchResult = () => {
    const [searchParam, pathname] = [useSearchParams(), usePathname()];
    const [result, setResult] = useState<ProductVersionInfo[]>([]);

    const search = useCallback(async (payload: string) => {
        try {
            const res: AxiosResponse<ApiResponse<ProductVersionInfo[]>> =
                await axios.get(productUrl.findProductVersion + "?" + payload);
            if (res.status == 200) setResult(res.data.data);
        } catch (error) {
            alert(error?.message ?? "RECHERCHE IMPOSSIBLE");
        }
    }, []);

    useEffect(() => {
        search(searchParam.toString());
    }, [search, searchParam]);

    return (
        <div>
            <ul className="grid grid-cols-2 gap-4">
                <li className="flex flex-col gap-3">
                    {result
                        .slice(0, Math.ceil(result.length / 2))
                        .map((item) => (
                            <Link
                                key={item.id}
                                href={pathname + "/p/" + item.id}
                            >
                                <ProductCard productV={item} />
                            </Link>
                        ))}
                </li>
                <li className="flex flex-col gap-3">
                    {result.slice(Math.ceil(result.length / 2)).map((item) => (
                        <Link key={item.id} href={pathname + "/p/" + item.id}>
                            <ProductCard productV={item} />
                        </Link>
                    ))}
                </li>
            </ul>
        </div>
    );
};

export default SearchResult;
