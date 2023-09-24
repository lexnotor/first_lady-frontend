"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useRef } from "react";
import { BiFilterAlt, BiSearch } from "react-icons/bi";
import logo from "@/assets/logo_sm.png";
import Image from "next/image";

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
            className="flex items-center gap-2 sticky top-0 p-2 bg-white"
        >
            <Image
                src={logo}
                alt="Première Dame"
                width={400}
                height={400}
                className="mx-a w-[3rem] object-contain"
            />
            <label className="flex grow border py-1 px-3 border-black rounded-r-full rounded-l-full">
                <input 
																			type="search" className="grow py-1"
																			ref={textRef} 
																defaultValue={searchParam.get("text")} 
															/>
                <button className="bg-red-600 self-stretch text-white text-lg font-bold rounded-r-full rounded-l-full px-4">
                    <BiSearch />
                </button>
            </label>
            <span className="text-xl">
                <BiFilterAlt />
            </span>
        </form>
    );
};

export default SearchBar;
