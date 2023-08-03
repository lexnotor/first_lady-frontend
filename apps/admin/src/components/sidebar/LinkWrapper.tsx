"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import { TfiDashboard } from "react-icons/tfi";

const LinkWrapper = ({
    text = <>Menu</>,
    icon = <TfiDashboard />,
    to = "",
}: {
    text?: React.ReactNode;
    icon?: React.ReactNode;
    to: string;
}) => {
    const path = usePathname();
    const isActive = useMemo(() => path.startsWith(to), [path, to]);

    return (
        <li>
            <Link
                href={to}
                className={`pl-6 py-3 transition-colors duration-500 cursor-pointer hover:bg-[#0b0b18] ${
                    isActive
                        ? "bg-[#0b0b18] font-bold border border-neutral-500 text-[#f0ff25]"
                        : ""
                } rounded-xl flex gap-4 items-center`}
            >
                <span className="text-xl">{icon}</span>
                <span>{text}</span>
            </Link>
        </li>
    );
};

export default LinkWrapper;
