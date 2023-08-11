"use client";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import useOrder from "@/hooks/useOrder";
import { changeOrderState } from "@/redux/order/order.slice";
import { Popover, Tag } from "antd";
import { useEffect, useMemo } from "react";
import { CustomTable } from "ui";
import { OrderState } from ".";

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
                        {
                            title: "Status",
                            render: (_, record) => (
                                <Tag color="blue">{record.state}</Tag>
                            ),
                        },
                        {
                            title: "Action",
                            width: "5rem",
                            render: (_, { state, id }) => (
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
                                                            dispatch(
                                                                changeOrderState(
                                                                    {
                                                                        id,
                                                                        state: OrderState.DONE,
                                                                    }
                                                                )
                                                            )
                                                        }
                                                        className="cursor-pointer hover:text-white hover:bg-neutral-600"
                                                    >
                                                        Marquer Terminer
                                                    </li>
                                                    <li
                                                        onClick={() =>
                                                            dispatch(
                                                                changeOrderState(
                                                                    {
                                                                        id,
                                                                        state: OrderState.ERROR,
                                                                    }
                                                                )
                                                            )
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
