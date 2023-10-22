"use client";
import { RoleInfo, UserInfo } from "@/redux";
import {
    ReactNode,
    SetStateAction,
    createContext,
    useContext,
    useRef,
    useState,
} from "react";

type EditUserContextType = {
    editing?: UserInfo;
    setEditing?: React.Dispatch<SetStateAction<UserInfo>>;
    namesRef?: React.MutableRefObject<HTMLInputElement>;
    secretRef?: React.MutableRefObject<HTMLInputElement>;
    usernameRef?: React.MutableRefObject<HTMLInputElement>;
    addressRef?: React.MutableRefObject<HTMLTextAreaElement>;
    emailRef?: React.MutableRefObject<HTMLInputElement>;
    roleRef?: React.MutableRefObject<RoleInfo[]>;
};

const EditUserContext = createContext<EditUserContextType>({});

const EditUserContextProvider = ({ children }: { children?: ReactNode }) => {
    const [editing, setEditing] = useState<UserInfo>(null);

    const namesRef = useRef<HTMLInputElement>(null),
        secretRef = useRef<HTMLInputElement>(null),
        usernameRef = useRef<HTMLInputElement>(null),
        addressRef = useRef<HTMLTextAreaElement>(null),
        emailRef = useRef<HTMLInputElement>(null),
        roleRef = useRef<RoleInfo[]>([]);

    return (
        <EditUserContext.Provider
            value={{
                editing,
                setEditing,
                namesRef,
                secretRef,
                usernameRef,
                addressRef,
                emailRef,
                roleRef,
            }}
        >
            {children}
        </EditUserContext.Provider>
    );
};

const useUserEditingContext = () => useContext(EditUserContext);

export { EditUserContextProvider, useUserEditingContext };
