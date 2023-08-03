"use client";
import React from "react";

export const SpinLoader = ({
    size = "MIDDLE",
}: {
    size?: "SMALL" | "MIDDLE" | "LARGE";
} & React.DOMAttributes<HTMLButtonElement>) => {
    return (
        <span
            className="mx-auto rounded-full border border-transparent border-t-neutral-700 animate-spin block"
            style={{
                width:
                    size == "SMALL"
                        ? "1rem"
                        : size == "MIDDLE"
                        ? "2rem"
                        : "4rem",
                height:
                    size == "SMALL"
                        ? "1rem"
                        : size == "MIDDLE"
                        ? "2rem"
                        : "4rem",
            }}
        />
    );
};
