"use client";
import useProduct from "@/hooks/useProduct";
import { Popover } from "antd";
import { CustomTable } from "ui";

const ListeProduct = () => {
    const { products } = useProduct();
    return (
        <div>
            <div className="[&_.ant-table]:!bg-transparent rounded-xl p-2">
                <CustomTable
                    columns={[
                        { title: "Désiggnation", dataIndex: "title" },
                        {
                            title: "Variants",
                            render: (_, record) => (
                                <div>
                                    {record.product_v.map((item) => (
                                        <span key={item.id}>{item.title},</span>
                                    ))}
                                </div>
                            ),
                        },
                        {
                            title: "Categorie",
                            render: (_, record) => (
                                <span>
                                    {record.category?.title ?? "No spécifié"}
                                </span>
                            ),
                        },
                        {
                            title: "Prix",
                            render: (_, record) => (
                                <div>
                                    {record.product_v.map((item) => (
                                        <span key={item.id}>
                                            {item.price} USD,
                                        </span>
                                    ))}
                                </div>
                            ),
                        },
                        {
                            title: "Quantité",
                            render: (_, record) => (
                                <div>
                                    {record.product_v.reduce(
                                        (prev, cur) => prev + cur.quantity,
                                        0
                                    )}
                                </div>
                            ),
                        },
                        {
                            title: "",
                            width: "5rem",
                            render: () => (
                                <Popover
                                    placement="left"
                                    trigger={["contextMenu", "click"]}
                                    content={
                                        <ul>
                                            <li>More</li>
                                        </ul>
                                    }
                                >
                                    <div className="cursor-pointer px-4 py-1 text-secondary-800 border border-secondary-800 hover:bg-secondary-800  hover:text-black transition-colors duration-500 rounded-lg">
                                        Plus
                                    </div>
                                </Popover>
                            ),
                        },
                    ]}
                    pagination={false}
                    dataSource={products}
                    locale={{
                        emptyText: (
                            <div className="text-center font-bold py-20">
                                Pas de commande
                            </div>
                        ),
                    }}
                    rowKey={(record) => record.id}
                />
            </div>
        </div>
    );
};

export default ListeProduct;
