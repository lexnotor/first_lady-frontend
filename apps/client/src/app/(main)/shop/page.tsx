import SearchBar from "@/components/SearchBar";
import SearchResult from "@/components/SearchResult";
import React from "react";

const Page = () => {
    return (
        <div className="">
            <SearchBar />

            {/* space */}
            <div className="my-2" />
            <div className="px-3">
                <SearchResult />
            </div>
        </div>
    );
};

export default Page;
