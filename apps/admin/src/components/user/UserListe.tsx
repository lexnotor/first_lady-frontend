"use client";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import useRoles from "@/hooks/useRoles";
import { RoleInfo, UserInfo } from "@/redux";
import { Popover } from "antd";
import { ColumnsType } from "antd/es/table";
import { AntConfig, CustomTable } from "ui";
import { useUserEditingContext } from "./contexts/EditUserContext";
import { useEffect, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { deleteUser } from "@/redux/user/user.slice";

const ColumnConfig: (
    dispatch: ReturnType<typeof useAppDispatch>,
    context: ReturnType<typeof useUserEditingContext>,
    roles: RoleInfo[]
) => ColumnsType<UserInfo> = (dispatch, context, myrole) => {
    const config: ColumnsType<UserInfo> = [
        { title: "Id", dataIndex: "id" },
        { title: "Noms", dataIndex: "names" },
        { title: "Username", dataIndex: "username" },
        { title: "Email", dataIndex: "email" },
        { title: "Addresse", dataIndex: "address" },
        { title: "Créer le", dataIndex: "created_at" },
    ];
    if (
        myrole.find(
            (item) => item.title == "OWNER" || item.title == "UPDATE_USER"
        )
    )
        config.push({
            title: "",
            width: "5rem",
            render: (_, record) => (
                <Popover
                    placement="left"
                    trigger={["contextMenu", "click"]}
                    content={
                        <ul>
                            <li
                                className="cursor-pointer py-2 hover:text-secondary-800"
                                onClick={() => context.setEditing(record)}
                            >
                                Modifier utilisateur
                            </li>
                            <li
                                className="cursor-pointer py-2 hover:text-secondary-800"
                                onClick={() => dispatch(deleteUser(record.id))}
                            >
                                Supprimer
                            </li>
                        </ul>
                    }
                >
                    <div className="cursor-pointer px-4 py-1 text-secondary-800 border border-secondary-800 hover:bg-secondary-800  hover:text-black transition-colors duration-500 rounded-lg">
                        Plus
                    </div>
                </Popover>
            ),
        });
    return config;
};

const UserListe = ({
    payload,
    type = "CLIENT",
}: {
    payload?: UserInfo[];
    type: "CLIENT" | "STAFF";
}) => {
    const [router, searchParams, pathname] = [
        useRouter(),
        useSearchParams(),
        usePathname(),
    ];
    const dispatch = useAppDispatch();
    const { result } = useAppSelector((state) => state.user.search);
    const context = useUserEditingContext();
    const { myRoles } = useRoles();

    const source = useMemo(() => {
        // ON N'AFFICHE PAS LES UTILISATEURS AVEC LE ROLE OWNER
        const isOwner = (targer: UserInfo) => {
            return (
                Array.isArray(targer?.shops) &&
                targer.shops[0]?.roles &&
                targer.shops[0].roles.find(({ role }) => role.title == "OWNER")
            );
        };
        return (payload ?? result).filter((item) => !isOwner(item));
    }, [payload, result]);

    useEffect(() => {
        const query = new URLSearchParams(searchParams.toString());
        query.set("type", type);
        router.push(pathname + "?" + query.toString());
    }, [pathname, router, type, searchParams]);

    return (
        <div className="[&_.ant-table]:!bg-transparent rounded-xl p-2">
            <AntConfig>
                <CustomTable
                    pagination={{ pageSize: 10, hideOnSinglePage: true }}
                    columns={ColumnConfig(dispatch, context, myRoles)}
                    dataSource={source}
                    locale={{
                        emptyText: (
                            <div className="text-center font-bold py-20">
                                Aucun utilisateur
                            </div>
                        ),
                    }}
                    rowKey={(record) => record.id}
                />
            </AntConfig>
        </div>
    );
};

export default UserListe;
