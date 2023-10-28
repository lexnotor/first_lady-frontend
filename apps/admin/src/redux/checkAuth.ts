import { ThunkMiddleware } from "@reduxjs/toolkit";
import { getMe, loginUser, logoutUser } from "./user/user.slice";

const ignore = [getMe.rejected.type, loginUser.rejected.type];

const checkAuth: ThunkMiddleware = ({ dispatch }) => {
    return (next) => {
        return async (action: { type: string; payload: any }) => {
            const res = next(action);

            if (
                action.payload?.code_error == 401 &&
                !ignore.includes(res.type)
            ) {
                dispatch(getMe()).then(({ meta }) => {
                    if (meta.requestStatus == "rejected")
                        dispatch(logoutUser());
                    else alert("Vous n'êtes pas authorisé");
                });
            }

            return res;
        };
    };
};

export default checkAuth;
