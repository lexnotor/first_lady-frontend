"use client";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { findUser } from "@/redux/user/user.slice";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { BiSearch } from "react-icons/bi";

const SearchBar = () => {
    const dispatch = useAppDispatch();
    const [router, pathname, searchParams] = [
        useRouter(),
        usePathname(),
        useSearchParams(),
    ];

    const textRef = useRef<HTMLInputElement>(null);

    const submitSearch: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const query = new URLSearchParams(searchParams.toString());
        const name = textRef.current.value;
        name ? query.set("names", name) : query.delete("names");
        query.set("page", "1");
        router.push(`${pathname}?${query.toString()}`);
    };

    useEffect(() => {
        dispatch(findUser(searchParams.toString()));
    }, [searchParams, dispatch]);
    return (
        <div className="mb-4 flex gap-x-2 items-center">
            <form className="flex" onSubmit={submitSearch}>
                <label className="p-1 rounded-l-full bg-primary-600">
                    <input
                        type="search"
                        className="py-1 px-2 bg-transparent w-80"
                        placeholder="Nom"
                        ref={textRef}
                        defaultValue={searchParams.get("names")}
                    />
                </label>
                <button className="px-3 rounded-r-full bg-secondary-900 text-primary-700 text-2xl">
                    <BiSearch />
                </button>
            </form>
        </div>
    );
};

export default SearchBar;
