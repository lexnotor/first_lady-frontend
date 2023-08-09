import LinkWrapper from "./LinkWrapper";

const TopNavbar = () => {
    return (
        <nav className="w-full py-4 px-4 overflow-y-auto flex gap-4">
            <LinkWrapper to="/order/pend" text="En cours" />
            <LinkWrapper to="/order/done" text="Terminé" />
            <LinkWrapper to="/order/cancel" text="Annulé" />
            <LinkWrapper to="/order/pos" text="Vente" />
        </nav>
    );
};

export default TopNavbar;
