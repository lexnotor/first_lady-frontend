import { MobileNavBar } from "@/components/navbars";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <main className="pb-[65px] min-h-screen">{children}</main>
            <MobileNavBar pathname="/cart" />
        </>
    );
};

export default Layout;
