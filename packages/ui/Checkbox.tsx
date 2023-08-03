"use client";
import React, { ForwardedRef, forwardRef, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";

const Checkbox = forwardRef(function Checkbox(
    {
        isChecked,
        toggler,
        id = "",
    }: {
        isChecked?: boolean;
        toggler?: () => any;
        id?: string;
    },
    ref: ForwardedRef<HTMLInputElement>
) {
    const [checked, setChecked] = useState(true);

    return (
        <>
            <span className="w-3 h-3 border-[0.5px] inline-block relative border-neutral-400 text-purple-700 text-lg rounded-sm duration-500">
                <AiOutlineCheck
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
                    style={{ opacity: isChecked ?? checked ? "1" : "0" }}
                />
            </span>
            <input
                ref={ref}
                id={id}
                type="checkbox"
                onChange={() => {
                    toggler ? toggler() : setChecked((old) => !old);
                }}
                hidden
                checked={isChecked ?? checked}
                className="py-2 px-4 w-full border border-neutral-400 rounded-lg focus:outline-none"
            />
        </>
    );
});

export default Checkbox;
