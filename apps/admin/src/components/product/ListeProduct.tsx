"use client";
import useProductVersion from "@/hooks/useProductVersion";
import { ProductVersionInfo } from "@/redux";
import { Popover } from "antd";
import { ColumnsType } from "antd/es/table";
import { CustomTable } from "ui";

const ColumnConfig: () => ColumnsType<ProductVersionInfo> = () => {
    const config: ColumnsType<ProductVersionInfo> = [
        {
            title: "Désignation",
            dataIndex: "title",
            render: (_, record) => <>{record?.product?.title}</>,
        },
        {
            title: "Variants",
            render: (_, record) => <div>{record.title}</div>,
        },
        {
            title: "Categorie",
            render: (_, record) => (
                <>{record?.product?.category?.title ?? "-"}</>
            ),
        },
        {
            title: "Prix",
            render: (_, record) => <div>{record.price}</div>,
        },
        {
            title: "Quantité",
            render: (_, record) => <div>{record.quantity}</div>,
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
    ];
    return config;
};

const ListeProduct = () => {
    const { productVersion } = useProductVersion();
    return (
        <div>
            <div className="[&_.ant-table]:!bg-transparent rounded-xl p-2">
                <CustomTable
                    columns={ColumnConfig()}
                    pagination={false}
                    // TODO
                    dataSource={productVersion}
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
