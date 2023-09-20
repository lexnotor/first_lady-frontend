"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useRef } from "react";
import { BiFilterAlt } from "react-icons/bi";

const SearchBar = () => {
    const [searchParam, router, pathname] = [
        useSearchParams(),
        useRouter(),
        usePathname(),
    ];
    const textRef = useRef<HTMLInputElement>(null);

    const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const all = {
            text: textRef.current.value,
        };
        const query = new URLSearchParams(searchParam.toString());
        Object.entries(all).forEach(([key, val]) => {
            if (val) query.set(key, val);
            else query.delete(key);
        });

        router.push(`${pathname}?${query.toString()}`);
    };

    return (
        <form
            onSubmit={submit}
            className="flex items-center gap-2 sticky top-0 p-3 bg-white"
        >
            <label className="flex grow border py-1 px-3 border-black rounded-r-full rounded-l-full">
                <input type="search" className="grow py-1" ref={textRef} />
            </label>
            <span className="text-lg">
                <BiFilterAlt />
            </span>
            <button className="bg-black self-stretch text-white font-bold rounded-r-full rounded-l-full px-4">
                Search
            </button>
        </form>
    );
};

export default SearchBar;
