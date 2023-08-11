import GraphiqueCard from "@/components/dash/GraphiqueCard";
import PendingOrderList from "@/components/dash/PendingOrderList";
import {
    QuantityCard,
    QuantityProductCard,
} from "@/components/dash/QuantityCard";
import StoreProvider from "@/redux/StoreProvider";
import React from "react";

const Page = () => {
    return (
        <div>
            <div className="grid grid-cols-4 p-4 gap-4">
                <StoreProvider>
                    <QuantityProductCard />
                    <QuantityCard />
                    <QuantityCard />
                    <QuantityCard />
                </StoreProvider>
            </div>
            <div className="grid grid-cols-2 p-4 gap-4">
                <GraphiqueCard text="Vente Annuelle" />
                <PendingOrderList />
                <PendingOrderList />
                <GraphiqueCard text="Commandes" />
            </div>
        </div>
    );
};

export default Page;

// Out-of-stock
// Livraison/mois
// Vente/mois
// Commande/mois - Insitu/mois
// Nbre shop - Nbre product -Nbre User
