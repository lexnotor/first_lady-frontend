import Image from "next/image";
import React from "react";
import logo from "@/assets/logo.png";
import { useRouter } from "next/navigation";
import { UserInfo } from "@/types";

const Header = ({ data }: { data: UserInfo }) => {
    const router = useRouter();
    const deconnect = () => {
        localStorage.removeItem("user_token");
        router.refresh();
    };
    return (
        <h1 className="flex gap-2 justify-between items-center p-2 bg-white shadow-lg">
            <Image
                src={logo}
                alt="Première Dame"
                width={400}
                height={400}
                className="w-fit h-[3rem] object-contain"
            />
            <span className="text-xl font-bold">Mon profil</span>
            {data?.id && (
                <button
                    onClick={deconnect}
                    className="ml-auto py-2 px-4 rounded-lg border border-red-600 text-red-600"
                >
                    Déconnexion
                </button>
            )}
        </h1>
    );
};

export default Header;
