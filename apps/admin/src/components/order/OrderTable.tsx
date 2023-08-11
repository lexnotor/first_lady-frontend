"use client";

import useOrder from "@/hooks/useOrder";
import { Popover, Table, Tag } from "antd";
import { useEffect, useMemo } from "react";
import { OrderState } from ".";
import { useAppDispatch } from "@/hooks/useAppDispatch";

const OrderTable = ({ status }: { status?: OrderState }) => {
    const dispatch = useAppDispatch();
    const { orders } = useOrder();
    const source = useMemo(() => {
        return status ? orders.filter((item) => item.state == status) : orders;
    }, [orders, status]);

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
                        {
                            title: "Status",
                            render: (_, record) => (
                                <Tag color="blue">{record.state}</Tag>
                            ),
                        },
                        {
                            title: "Action",
                            width: "5rem",
                            render: (_, { state }) => (
                                <Popover
                                    overlayInnerStyle={{
                                        padding: "0",
                                        overflow: "hidden",
                                    }}
                                    arrow={false}
                                    placement="left"
                                    destroyTooltipOnHide
                                    trigger={["contextMenu", "click"]}
                                    content={
                                        <ul className="[&>li]:py-2 [&>li]:px-8 [&>li]:duration-300 flex flex-col gap-0">
                                            {state == OrderState.PENDING ? (
                                                <>
                                                    <li
                                                        onClick={() =>
                                                            dispatch()
                                                        }
                                                        className="cursor-pointer hover:text-white hover:bg-neutral-600"
                                                    >
                                                        Marquer Terminer
                                                    </li>
                                                    <li
                                                        onClick={() =>
                                                            dispatch()
                                                        }
                                                        className="cursor-pointer hover:text-white hover:bg-neutral-600"
                                                    >
                                                        Annuler Commande
                                                    </li>
                                                </>
                                            ) : (
                                                <></>
                                            )}
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
                    dataSource={source}
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
