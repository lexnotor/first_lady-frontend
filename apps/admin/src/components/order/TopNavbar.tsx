import React from "react";

const TopNavbar = () => {
    return (
        <nav className="w-full py-4 px-4 overflow-y-auto flex gap-4">
            <span className="py-3 px-4 rounded-3xl cursor-pointer">
                En cours
            </span>
            <span className="bg-[#262830] font-bold py-3 px-4 rounded-3xl cursor-pointer">
                Commandes
            </span>
            <span className="py-3 px-4 rounded-3xl cursor-pointer">Annulé</span>
        </nav>
    );
};

export default TopNavbar;
