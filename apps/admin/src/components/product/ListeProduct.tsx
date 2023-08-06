"use client";
import useProduct from "@/hooks/useProduct";
import { Popover, Table } from "antd";

const ListeProduct = () => {
    const { products } = useProduct();
    return (
        <div>
            <div className="[&_.ant-table]:!bg-transparent rounded-xl p-2">
                <Table
                    className="bg-transparent"
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
                    rowKey={(record) => record.id}
                />
            </div>
        </div>
    );
};

export default ListeProduct;
