"use client";
import { Table } from "antd";
import React from "react";

const PendingOrderList = () => {
    return (
        <div className="h-80 bg-[#262830] p-4 rounded-xl flex flex-col">
            <h3 className="mb-2 pb-2 font-bold shrink-0 flex justify-between">
                <span>Commandes en attente</span>
                <span>Selecte</span>
            </h3>
            <div className="[&_.ant-table]:!bg-transparent ">
                <Table
                    className="bg-transparent"
                    columns={[
                        { title: "Utilisateur" },
                        { title: "Type" },
                        { title: "Action", width: "5rem" },
                    ]}
                    pagination={false}
                    size="small"
                    dataSource={[]}
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
                                    className="p-2 !bg-transparent !font-medium !text-white"
                                >
                                    {children}
                                </td>
                            ),
                            row: ({ children }) => <tr>{children}</tr>,
                        },
                        body: {
                            row: ({ children }) => <tr>{children}</tr>,
                            cell: ({ children, ...rest }) => (
                                <td
                                    {...rest}
                                    className="p-0 !bg-transparent !font-normal !text-white"
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

export default PendingOrderList;
