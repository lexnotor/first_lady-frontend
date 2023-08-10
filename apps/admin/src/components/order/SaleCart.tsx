import React from "react";

const SaleCart = () => {
    return (
        <div className="w-full h-full flex flex-col">
            <h2 className="flex justify-between">
                <span>Panier</span>
                <span>Total: 00.0 USD</span>
            </h2>
            <div className="h-[calc(100%-1.5rem-1.5rem)] overflow-y-auto">
                <span>Pas de produit</span>
            </div>
            <footer className="shrink-0 flex gap-4">
                <button className="cursor-pointer w-[50%] px-4 py-1 text-secondary-800 border border-secondary-800 hover:bg-secondary-800 active:!bg-secondary-600 hover:text-black transition-colors duration-500 rounded-3xl">
                    Vider
                </button>
                <button className="cursor-pointer w-[50%] px-4 py-1 text-secondary-800 border border-secondary-800 hover:bg-secondary-800 active:!bg-secondary-600 hover:text-black transition-colors duration-500 rounded-3xl">
                    Save
                </button>
            </footer>
        </div>
    );
};

export default SaleCart;
