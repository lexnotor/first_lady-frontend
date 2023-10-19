"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userServices } from "./user.service";
import { RoleInfo, UserInfo, UserStats } from "..";

type Status = "LOADING" | "ERROR" | "FULLFILED";
interface UserState {
    data: UserInfo;
    userStats: UserStats;
    thread: {
        id: string;
        action:
            | "LOGIN"
            | "GET_ME"
            | "SIGNUP"
            | "LOAD_USER_STATS"
            | "GET_ALL_ROLES"
            | "ASSIGN_ROLE"
            | "CREATE_USER"
            | "UPDATE_USER"
            | "SEARCH_USER";
        status: Status;
        payload?: object;
        message?: { content: string; display: boolean };
    }[];
    token: string;
    search?: {
        result: UserInfo[];
        page: number;
        query: string;
    };
    roles: RoleInfo[];
    loginStatus: "CONNECTED" | "DISCONNECTED" | "PENDING";
}

const initialState: UserState = {
    token: null,
    data: null,
    userStats: null,
    thread: [],
    loginStatus: "PENDING",
    search: {
        page: null,
        query: null,
        result: [],
    },
    roles: [],
};

const signupUser = createAsyncThunk("user/signupUser", userServices.signupUser);

const loginUser = createAsyncThunk("user/loginUser", userServices.loginUser);

const updateUser = createAsyncThunk("user/updateUser", userServices.updateUser);
const assignRole = createAsyncThunk("user/assignRole", userServices.assignRole);
const dismissRole = createAsyncThunk(
    "user/assignRole",
    userServices.dismissRole
);

const createUser = createAsyncThunk("user/createUser", userServices.createUser);
const getMe = createAsyncThunk("user/getMyInfo", userServices.getMyInfo);

const findUser = createAsyncThunk("user/findUser", userServices.findUser);

const getAllRoles = createAsyncThunk(
    "user/getAllRoles",
    userServices.getAllRoles
);

const getUserStats = createAsyncThunk(
    "user/getUserStats",
    userServices.getUserStats
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        removeUserData: (state) => {
            state.data = null;
        },
        logoutUser: (state) => {
            localStorage.removeItem("session_data");
            localStorage.removeItem("session_token");
            state.loginStatus = "DISCONNECTED";
            state.token = null;
            state.data = null;
            window.location.href == "/login"
                ? window.location.reload()
                : (window.location.href = "/login");
        },
        loadUserToken: (state, { payload }: { payload: string }) => {
            state.token = payload;
        },
        loadUserData: (
            state,
            { payload }: { payload: typeof initialState.data }
        ) => {
            state.data = payload;
        },
    },
    extraReducers: (builder) =>
        builder
            // loginUser
            .addCase(loginUser.pending, (state, { meta }) => {
                state.thread.push({
                    action: "LOGIN",
                    id: meta.requestId,
                    status: "LOADING",
                });
            })
            .addCase(loginUser.fulfilled, (state, { payload, meta }) => {
                localStorage.setItem("session_token", payload);
                state.token = payload;
                const tasks = state.thread.find(
                    (task) => task.id == meta.requestId
                );
                if (tasks) tasks.status = "FULLFILED";
            })
            .addCase(loginUser.rejected, (state, { meta }) => {
                localStorage.removeItem("session_token");
                state.token = null;
                const tasks = state.thread.find((task) => {
                    return task.id == meta.requestId;
                });
                if (tasks) tasks.status = "ERROR";
            })
            // signupUser
            .addCase(signupUser.pending, (state, { meta }) => {
                state.thread.push({
                    action: "SIGNUP",
                    id: meta.requestId,
                    status: "LOADING",
                });
            })
            .addCase(signupUser.fulfilled, (state, { meta }) => {
                const tasks = state.thread.find(
                    (task) => task.id == meta.requestId
                );
                if (tasks) tasks.status = "FULLFILED";
            })
            .addCase(signupUser.rejected, (state, { meta }) => {
                const tasks = state.thread.find((task) => {
                    return task.id == meta.requestId;
                });
                if (tasks) tasks.status = "ERROR";
            })
            // getMe
            .addCase(getMe.pending, (state, { meta }) => {
                state.thread.push({
                    action: "GET_ME",
                    id: meta.requestId,
                    status: "LOADING",
                });
            })
            .addCase(getMe.fulfilled, (state, { payload, meta }) => {
                state.loginStatus = "CONNECTED";
                localStorage.setItem("session_data", JSON.stringify(payload));
                const tasks = state.thread.find(
                    (task) => task.id == meta.requestId
                );
                if (tasks) tasks.status = "FULLFILED";
                state.data = payload;
            })
            .addCase(getMe.rejected, (state, { meta }) => {
                state.loginStatus = "DISCONNECTED";
                const tasks = state.thread.find(
                    (task) => task.id == meta.requestId
                );
                if (tasks) tasks.status = "ERROR";
            })
            // getUserStats
            .addCase(getUserStats.pending, (state, { meta }) => {
                state.thread.push({
                    action: "LOAD_USER_STATS",
                    id: meta.requestId,
                    status: "LOADING",
                });
            })
            .addCase(getUserStats.fulfilled, (state, { payload, meta }) => {
                state.userStats = payload;

                const tasks = state.thread.find(
                    (task) => task.id == meta.requestId
                );
                if (tasks) tasks.status = "FULLFILED";
            })
            .addCase(getUserStats.rejected, (state, { meta }) => {
                const tasks = state.thread.find(
                    (task) => task.id == meta.requestId
                );
                if (tasks) tasks.status = "ERROR";
            })
            // findUser
            .addCase(findUser.pending, (state, { meta }) => {
                state.thread.push({
                    action: "SEARCH_USER",
                    id: meta.requestId,
                    status: "LOADING",
                });
            })
            .addCase(findUser.fulfilled, (state, { payload, meta }) => {
                const page = new URLSearchParams(meta.arg).get("page");
                if (!page || +page <= 1) {
                    state.search.result = payload;
                } else {
                    const toAdd = [];
                    payload.forEach((newItem) => {
                        const index = state.search.result.findIndex(
                            (old) => old.id == newItem.id
                        );
                        index == -1
                            ? toAdd.push(newItem)
                            : state.search.result.splice(index, 1, newItem);
                    });
                }
                state.search.query = meta.arg;
                state.search.page = +(page ?? 1);

                const tasks = state.thread.find(
                    (task) => task.id == meta.requestId
                );
                if (tasks) tasks.status = "FULLFILED";
            })
            .addCase(findUser.rejected, (state, { meta }) => {
                const tasks = state.thread.find(
                    (task) => task.id == meta.requestId
                );
                if (tasks) tasks.status = "ERROR";
            })
            // getAllRoles
            .addCase(getAllRoles.pending, (state, { meta }) => {
                state.thread.push({
                    action: "GET_ALL_ROLES",
                    id: meta.requestId,
                    status: "LOADING",
                });
            })
            .addCase(getAllRoles.fulfilled, (state, { payload, meta }) => {
                state.roles = payload;
                const tasks = state.thread.find(
                    (task) => task.id == meta.requestId
                );
                if (tasks) tasks.status = "FULLFILED";
            })
            .addCase(getAllRoles.rejected, (state, { meta }) => {
                const tasks = state.thread.find(
                    (task) => task.id == meta.requestId
                );
                if (tasks) tasks.status = "ERROR";
            })
            // updateUser
            .addCase(updateUser.pending, (state, { meta }) => {
                state.thread.push({
                    action: "UPDATE_USER",
                    id: meta.requestId,
                    status: "LOADING",
                });
            })
            .addCase(updateUser.fulfilled, (state, { payload, meta }) => {
                if (meta.arg.userId) {
                    const index = state.search.result.findIndex(
                        (item) => item.id == payload.id
                    );
                    index == -1
                        ? state.search.result.unshift(payload)
                        : state.search.result.splice(index, 1, payload);
                } else state.data = payload;
                const tasks = state.thread.find(
                    (task) => task.id == meta.requestId
                );
                if (tasks) tasks.status = "FULLFILED";
            })
            .addCase(updateUser.rejected, (state, { meta }) => {
                const tasks = state.thread.find(
                    (task) => task.id == meta.requestId
                );
                if (tasks) tasks.status = "ERROR";
            })
            // assignRole
            .addCase(assignRole.pending, (state, { meta }) => {
                state.thread.push({
                    action: "ASSIGN_ROLE",
                    id: meta.requestId,
                    status: "LOADING",
                });
            })
            .addCase(assignRole.fulfilled, (state, { payload, meta }) => {
                if (meta.arg.user_id != state.data.id) {
                    const user = state.search.result.find(
                        (item) => item.id == meta.arg.user_id
                    );
                    user.shops[0].roles = payload;
                } else {
                    state.data.shops[0].roles = payload;
                }
                const tasks = state.thread.find(
                    (task) => task.id == meta.requestId
                );
                if (tasks) tasks.status = "FULLFILED";
            })
            .addCase(assignRole.rejected, (state, { meta }) => {
                const tasks = state.thread.find(
                    (task) => task.id == meta.requestId
                );
                if (tasks) tasks.status = "ERROR";
            })
            // createUser
            .addCase(createUser.pending, (state, { meta }) => {
                state.thread.push({
                    action: "CREATE_USER",
                    id: meta.requestId,
                    status: "LOADING",
                });
            })
            .addCase(createUser.fulfilled, (state, { payload, meta }) => {
                state.search.result.unshift(payload);
                const tasks = state.thread.find(
                    (task) => task.id == meta.requestId
                );
                if (tasks) tasks.status = "FULLFILED";
            })
            .addCase(createUser.rejected, (state, { meta }) => {
                const tasks = state.thread.find(
                    (task) => task.id == meta.requestId
                );
                if (tasks) tasks.status = "ERROR";
            }),
});

// sync actions
export const { removeUserData, loadUserData, loadUserToken, logoutUser } =
    userSlice.actions;
// async actions
export {
    getMe,
    loginUser,
    signupUser,
    getUserStats,
    findUser,
    getAllRoles,
    updateUser,
    dismissRole,
    assignRole,
    createUser,
};
// reducer
export default userSlice.reducer;
