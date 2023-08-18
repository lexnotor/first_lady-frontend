"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";

const LinkWrapper = ({
    text = <>Menu</>,
    to = "",
}: {
    text?: React.ReactNode;
    to: string;
}) => {
    const path = usePathname();
    const isActive = useMemo(() => {
        const reg = new RegExp(`^${to}(?![a-zA-Z0-9])`);
        return reg.test(path);
    }, [path, to]);

    return (
        <span>
            <Link
                href={to}
                className={`py-3 px-4 font-bold transition-colors duration-500 cursor-pointer hover:bg-primary-700 ${
                    isActive ? "bg-primary-700 text-secondary-800" : ""
                } rounded-3xl flex gap-4 items-center`}
            >
                <span>{text}</span>
            </Link>
        </span>
    );
};

export default LinkWrapper;
