"use client";
import React from "react";

const SaleSearch = () => {
    const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
    };
    return (
        <div className="w-full flex flex-col gap-4">
            {/* search bar */}
            <form className="w-96 flex gap-4" onSubmit={submit}>
                <label className="bg-primary-700 rounded-2xl grow">
                    <input
                        type="text"
                        className="py-2 px-4 bg-transparent w-full"
                        placeholder="Produit ..."
                    />
                </label>
                <button className="cursor-pointer px-4 py-1 text-secondary-800 border border-secondary-800 hover:bg-secondary-800  hover:text-black transition-colors duration-500 rounded-3xl">
                    Submit
                </button>
            </form>

            {/* search result */}
            <div className="w-full grid grid-cols-5 gap-3 [&>div]:border [&>div]:rounded-lg [&>div]:h-28">
                <div>b</div>
                <div>b</div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default SaleSearch;
