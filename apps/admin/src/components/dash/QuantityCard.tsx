"use client";
import useOrder from "@/hooks/useOrder";
import useProduct from "@/hooks/useProduct";
import { useUser } from "@/hooks/useUser";

const QuantityCard = () => {
    return (
        <div className="h-28 bg-[#262830] p-4 rounded-xl">
            <h3 className="text-3xl font-bold">34</h3>
            <h4 className="text-neutral-500 text-[85%]">Products</h4>
        </div>
    );
};

const QuantityProductCard = () => {
    const { productStat } = useProduct();
    return (
        <div className="h-28 bg-[#262830] p-4 rounded-xl">
            <h3 className="text-3xl font-bold">
                {productStat?.total_product ?? "loading..."}
            </h3>
            <h4 className="text-neutral-500 text-[85%]">Products</h4>
        </div>
    );
};

const TotalOrderCard = () => {
    const { orderStats } = useOrder();
    return (
        <div className="h-28 bg-[#262830] p-4 rounded-xl">
            <h3 className="text-3xl font-bold">
                {orderStats?.total_order ?? "loading..."}
            </h3>
            <h4 className="text-neutral-500 text-[85%]">Commandes</h4>
        </div>
    );
};
const TotalUserCard = () => {
    const { userStats } = useUser();
    return (
        <div className="h-28 bg-[#262830] p-4 rounded-xl">
            <h3 className="text-3xl font-bold">
                {userStats?.total_user ?? "loading..."}
            </h3>
            <h4 className="text-neutral-500 text-[85%]">Utilisateurs</h4>
        </div>
    );
};

export { QuantityCard, QuantityProductCard, TotalOrderCard, TotalUserCard };
