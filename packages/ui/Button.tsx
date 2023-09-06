"use client";

import React from "react";

export const Button = ({
    children = <></>,
    center = false,
    active = false,
    size = "large",
    style = {},
    ...rest
}: {
    children?: React.ReactNode;
    center?: boolean;
    active?: boolean;
    size?: "small" | "middle" | "large";
    style?: React.CSSProperties;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button
            {...rest}
            style={{ textAlign: center ? "center" : "left", ...style }}
            className={` ${
                size == "small" ? "py-1" : size == "large" ? "py-3" : "py-2"
            } px-4 ${
                active ? "bg-primary-700" : "bg-primary-600"
            } hover:bg-primary-700 transition-colors !duration-500 rounded-r-full rounded-l-full text-white`}
        >
            {children}
        </button>
    );
};
