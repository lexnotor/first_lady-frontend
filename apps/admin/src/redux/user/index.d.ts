import type { RoleType } from "../constant";

export type updateUserPayload = {
    address?: string;
    email?: string;
    names?: string;
    secret?: string;
    oldSecret?: string;
    userId?: string;
};

export type assignRolePaylod = {
    user_id: string;
    roles: string[];
};
export type dismissRolePaylod = {
    userId: string;
    roles: RoleType[];
};

export type CreateUserPayload = {
    names: string;
    secret: string;
    username: string;
};
