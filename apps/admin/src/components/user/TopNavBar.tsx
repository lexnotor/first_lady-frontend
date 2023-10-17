import LinkWrapper from "./LinkWrapper";

const TopNavbar = () => {
    return (
        <nav className="w-full py-4 px-4 overflow-y-auto flex gap-4">
            <LinkWrapper to="/user/me" text="Mon compte" />
            <LinkWrapper to="/user/client" text="Liste Utilisateurs" />
            <LinkWrapper to="/user/staff" text="Liste Personnels" />
            <button>Créer</button>
        </nav>
    );
};

export default TopNavbar;
