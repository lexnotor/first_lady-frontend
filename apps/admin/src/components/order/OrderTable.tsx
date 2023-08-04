"use client";

import { Table } from "antd";
import React from "react";

const OrderTable = () => {
    return (
        <div>
            <div className="[&_.ant-table]:!bg-transparent rounded-xl p-2">
                <Table
                    className="bg-transparent"
                    columns={[
                        { title: "Utilisateur", dataIndex: "user" },
                        { title: "Type", dataIndex: "type" },
                        { title: "Date", dataIndex: "date" },
                        { title: "Items", dataIndex: "items" },
                        { title: "Status", dataIndex: "state" },
                        { title: "Action", width: "5rem" },
                    ]}
                    pagination={false}
                    size="small"
                    dataSource={[
                        {
                            user: "lexnotor",
                            type: "insitu",
                            date: new Date().toISOString(),
                            items: "none",
                            state: "done",
                        },
                        {
                            user: "lexnotor",
                            type: "insitu",
                            date: new Date().toISOString(),
                            items: "none",
                            state: "done",
                        },
                        {
                            user: "lexnotor",
                            type: "insitu",
                            date: new Date().toISOString(),
                            items: "none",
                            state: "done",
                        },
                    ]}
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

export default OrderTable;
