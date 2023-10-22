"use client";
import { useEffect } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import { getAllRoles } from "@/redux/user/user.slice";

const useRoles = () => {
    const dispatch = useAppDispatch();
    const { roles, data, token } = useAppSelector((state) => state.user);

    useEffect(() => {
        if (token) dispatch(getAllRoles());
    }, [token, dispatch]);

    return {
        myRoles: data?.shops
            ? data.shops[0].roles.map((item) => item.role)
            : [],
        allRoles: roles,
    };
};

export default useRoles;
