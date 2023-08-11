"use client";
import useProduct from "@/hooks/useProduct";
import { CustomTable } from "ui";

const ListeCategory = () => {
    const { category, categoryStat } = useProduct();
    return (
        <div>
            <div className="[&_.ant-table]:!bg-transparent rounded-xl p-2">
                <CustomTable
                    rowKey={(record) => record.id}
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
                    dataSource={category}
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

export default ListeCategory;
