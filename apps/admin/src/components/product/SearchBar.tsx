"use client";
import { generatePdf } from "@/functions/generateProductPdf";
import useToggle from "@/hooks/toggle";
import useProduct from "@/hooks/useProduct";
import { Modal } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useRef } from "react";
import { BiSearch } from "react-icons/bi";
import { AntConfig } from "ui";

const SearchBar = () => {
    const textRef = useRef<HTMLInputElement>(null);
    const minQtyRef = useRef<HTMLInputElement>(null);
    const maxQtyRef = useRef<HTMLInputElement>(null);
    const minPriceRef = useRef<HTMLInputElement>(null);
    const maxPriceRef = useRef<HTMLInputElement>(null);

    const [isOpen, toggleOpen] = useToggle(false);
    const { products, category } = useProduct();

    const searchParams = useSearchParams();
    const router = useRouter();

    const submitSearch: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const query = new URLSearchParams(searchParams.toString());
        const value = textRef.current.value.trim();
        value ? query.set("text", value) : query.delete("text");
        router.push(`?${query.toString()}`);
    };

    const submitFilter: React.FocusEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const query = new URLSearchParams(searchParams.toString());
        const minQty = minQtyRef.current.value.trim(),
            maxQty = maxQtyRef.current.value.trim(),
            minPrice = minPriceRef.current.value.trim(),
            maxPrice = maxPriceRef.current.value.trim();

        minQty ? query.set("minQty", minQty) : query.delete("minQty");
        maxQty ? query.set("maxQty", maxQty) : query.delete("maxQty");
        minPrice ? query.set("minPrice", minPrice) : query.delete("minPrice");
        maxPrice ? query.set("maxPrice", maxPrice) : query.delete("maxPrice");

        router.push(`?${query.toString()}`);

        toggleOpen(false);
    };

    return (
        <>
            <div className="mb-4 flex gap-x-2 items-center">
                {/* search */}
                <form className="flex" onSubmit={submitSearch}>
                    <label className="p-1 rounded-l-full bg-primary-600">
                        <input
                            type="search"
                            className="py-1 px-2 bg-transparent w-80"
                            placeholder="Rechercher"
                            ref={textRef}
                            defaultValue={searchParams.get("text")}
                        />
                    </label>
                    <button className="px-3 rounded-r-full bg-secondary-900 text-primary-700 text-2xl">
                        <BiSearch />
                    </button>
                </form>

                {/* filters */}
                <span
                    className="px-4 py-1 font-bold underline cursor-pointer hover:text-secondary-800 duration-500"
                    onClick={() => toggleOpen()}
                >
                    Filtres
                </span>
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
            <AntConfig>
                <Modal
                    title="Filtres"
                    destroyOnClose
                    footer={false}
                    closable={false}
                    onCancel={() => toggleOpen()}
                    open={isOpen}
                >
                    <form onSubmit={submitFilter}>
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-6 items-center">
                                <label className="">Produit :</label>
                                <select className="py-2 px-4 bg-primary-600 rounded-r-full rounded-l-full">
                                    <option value={null}>Aucun</option>
                                    {products.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex gap-6 items-center">
                                <label className="">Categorie :</label>
                                <select className="py-2 px-4 bg-primary-600 rounded-r-full rounded-l-full">
                                    <option value={null}>Aucun</option>
                                    {category.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.title}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex gap-6 items-center">
                                <label>Quantité :</label>
                                <input
                                    type="text"
                                    className="py-1 px-4 bg-primary-600 rounded-r-full rounded-l-full w-16"
                                    placeholder="Min"
                                    pattern="[0-9]*"
                                    ref={minQtyRef}
                                    defaultValue={searchParams.get("minQty")}
                                />
                                <input
                                    type="text"
                                    className="py-1 px-4 bg-primary-600 rounded-r-full rounded-l-full w-16"
                                    placeholder="Max"
                                    pattern="[0-9]*"
                                    ref={maxQtyRef}
                                    defaultValue={searchParams.get("maxQty")}
                                />
                            </div>

                            <div className="flex gap-6 items-center">
                                <label> Prix:</label>
                                <input
                                    type="text"
                                    className="py-1 px-4 bg-primary-600 rounded-r-full rounded-l-full w-16"
                                    placeholder="Min"
                                    pattern="[0-9]*"
                                    ref={minPriceRef}
                                    defaultValue={searchParams.get("minPrice")}
                                />
                                <input
                                    type="text"
                                    className="py-1 px-4 bg-primary-600 rounded-r-full rounded-l-full w-16"
                                    placeholder="Max"
                                    pattern="[0-9]*"
                                    ref={maxPriceRef}
                                    defaultValue={searchParams.get("maxPrice")}
                                />
                            </div>
                        </div>

                        <footer className="flex justify-end gap-4 mt-4">
                            <button
                                type="button"
                                onClick={() => toggleOpen()}
                                className="py-1 px-3 rounded-lg duration-500 hover:bg-secondary-800 hover:text-primary-800 border border-secondary-800 text-secondary-800"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                className="py-1 px-3 rounded-lg duration-500 hover:bg-secondary-800 hover:text-primary-800 border border-secondary-800 text-secondary-800"
                            >
                                Appliquer
                            </button>
                        </footer>
                    </form>
                </Modal>
            </AntConfig>
        </>
    );
};

export default SearchBar;
