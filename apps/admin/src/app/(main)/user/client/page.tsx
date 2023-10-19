import EditUser from "@/components/user/EditUser";
import SearchBar from "@/components/user/SearchBar";
import UserListe from "@/components/user/UserListe";
import { EditUserContextProvider } from "@/components/user/contexts/EditUserContext";
import StoreProvider from "@/redux/StoreProvider";

const page = () => {
    return (
        <div className="p-4">
            <StoreProvider>
                <SearchBar />
                <EditUserContextProvider>
                    <UserListe type="CLIENT" />
                    <EditUser />
                </EditUserContextProvider>
            </StoreProvider>
        </div>
    );
};

export default page;
