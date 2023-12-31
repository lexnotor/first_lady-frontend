"use client";
import { AsyncThunkPayloadCreator } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import {
    CreateUserPayload,
    assignRolePaylod,
    dismissRolePaylod,
    updateUserPayload,
} from ".";
import {
    ApiResponse,
    RoleInfo,
    UserInfo,
    UserShopRoleInfo,
    UserStats,
} from "..";
import { authUrl, userUrl } from "../helper.api";
import { RootState } from "../store";
import { loginUser as loginUserAction } from "./user.slice";

const signupUser: AsyncThunkPayloadCreator<any, any> = async (
    payload: {
        names: string;
        email: string;
        secret: string;
        username: string;
    },
    thunkAPI
) => {
    const { names, email, secret, username } = payload;
    try {
        const res = await axios.post(
            authUrl.signup,
            {
                names,
                email,
            },
            { auth: { username, password: secret } }
        );

        thunkAPI.dispatch(loginUserAction({ secret, username }));

        return res.data.data;
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        return thunkAPI.rejectWithValue({
            error: err?.response.data?.message ?? "SIGNUP_FAILED",
            code_error: err?.response?.status ?? 0,
        });
    }
};

const loginUser: AsyncThunkPayloadCreator<string, any> = async (
    payload: {
        secret: string;
        username: string;
        shopId: string;
    },
    thunkAPI
) => {
    const { secret, username, shopId } = payload;
    try {
        const res = await axios.post(
            authUrl.login,
            { shop: shopId },
            { auth: { username, password: secret } }
        );
        return res.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message ?? "SIGNUP_FAILED");
    }
};

const getMyInfo: AsyncThunkPayloadCreator<any, void> = async (_, thunkAPI) => {
    try {
        const { user } = thunkAPI.getState() as RootState;
        const res = await axios.get(userUrl.getMe, {
            headers: { Authorization: `Bearer ${user.token}` },
        });
        return res.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || "FAILL_TO_GET");
    }
};

const getUserStats: AsyncThunkPayloadCreator<UserStats> = async (
    _,
    thunkAPI
) => {
    const {
        user: { token },
    } = thunkAPI.getState() as RootState;

    try {
        const res: AxiosResponse<ApiResponse<UserStats>> = await axios.get(
            userUrl.getStats,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return res.data.data;
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        return thunkAPI.rejectWithValue({
            error: err?.response.data?.message ?? "FAIL_TO_LOAD_USER_STAT",
            code_error: err?.response?.status ?? 0,
        });
    }
};

const findUser: AsyncThunkPayloadCreator<UserInfo[], string> = async (
    queryStr,
    thunkAPI
) => {
    const {
        user: { token },
    } = thunkAPI.getState() as RootState;

    const query = new URLSearchParams(queryStr);
    query.get("page") ?? query.set("page", "1");

    try {
        const users: AxiosResponse<ApiResponse<UserInfo[]>> = await axios.get(
            userUrl.findUser(query.toString()),
            { headers: { Authorization: `Bearer ${token}` } }
        );

        return thunkAPI.fulfillWithValue(users.data.data);
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        return thunkAPI.rejectWithValue({
            error: err?.response.data?.message ?? "FAIL_TO_FETCH_USERS",
            code_error: err?.response?.status ?? 0,
        });
    }
};

const getAllRoles: AsyncThunkPayloadCreator<RoleInfo[]> = async (
    _,
    thunkAPI
) => {
    const {
        user: { token },
    } = thunkAPI.getState() as RootState;

    try {
        const res: AxiosResponse<ApiResponse<RoleInfo[]>> = await axios.get(
            userUrl.findRoles,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return res.data.data;
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        return thunkAPI.rejectWithValue({
            error: err?.response.data?.message ?? "FAIL_TO_FETCH_ROLES",
            code_error: err?.response?.status ?? 0,
        });
    }
};

const createUser: AsyncThunkPayloadCreator<
    UserInfo,
    CreateUserPayload
> = async (payload, thunkAPI) => {
    const {
        user: { token },
    } = thunkAPI.getState() as RootState;

    try {
        const res: AxiosResponse<ApiResponse<UserInfo>> = await axios.post(
            userUrl.createUser,
            payload,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        return res.data.data;
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        return thunkAPI.rejectWithValue({
            error: err?.response.data?.message ?? "FAIL_TO_CREATE",
            code_error: err?.response?.status ?? 0,
        });
    }
};

const updateUser: AsyncThunkPayloadCreator<
    UserInfo,
    updateUserPayload
> = async (payload, thunkAPI) => {
    const {
        user: { token },
    } = thunkAPI.getState() as RootState;

    try {
        const res: AxiosResponse<ApiResponse<UserInfo>> = await axios.put(
            payload?.userId ? userUrl.updateUser : userUrl.updateMe,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return res.data.data;
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        return thunkAPI.rejectWithValue({
            error: err?.response.data?.message ?? "FAIL_TO_UPDATE_USER",
            code_error: err?.response?.status ?? 0,
        });
    }
};

const deleteUser: AsyncThunkPayloadCreator<string, string> = async (
    userId,
    thunkAPI
) => {
    const {
        user: { token },
    } = thunkAPI.getState() as RootState;
    try {
        const res: AxiosResponse<ApiResponse<string>> = await axios.delete(
            userUrl.deleteUser(userId),
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return res.data.data;
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        return thunkAPI.rejectWithValue({
            error: err?.response.data?.message ?? "FAIL_TO_DELETE_USER",
            code_error: err?.response?.status ?? 0,
        });
    }
};

const assignRole: AsyncThunkPayloadCreator<
    UserShopRoleInfo[],
    assignRolePaylod
> = async (payload, thunkAPI) => {
    const {
        user: { token },
    } = thunkAPI.getState() as RootState;
    try {
        const res: AxiosResponse<ApiResponse<UserShopRoleInfo[]>> =
            await axios.put(userUrl.assignRole, payload, {
                headers: { Authorization: `Bearer ${token}` },
            });
        return res.data.data;
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        return thunkAPI.rejectWithValue({
            error: err?.response.data?.message ?? "FAIL_TO_ASSIGN_ROLE",
            code_error: err?.response?.status ?? 0,
        });
    }
};
const dismissRole: AsyncThunkPayloadCreator<
    UserShopRoleInfo[],
    dismissRolePaylod
> = async (payload, thunkAPI) => {
    const {
        user: { token },
    } = thunkAPI.getState() as RootState;
    try {
        const res: AxiosResponse<ApiResponse<UserShopRoleInfo[]>> =
            await axios.delete(userUrl.assignRole, {
                headers: { Authorization: `Bearer ${token}` },
            });
        return res.data.data;
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        return thunkAPI.rejectWithValue({
            error: err?.response.data?.message ?? "FAIL_TO_ASSIGN_ROLE",
            code_error: err?.response?.status ?? 0,
        });
    }
};

export const userServices = {
    signupUser,
    loginUser,
    getMyInfo,
    getUserStats,
    findUser,
    getAllRoles,
    updateUser,
    assignRole,
    dismissRole,
    deleteUser,
    createUser,
};
