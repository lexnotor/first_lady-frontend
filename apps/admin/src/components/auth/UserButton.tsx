"use client";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import useAuth from "@/hooks/useAuth";
import { logoutUser } from "@/redux/user/user.slice";
import { Popover } from "antd";
import Link from "next/link";
import { RiMore2Fill } from "react-icons/ri";

const UserButton = () => {
    const dispatch = useAppDispatch();
    const { account } = useAuth();

    const logout = () => {
        dispatch(logoutUser());
    };
    if (
        account.thread.find(
            (item) => item.status == "LOADING" && item.action == "LOGIN"
        )
    )
        return (
            <div className="flex items-center justify-center">
                <span className="w-8 h-8 animate-spin border-t-2 border-t-neutral-800" />
            </div>
        );

    return account.data ? (
        <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-neutral-600"></div>
            <div className="flex flex-col justify-center gap-0 max-w-[calc(100%-2.5rem-1rem-1rem)]">
                <span>{`${account.data?.firstname} ${account.data?.lastname}`}</span>
                <span
                    className="text-neutral-500 text-ellipsis text-xs overflow-hidden whitespace-nowrap"
                    title={`@${account.data?.username}`}
                >
                    @{`${account.data?.username}`}
                </span>
            </div>
            <Popover
                overlayInnerStyle={{ padding: "0", overflow: "hidden" }}
                trigger={["click"]}
                arrow={false}
                placement="topLeft"
                destroyTooltipOnHide
                color="green-inverse"
                content={
                    <ul className="[&>li]:py-2 [&>li]:px-8 [&>li]:duration-300 flex flex-col gap-0">
                        <li
                            onClick={logout}
                            className="cursor-pointer hover:text-white hover:bg-neutral-600"
                        >
                            Logout
                        </li>
                        <li
                            onClick={logout}
                            className="cursor-pointer hover:text-white hover:bg-neutral-600"
                        >
                            Logout
                        </li>
                    </ul>
                }
            >
                <div className="ml-auto cursor-pointer text-xl hover:text-purple-400 transition-colors duration-500 rounded-full">
                    <RiMore2Fill />
                </div>
            </Popover>
        </div>
    ) : (
        <div>
            <Link href={"/signup"}>Signup</Link>/
            <Link href={"/login"}>Login</Link>
        </div>
    );
};

export default UserButton;
