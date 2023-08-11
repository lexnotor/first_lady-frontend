"use client";
import useOrder from "@/hooks/useOrder";
import { Tag } from "antd";
import { useMemo } from "react";
import { CustomTable } from "ui";
import { OrderState } from "../order";

const PendingOrderList = () => {
    const { orders } = useOrder();
    const source = useMemo(() => {
        return orders.filter((item) => item.state == OrderState.PENDING);
    }, [orders]);
    return (
        <div className="h-80 bg-[#262830] p-4 rounded-xl flex flex-col">
            <h3 className="mb-2 pb-2 font-bold shrink-0 flex justify-between">
                <span>Commandes en attente ({source.length})</span>
            </h3>
            <div className="[&_.ant-table]:!bg-transparent ">
                <CustomTable
                    columns={[
                        {
                            title: "Utilisateur",
                            width: "40%",
                            render: (_, record) => <>{record.user.username}</>,
                        },
                        {
                            title: "Date",
                            render: (_, record) => (
                                <>
                                    {new Date(record.date).toLocaleDateString()}
                                </>
                            ),
                        },
                        {
                            title: "Items",
                            render: (_, record) => (
                                <>{record.products?.length}</>
                            ),
                        },
                        {
                            title: "Type",
                            render: (_, record) => (
                                <Tag color="orange">{record.type}</Tag>
                            ),
                        },
                    ]}
                    pagination={false}
                    dataSource={source}
                    rowKey={(record) => record.id}
                    locale={{
                        emptyText: (
                            <div className="text-center font-bold py-20">
                                Pas de commande
                            </div>
                        ),
                    }}
                />
            </div>
        </div>
    );
};

export default PendingOrderList;
