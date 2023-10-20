"use client";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { findUser } from "@/redux/user/user.slice";
import { useEffect } from "react";
import { AntConfig, CustomTable } from "ui";

const AdminUserList = () => {
    const dispatch = useAppDispatch();
    const { result: source } = useAppSelector((state) => state.user.search);

    useEffect(() => {
        const query = new URLSearchParams();
        query.set("page", "0");
        query.set("type", "STAFF");
        dispatch(findUser(query.toString()));
    }, [dispatch]);

    return (
        <div className="h-80 bg-[#262830] p-4 rounded-xl flex flex-col">
            <h3 className="mb-2 pb-2 font-bold shrink-0 flex justify-between">
                <span>Personnel ({source.length})</span>
            </h3>
            <div className="[&_.ant-table]:!bg-transparent rounded-xl p-2">
                <AntConfig>
                    <CustomTable
                        pagination={{ pageSize: 10, hideOnSinglePage: true }}
                        columns={[
                            {
                                title: "Noms",
                                dataIndex: "names",
                            },
                            {
                                title: "Username",
                                dataIndex: "username",
                            },
                            {
                                title: "Email",
                                dataIndex: "email",
                            },
                        ]}
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
        </div>
    );
};

export default AdminUserList;
