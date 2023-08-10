"use client";
import Image from "next/image";
import React from "react";

const SaleSearch = () => {
    const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
    };
    return (
        <div className="w-full max-h-full flex flex-col gap-4">
            {/* search bar */}
            <form
                className="w-96 flex gap-4 sticky top-0 pt-4"
                onSubmit={submit}
            >
                <label className="bg-primary-600 rounded-2xl grow">
                    <input
                        type="text"
                        className="py-2 px-4 bg-transparent w-full"
                        placeholder="Produit ..."
                    />
                </label>
                <button className="cursor-pointer px-4 py-1 text-secondary-800 border border-secondary-800 hover:bg-secondary-800 active:!bg-secondary-600 hover:text-black transition-colors duration-500 rounded-3xl">
                    Submit
                </button>
            </form>

            {/* search result */}
            <div className="w-full h-[calc(100%-2rem)] overflow-y-auto grid grid-cols-4 gap-3 [&>div]:border-none [&>div]:border-primary-200 [&>div]:rounded-none [&>div]:h-56">
                <div className="p-2">
                    <Image
                        alt="pagne"
                        src={
                            "https://cdn.pixabay.com/photo/2023/08/05/18/12/dahlia-8171538_960_720.jpg"
                        }
                        width={200}
                        height={200}
                        className="aspect-square"
                    />
                    <p>
                        <span>V.VVV</span>
                        <span>V.VVV</span>
                    </p>
                </div>
                <div></div>
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
