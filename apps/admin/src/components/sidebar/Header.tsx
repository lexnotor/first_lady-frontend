import React from "react";
import UserButton from "../auth/UserButton";
import StoreProvider from "@/redux/StoreProvider";
import { TfiDashboard } from "react-icons/tfi";
import { BiShoppingBag } from "react-icons/bi";
import { BsCart4, BsShop } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import LinkWrapper from "./LinkWrapper";

const Header = () => {
    return (
        <header className="p-4 flex flex-col gap-5 w-full min-h-full bg-[#262830] text-white">
            <div className="flex justify-between">
                <span>FIRST LADY</span>
                <span></span>
            </div>
            <ul className="flex gap-3 flex-col my-auto">
                <LinkWrapper
                    icon={<TfiDashboard />}
                    text="Dashboard"
                    to="/dash"
                />
                <LinkWrapper icon={<BsCart4 />} text="Orders" to="/order" />
                <LinkWrapper
                    icon={<BiShoppingBag />}
                    text="Products"
                    to="/product"
                />
                <LinkWrapper icon={<FiUsers />} text="Users" to="/user" />
                <LinkWrapper icon={<BsShop />} text="Shops" to="/shop" />
            </ul>
            <div className="mt-auto">
                <StoreProvider>
                    <UserButton />
                </StoreProvider>
            </div>
        </header>
    );
};

export default Header;
