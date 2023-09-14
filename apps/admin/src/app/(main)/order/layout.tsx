import FloatingLoader from "@/components/order/FloatingLoader";
import TopNavbar from "@/components/order/TopNavbar";
import StoreProvider from "@/redux/StoreProvider";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <div className="">
                <TopNavbar />
            </div>
            {children}

            <StoreProvider>
                <FloatingLoader />
            </StoreProvider>
        </div>
    );
};

export default Layout;
