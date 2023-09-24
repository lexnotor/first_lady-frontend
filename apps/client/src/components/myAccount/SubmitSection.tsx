import { userUrl } from "@/redux/helper.api";
import { ApiResponse, UserInfo } from "@/types";
import { message } from "antd";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const SubmitSection = ({
    getNewUserData,
    setData,
}: {
    getNewUserData: any;
    setData: any;
}) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [searchParams, router, pathname] = [
        useSearchParams(),
        useRouter(),
        usePathname(),
    ];

    const submitChange: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        axios
            .put(
                userUrl.getMe,
                {
                    email: getNewUserData().email || undefined,
                    names: getNewUserData().names || undefined,
                    address: getNewUserData().address || undefined,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "user_token"
                        )}`,
                    },
                }
            )
            .then((res: AxiosResponse<ApiResponse<UserInfo>>) => res.data.data)
            .then((res) => {
                setData(res ?? null);
                messageApi.success("Profile mis à jour");
                router.push(pathname);
            })
            .catch(() => {
                messageApi.error("Veillez saisir des imformations correctes");
            });
    };

    return (
        !!searchParams.get("editing") && (
            <form
                onSubmit={submitChange}
                className="px-4 flex gap-4 items-center mt-8"
            >
                {contextHolder}
                <Link
                    href="?"
                    className="text-center basis-1/2 py-2 px-4 rounded-lg border"
                >
                    Annuler
                </Link>
                <button className="basis-1/2 py-2 px-4 rounded-lg border border-red-600 bg-red-600 text-white">
                    Enregistrer
                </button>
            </form>
        )
    );
};

export default SubmitSection;
