import { MobileNavBar } from "@/components/navbars";
import React from "react";
import logo from "@/assets/logo_sm.png";
import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <h1 className="flex gap-2 items-center text-xl font-bold p-2 bg-white shadow-lg">
                <Image
                    src={logo}
                    alt="Première Dame"
                    width={400}
                    height={400}
                    className="mx-a w-[3rem] object-contain"
                />
                Mes commandes
            </h1>
            <main className="pb-[65px] min-h-screen">{children}</main>
            <MobileNavBar pathname="/order" />
        </>
    );
};

export default Layout;
