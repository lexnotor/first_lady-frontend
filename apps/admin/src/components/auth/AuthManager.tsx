"use client";
import useAuth from "@/hooks/useAuth";
import { authUrl } from "@/redux/helper.api";
import axios from "axios";
import { useEffect, useRef } from "react";

const AuthManager = () => {
    const { loginStatus } = useAuth();

    const isUserAuth = async (token: string) => {
        await axios(authUrl.islogin, {
            headers: { Authorization: `Bearer ${token}` },
        }).catch(() => {
            localStorage.removeItem("session_token");
            window.location.reload();
        });
    };
    const timer = useRef<ReturnType<typeof setInterval>>(null);

    useEffect(() => {
        if (loginStatus == "CONNECTED" && !timer) {
            timer.current = setInterval(
                () => isUserAuth(localStorage.getItem("session_token")),
                5 * 3_600 * 1_000
            );
        }
        return () => {
            clearInterval(timer.current);
            timer.current == null;
        };
    }, [loginStatus]);

    return <></>;
};

export default AuthManager;
