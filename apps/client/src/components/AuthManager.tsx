"use client";
import { authUrl } from "@/redux/helper.api";
import axios from "axios";
import React, { useEffect } from "react";

const AuthManager = () => {
    const isUserAuth = async (token: string) => {
        await axios(authUrl.islogin, {
            headers: { Authorization: `Bearer ${token}` },
        }).catch(() => {
            localStorage.removeItem("user_token");
            window.location.reload();
        });
    };

    useEffect(() => {
        const token = localStorage.getItem("user_token");
        if (token) isUserAuth(token);
    }, []);

    return <></>;
};

export default AuthManager;
