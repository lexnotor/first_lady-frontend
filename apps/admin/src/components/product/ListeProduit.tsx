"use client";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import useProduct from "@/hooks/useProduct";
import { ProductInfo } from "@/redux";
import { getProducts } from "@/redux/product/product.slice";
import { ColumnsType } from "antd/es/table";
import { useEffect } from "react";
import { AntConfig, CustomTable } from "ui";

const ColumnConfig = (): ColumnsType<ProductInfo> => {
    const config: ColumnsType<ProductInfo> = [
        {
            title: "Designation",
            dataIndex: "title",
            render: (value) => <>{value ?? "[NO_NAME]"} </>,
        },
        {
            title: "Marque",
            dataIndex: "brand",
            render: (value) => <>{value ?? "[NO_BRAND]"} </>,
        },
        {
            title: "Category",
            dataIndex: "category",
            render: (_, record) => <>{record?.category?.title ?? "[AUCUN]"}</>,
        },
        {
            title: "Total Variants",
            dataIndex: "product_v",
            render: (_, record) => <>{record?.product_v?.length ?? 0} </>,
        },
        {
            title: "Ajouté le",
            render: (_, record) => (
                <>{new Date(record.created_at).toLocaleDateString()} </>
            ),
        },
    ];
    return config;
};

const ListeProduit = () => {
    const dispatch = useAppDispatch();
    const { products } = useProduct();

    useEffect(() => {
        dispatch(getProducts({}));
    }, [dispatch]);

    return (
        <div>
            <div className="[&_.ant-table]:!bg-transparent rounded-xl p-2">
                <AntConfig>
                    <CustomTable
                        columns={ColumnConfig()}
                        pagination={{ pageSize: 10, hideOnSinglePage: true }}
                        dataSource={products}
                        locale={{
                            emptyText: (
                                <div className="text-center font-bold py-20">
                                    Pas de produit
                                </div>
                            ),
                        }}
                        rowKey={(record) => record.id}
                    />
                </AntConfig>
            </div>
        </div>
    );
};

export default ListeProduit;
