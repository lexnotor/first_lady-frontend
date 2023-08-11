"use client";
import { CustomTable } from "ui";

const PendingOrderList = () => {
    return (
        <div className="h-80 bg-[#262830] p-4 rounded-xl flex flex-col">
            <h3 className="mb-2 pb-2 font-bold shrink-0 flex justify-between">
                <span>Commandes en attente</span>
                <span>Selecte</span>
            </h3>
            <div className="[&_.ant-table]:!bg-transparent ">
                <CustomTable
                    columns={[
                        { title: "Utilisateur" },
                        { title: "Type" },
                        { title: "Action", width: "5rem" },
                    ]}
                    pagination={false}
                    dataSource={[]}
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
