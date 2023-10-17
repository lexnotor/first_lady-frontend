import { Table } from "antd";

import React from "react";
import AntConfig from "./AntConfig";
import { AnyObject } from "antd/es/_util/type";

type Cust<T extends AnyObject> = Parameters<typeof Table<T>>[0];

export function CustomTable<T extends AnyObject>({ ...arg }: Cust<T>) {
    return (
        <AntConfig>
            <Table
                className="bg-transparent"
                size="small"
                locale={{
                    emptyText: (
                        <div className="text-center font-bold py-20">
                            Pas de commande
                        </div>
                    ),
                }}
                {...arg}
                components={{
                    header: {
                        cell: ({ children, ...rest }: { children: any }) => (
                            <td
                                {...rest}
                                className="p-2 hover:!bg-transparent !font-medium !text-white text-sx !bg-[#262830]/30"
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
                        cell: ({ children, ...rest }: { children: any }) => (
                            <td
                                {...rest}
                                className="p-0 !font-normal !text-white text-xs !border-none"
                            >
                                {children}
                            </td>
                        ),
                    },
                }}
            />
        </AntConfig>
    );
}
