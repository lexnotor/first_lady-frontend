import React from "react";
import { BiFilterAlt } from "react-icons/bi";

const SearchBar = () => {
    return (
        <form className="flex items-center gap-2 sticky top-0 p-3 bg-white">
            <label className="flex grow border py-1 px-3 border-black rounded-r-full rounded-l-full">
                <input type="search" className="grow py-1" />
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
