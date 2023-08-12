"use client";

import { useEffect, useMemo } from "react";
import { useAppSelector } from "./useAppSelector";
import { useAppDispatch } from "./useAppDispatch";
import { getUserStats } from "@/redux/user/user.slice";

const useUser = () => {
    const dispatch = useAppDispatch();
    const { userStats, token, thread } = useAppSelector((state) => state.user);

    const isLoadingStat = useMemo(() => {
        return thread.some(
            (task) =>
                task.action == "LOAD_USER_STATS" && task.status == "LOADING"
        );
    }, [thread]);

    useEffect(() => {
        if (!userStats && !isLoadingStat) dispatch(getUserStats());
    }, [token, isLoadingStat, userStats, dispatch]);

    return { userStats };
};

export { useUser };
