import GraphiqueCard from "@/components/dash/GraphiqueCard";
import QuantityCard from "@/components/dash/QuantityCard";
import React from "react";

const Page = () => {
    return (
        <div>
            <div className="grid grid-cols-4 p-4 gap-4">
                <QuantityCard />
                <QuantityCard />
                <QuantityCard />
                <QuantityCard />
            </div>
            <div className="grid grid-cols-2 p-4 gap-4">
                <GraphiqueCard />
                <GraphiqueCard />
                <GraphiqueCard />
                <GraphiqueCard />
            </div>
        </div>
    );
};

export default Page;
