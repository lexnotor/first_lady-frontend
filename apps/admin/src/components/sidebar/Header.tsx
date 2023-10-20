import logo from "@/assert/logo.png";
import StoreProvider from "@/redux/StoreProvider";
import Image from "next/image";
import { BiShoppingBag } from "react-icons/bi";
import { BsCart4 } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { TfiDashboard } from "react-icons/tfi";
import UserButton from "../auth/UserButton";
import LinkWrapper from "./LinkWrapper";
import { RoleType } from "@/redux/constant";

const links = [
    { icon: <TfiDashboard />, text: "Dashboard", path: "/dash", role: [] },
    {
        icon: <BiShoppingBag />,
        text: "Produits",
        path: "/product",
        role: [RoleType.OWNER, RoleType.UPDATE_PRODUCT],
    },
    {
        icon: <BsCart4 />,
        text: "Commandes",
        path: "/order",
        role: [RoleType.UPDATE_ORDER, RoleType.OWNER, RoleType.SELLER],
    },
    {
        icon: <FiUsers />,
        text: "Ustilisateurs",
        path: "/user",
        role: [RoleType.OWNER, RoleType.UPDATE_USER],
    },
];

const Header = () => {
    const hasRole = () => {
        return true;
    };

    return (
        <header className="p-4 flex flex-col gap-5 w-full min-h-full bg-[#262830] text-white">
            <div className="flex justify-between">
                <Image
                    alt="Logo"
                    width={500}
                    height={500}
                    src={logo}
                    className="w-44 mx-auto"
                />
            </div>
            <ul className="flex gap-3 flex-col my-auto">
                {links.map((item) =>
                    hasRole() ? (
                        <LinkWrapper
                            icon={item.icon}
                            key={item.path}
                            to={item.path}
                            text={item.text}
                        />
                    ) : (
                        <div key={item.path}></div>
                    )
                )}
                {/* <LinkWrapper
                    icon={<TfiDashboard />}
                    text="Dashboard"
                    to="/dash"
                />
                <LinkWrapper icon={<BsCart4 />} text="Commandes" to="/order" />
                <LinkWrapper
                    icon={<BiShoppingBag />}
                    text="Produits"
                    to="/product"
                />
                <LinkWrapper
                    icon={<FiUsers />}
                    text="Ustilisateurs"
                    to="/user"
                /> */}
                {/* <LinkWrapper icon={<BsShop />} text="Boutiques" to="/shop" /> */}
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
