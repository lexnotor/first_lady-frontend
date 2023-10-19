import UserProfile from "@/components/user/UserProfile";
import StoreProvider from "@/redux/StoreProvider";
import React from "react";

const page = () => {
    return (
        <div className="p-4">
            <StoreProvider>
                <UserProfile />
            </StoreProvider>
        </div>
    );
};

export default page;
