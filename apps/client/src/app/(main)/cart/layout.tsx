import { MobileNavBar } from "@/components/navbars";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <h1 className="text-xl font-bold p-4 bg-white shadow-lg">
                Mon pagnier
            </h1>
            <main className="pb-[65px] min-h-screen">{children}</main>
            <MobileNavBar pathname="/cart" />
        </>
    );
};

export default Layout;
