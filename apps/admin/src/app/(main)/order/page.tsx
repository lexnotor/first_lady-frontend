import OrderTable from "@/components/order/OrderTable";
import TopNavbar from "@/components/order/TopNavbar";
import React from "react";

const Page = () => {
    return (
        <div>
            <div className="">
                <TopNavbar />
            </div>
            <section className="px-5">
                <OrderTable />
            </section>
        </div>
    );
};

export default Page;
