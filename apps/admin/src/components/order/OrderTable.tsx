"use client";

import { CustomTable } from "ui";

const OrderTable = () => {
    return (
        <div>
            <div className="[&_.ant-table]:!bg-transparent rounded-xl p-2">
                <CustomTable
                    columns={[
                        { title: "Utilisateur", dataIndex: "user" },
                        { title: "Type", dataIndex: "type" },
                        { title: "Date", dataIndex: "date" },
                        { title: "Items", dataIndex: "items" },
                        { title: "Status", dataIndex: "state" },
                        { title: "Action", width: "5rem" },
                    ]}
                    pagination={false}
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
                />
            </div>
        </div>
    );
};

export default OrderTable;
