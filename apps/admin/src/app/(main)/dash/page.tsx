import fashion from "@/assert/vector.jpg";
import GraphiqueCard from "@/components/dash/GraphiqueCard";
import PendingOrderList from "@/components/dash/PendingOrderList";
import {
    QuantityProductCard,
    TotalOrderCard,
    TotalUserCard,
} from "@/components/dash/QuantityCard";
import StoreProvider from "@/redux/StoreProvider";
import Image from "next/image";

const Page = () => {
    return (
        <div>
            <div className="grid grid-cols-4 p-4 gap-4">
                <StoreProvider>
                    <QuantityProductCard />
                    <TotalOrderCard />
                    <TotalUserCard />
                </StoreProvider>
                <div className="h-28 bg-[#262830] p-0 rounded-xl overflow-hidden">
                    <Image
                        alt="Fashion"
                        width={500}
                        height={500}
                        src={fashion}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 p-4 gap-4">
                <StoreProvider>
                    <GraphiqueCard text="Vente Annuelle" />
                    <PendingOrderList />
                    <PendingOrderList />
                    <GraphiqueCard text="Commandes" />
                </StoreProvider>
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
