"use client";

import { generatePdf } from "@/functions/generateOrderPdf";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const FilterBar = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [beginDate, setBegin] = useState<Date | null>(null);
    const [endDate, setEnd] = useState<Date | null>(null);

    const submitSearch: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const query = new URLSearchParams();
        beginDate && query.set("begin", formatDate(beginDate));
        endDate && query.set("end", formatDate(endDate));
        router.push(`?${query.toString()}`);
    };

    const formatDate = (date: Date | null) => {
        if (date)
            return `${date.getFullYear()}-${date.getMonth() < 10 ? "0" : ""}${
                date.getMonth() + 1
            }-${date.getDate() < 10 ? "0" : ""}${date.getDate()}`;
        else return null;
    };

    return (
        <>
            <div className="mb-4 flex gap-x-2 items-center">
                {/* search */}
                <form className="flex gap-2" onSubmit={submitSearch}>
                    <label
                        className="flex items-center gap-2 rounded-l-full"
                        htmlFor="begin"
                    >
                        <span>Dè</span>
                        <input
                            type="date"
                            id="begin"
                            name="begin"
                            max={formatDate(endDate)}
                            defaultValue={searchParams?.get("begin")}
                            className="w-40 bg-transparent border border-primary-400 invalid:border-red-500 py-2 px-4 rounded-lg"
                            onChange={(e) => setBegin(e.target.valueAsDate)}
                        />
                    </label>
                    <label
                        className="flex items-center gap-2 rounded-l-full"
                        htmlFor="end"
                    >
                        <span>À</span>
                        <input
                            type="date"
                            id="end"
                            name="end"
                            min={formatDate(beginDate)}
                            defaultValue={searchParams?.get("end")}
                            className="w-40 bg-transparent border border-primary-400 invalid:border-red-500 py-2 px-4 rounded-lg"
                            onChange={(e) => setEnd(e.target.valueAsDate)}
                        />
                    </label>

                    <button className="px-3 rounded-lg font-bold hover:bg-secondary-900 border border-secondary-900 text-secondary-900 hover:text-primary-700">
                        filtrer
                    </button>
                </form>
                {/* Print */}
                <span
                    onClick={() =>
                        generatePdf(
                            new URLSearchParams(searchParams.toString())
                        )
                    }
                    className="px-4 py-1 font-bold underline cursor-pointer hover:text-secondary-800 duration-500"
                >
                    Imprimer
                </span>
            </div>
        </>
    );
};

export default FilterBar;
