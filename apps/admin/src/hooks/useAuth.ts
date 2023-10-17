"use client";
import {
    getMe,
    loadUserData,
    loadUserToken,
    logoutUser,
} from "@/redux/user/user.slice";
import { useEffect, useMemo } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";

const useAuth = () => {
    const dispatch = useAppDispatch();
    const account = useAppSelector((state) => state.user);
    const isPendindLogin = useMemo(() => {
        return !!account.thread.find(
            (task) => task.action == "LOGIN" && task.status == "LOADING"
        );
    }, [account.thread]);

    const isPendingSignup = useMemo(() => {
        return !!account.thread.find(
            (task) => task.action == "SIGNUP" && task.status == "LOADING"
        );
    }, [account.thread]);

    const isLogin = useMemo(() => {
        return !!account.data;
    }, [account.data]);

    useEffect(() => {
        const userData = localStorage.getItem("session_data");

        if (userData && !account.data && account.token)
            dispatch(loadUserData(JSON.parse(userData)));
        else if (!account.data && account.token) dispatch(getMe());
    }, [dispatch, account.data, account.token]);

    useEffect(() => {
        const token = localStorage.getItem("session_token");
        if (!account.token && token) dispatch(loadUserToken(token));
        else if (!token && window.location.pathname != "/login")
            dispatch(logoutUser());
    }, [dispatch, account.token]);

    return {
        account,
        isPendindLogin,
        isPendingSignup,
        isLogin,
        loginStatus: account.loginStatus,
        myRoles: account.data?.shops ? account.data.shops[0].roles : [],
        allRoles: account.roles,
    };
};

export default useAuth;
