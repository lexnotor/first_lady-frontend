"use client";
import { userUrl } from "@/redux/helper.api";
import { ApiResponse, UserInfo } from "@/types";
import axios, { AxiosResponse } from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import FormSection from "./FormSection";
import Header from "./Header";
import LoginForm from "./LoginForm";
import LowInfoSection from "./LowInfoSection";
import SubmitSection from "./SubmitSection";

const MyAccount = () => {
    const [token, setToken] = useState<string>(null);
    const [data, setData] = useState<UserInfo>();

    const [signStatus, setSigninStatus] = useState("LOOKING");
    const getMyAccount = useCallback((token: string) => {
        axios
            .get(userUrl.getMe, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res: AxiosResponse<ApiResponse<UserInfo>>) => res.data.data)
            .then((res) => {
                setData(res ?? null);
            })
            .catch(() => {
                setData(null);
            });
    }, []);

    useEffect(() => {
        const loadToken = () => {
            const token = localStorage.getItem("user_token");
            setToken(token);

            if (token) setSigninStatus("CONNECTED");
            else setSigninStatus("DISCONNECTED");

            !token && setTimeout(loadToken, 3000);
        };

        loadToken();
    }, []);

    useEffect(() => {
        getMyAccount(token);
    }, [getMyAccount, token]);

    const formRef = useRef(null);
    if (signStatus == "LOOKING")
        return (
            <div className="w-full h-[80vh] flex flex-col justify-center items-center text-neutral-400 italic">
                <span className="h-20 w-20 border-2 border-transparent border-t-black rounded-full animate-spin" />
            </div>
        );

    if (signStatus == "DISCONNECTED") return <LoginForm />;

    return (
        <div>
            <Header data={data} />
            <LowInfoSection data={data} />
            <FormSection data={data} ref={formRef} />
            <SubmitSection
                getNewUserData={formRef?.current?.getNewUserData}
                setData={setData}
            />
        </div>
    );
};

export default MyAccount;
