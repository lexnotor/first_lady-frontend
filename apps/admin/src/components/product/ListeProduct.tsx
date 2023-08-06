"use client";
import useProduct from "@/hooks/useProduct";
import { Table } from "antd";
import React from "react";

const ListeProduct = () => {
    const { products } = useProduct();
    return (
        <div>
            <div className="[&_.ant-table]:!bg-transparent rounded-xl p-2">
                <Table
                    className="bg-transparent"
                    columns={[
                        { title: "Désiggnation", dataIndex: "title" },
                        { title: "Variants", dataIndex: "versions" },
                        { title: "Categorie", dataIndex: "category" },
                        { title: "Prix", dataIndex: "price" },
                        { title: "Quantité", dataIndex: "quantity" },
                        { title: "Action", width: "5rem" },
                    ]}
                    pagination={false}
                    size="small"
                    dataSource={products}
                    locale={{
                        emptyText: (
                            <div className="text-center font-bold py-20">
                                Pas de commande
                            </div>
                        ),
                    }}
                    components={{
                        header: {
                            cell: ({ children, ...rest }) => (
                                <td
                                    {...rest}
                                    className="p-2 hover:!bg-transparent !font-medium !text-white text-sm !bg-[#262830]/30"
                                >
                                    {children}
                                </td>
                            ),
                            row: ({ children }) => <tr>{children}</tr>,
                        },
                        body: {
                            row: ({ children }) => (
                                <tr className="!rounded-xl odd:!bg-transparent even:!bg-[#262830]/30 hover:!bg-[#262830]/50 transition-colors duration-500">
                                    {children}
                                </tr>
                            ),
                            cell: ({ children, ...rest }) => (
                                <td
                                    {...rest}
                                    className="p-0 !font-normal !text-white text-sm !border-none"
                                >
                                    {children}
                                </td>
                            ),
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default ListeProduct;
