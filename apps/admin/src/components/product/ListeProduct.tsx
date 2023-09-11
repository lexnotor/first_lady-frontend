"use client";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import useProductVersion from "@/hooks/useProductVersion";
import { ApiResponse, ProductVersionInfo } from "@/redux";
import { productUrl } from "@/redux/helper.api";
import { deleteProductVersion } from "@/redux/product/product.slice";
import { Popover } from "antd";
import { ColumnsType } from "antd/es/table";
import axios, { AxiosResponse } from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { CustomTable } from "ui";

const ColumnConfig: (
    dispatch: ReturnType<typeof useAppDispatch>
) => ColumnsType<ProductVersionInfo> = (dispatch) => {
    const config: ColumnsType<ProductVersionInfo> = [
        {
            title: "Produit",
            dataIndex: "title",
            render: (_, record) => <>{record?.product?.title}</>,
        },
        {
            title: "Variants",
            render: (_, record) => <div>{record.title}</div>,
        },
        {
            title: "Categorie",
            render: (_, record) => (
                <>{record?.product?.category?.title ?? "-"}</>
            ),
        },
        {
            title: "Prix",
            render: (_, record) => <div>{record.price}</div>,
        },
        {
            title: "Quantité",
            render: (_, record) => <div>{record.quantity}</div>,
        },
        {
            title: "",
            width: "5rem",
            render: (_, record) => (
                <Popover
                    placement="left"
                    trigger={["contextMenu", "click"]}
                    content={
                        <ul>
                            <li
                                className="cursor-pointer"
                                onClick={() =>
                                    dispatch(deleteProductVersion(record.id))
                                }
                            >
                                Supprimer
                            </li>
                        </ul>
                    }
                >
                    <div className="cursor-pointer px-4 py-1 text-secondary-800 border border-secondary-800 hover:bg-secondary-800  hover:text-black transition-colors duration-500 rounded-lg">
                        Plus
                    </div>
                </Popover>
            ),
        },
    ];
    return config;
};

const ListeProduct = () => {
    const { productVersion } = useProductVersion();
    const dispatch = useAppDispatch();

    const [data, setData] = useState<any[]>([]);

    const searchParam = useSearchParams();
    const isSearch = useMemo(() => {
        return (
            !!searchParam.get("text") ||
            !!searchParam.get("minQty") ||
            !!searchParam.get("maxQty") ||
            !!searchParam.get("minPrice") ||
            !!searchParam.get("maxPrice")
        );
    }, [searchParam]);

    useEffect(() => {
        if (!isSearch) return () => null;

        axios
            .get(productUrl.findProductVersion + "?" + searchParam.toString())
            .then(
                (res: AxiosResponse<ApiResponse<ProductVersionInfo[]>>) =>
                    res.data.data
            )
            .then((res) => setData(res))
            .catch(() => setData([]));
    }, [isSearch, searchParam]);

    const ref = useRef<HTMLDivElement>(null);

    return (
        <div>
            <div
                className="[&_.ant-table]:!bg-transparent rounded-xl p-2"
                ref={ref}
            >
                <CustomTable
                    columns={ColumnConfig(dispatch)}
                    pagination={false}
                    dataSource={isSearch ? data : productVersion}
                    locale={{
                        emptyText: (
                            <div className="text-center font-bold py-20">
                                Pas de produit
                            </div>
                        ),
                    }}
                    rowKey={(record) => record.id}
                />
            </div>
        </div>
    );
};

export default ListeProduct;
