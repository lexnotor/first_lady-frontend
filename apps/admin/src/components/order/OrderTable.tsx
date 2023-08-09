"use client";

import useOrder from "@/hooks/useOrder";
import { Table } from "antd";
import { useEffect } from "react";

const OrderTable = () => {
    const { orders } = useOrder();

    useEffect(() => {
        return () => null;
    });
    return (
        <div>
            <div className="[&_.ant-table]:!bg-transparent rounded-xl p-2">
                <Table
                    columns={[
                        {
                            title: "Utilisateur",
                            render: (_, record) => <>{record.user.username}</>,
                        },
                        { title: "Type", dataIndex: "type" },
                        { title: "Date", dataIndex: "date" },
                        { title: "Items", dataIndex: "items" },
                        { title: "Status", dataIndex: "state" },
                        { title: "Action", width: "5rem" },
                    ]}
                    pagination={false}
                    dataSource={orders}
                    rowKey={(record) => record.id}
                    className="bg-transparent"
                    size="small"
                    locale={{
                        emptyText: (
                            <div className="text-center font-bold py-20">
                                Pas de commande
                            </div>
                        ),
                    }}
                    components={{
                        header: {
                            cell: ({
                                children,
                                ...rest
                            }: {
                                children: any;
                            }) => (
                                <td
                                    {...rest}
                                    className="p-2 hover:!bg-transparent !font-medium !text-white text-sm !bg-[#262830]/30"
                                >
                                    {children}
                                </td>
                            ),
                            row: ({ children }: { children: any }) => (
                                <tr>{children}</tr>
                            ),
                        },
                        body: {
                            row: ({ children }: { children: any }) => (
                                <tr className="!rounded-xl odd:!bg-transparent even:!bg-[#262830]/30 hover:!bg-[#262830]/50 transition-colors duration-500">
                                    {children}
                                </tr>
                            ),
                            cell: ({
                                children,
                                ...rest
                            }: {
                                children: any;
                            }) => (
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
