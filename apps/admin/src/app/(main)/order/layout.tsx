import TopNavbar from "@/components/order/TopNavbar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <div className="">
                <TopNavbar />
            </div>
            {children}
        </div>
    );
};

export default Layout;
