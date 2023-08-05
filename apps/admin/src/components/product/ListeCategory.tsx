"use client";
import useProduct from "@/hooks/useProduct";
import { Table } from "antd";
import React from "react";

const ListeCategory = () => {
    const { category, categoryStat } = useProduct();
    return (
        <div>
            <div className="[&_.ant-table]:!bg-transparent rounded-xl p-2">
                <Table
                    rowKey={(record) => record.id}
                    className="bg-transparent"
                    columns={[
                        {
                            title: "Designation",
                            render: (_, record) => <>{record.title}</>,
                        },
                        {
                            title: "Nbr de Produit",
                            render: (_, record) => {
                                return (
                                    <>
                                        {categoryStat.find(
                                            (item) => item.id == record.id
                                        )?.products ?? 0}
                                    </>
                                );
                            },
                        },
                        {
                            title: "Ajouté",
                            render: (_, record) => (
                                <>
                                    {new Date(
                                        record.created_at
                                    ).toLocaleDateString()}
                                </>
                            ),
                        },
                        { title: "Action", width: "5rem" },
                    ]}
                    pagination={false}
                    size="small"
                    dataSource={category}
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

export default ListeCategory;
