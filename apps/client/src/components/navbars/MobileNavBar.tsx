import Link from "next/link";
import React from "react";
import { AiOutlineHome } from "react-icons/ai";

const links = [
    {
        path: "/shop",
        icon: <AiOutlineHome />,
        text: "Shop",
    },
    {
        path: "/order",
        icon: <AiOutlineHome />,
        text: "Commandes",
    },
    {
        path: "/cart",
        icon: <AiOutlineHome />,
        text: "Panier",
    },
    {
        path: "/account",
        icon: <AiOutlineHome />,
        text: "Compte",
    },
];

const MobileNavBar = ({ pathname = "/" }) => {
    return (
        <footer className="fixed w-full bottom-0 bg-white">
            <nav className="flex shadow-[0px_0px_1rem_0px_#4a4a4a3d]">
                {links.map((item) => {
                    const isActive = pathname == item.path;
                    return (
                        <Link
                            href={item.path}
                            key={item.path}
                            className={`py-1 basis-1/4 flex flex-col justify-center items-center ${
                                isActive ? "text-red-500" : ""
                            } `}
                        >
                            <span className="text-2xl">{item.icon}</span>
                            <span className="text-[85%]">{item.text}</span>
                        </Link>
                    );
                })}
            </nav>
        </footer>
    );
};

export default MobileNavBar;
