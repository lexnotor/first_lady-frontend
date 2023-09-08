import React from "react";
import LinkWrapper from "./LinkWrapper";

const TopNavbar = () => {
    return (
        <nav className="w-full py-4 px-4 overflow-y-auto flex gap-4">
            <LinkWrapper to="/product/a" text="Liste variante" />
            <LinkWrapper to="/product/new" text="Nouveau produit" />
            <LinkWrapper to="/product/vers" text="Ajouter variante" />
            <LinkWrapper to="/product/type" text="Categories" />
            <LinkWrapper to="/product/appro" text="Approvisionner" />
        </nav>
    );
};

export default TopNavbar;
