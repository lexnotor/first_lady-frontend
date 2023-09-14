import React, { createContext, useContext, useRef, useState } from "react";
import { randomBytes } from "crypto";

interface NewProductContextType {
    titleRef?: React.MutableRefObject<HTMLInputElement>;
    descriptionRef?: React.MutableRefObject<HTMLTextAreaElement>;
    brandRef?: React.MutableRefObject<HTMLInputElement>;
    categoryRef?: React.MutableRefObject<HTMLSelectElement>;
    versions?: VersionData[];
    setVersion?: React.Dispatch<React.SetStateAction<VersionData[]>>;
    addVersion?: () => void;
    deleteVersion?: (id: string) => void;
    editing?: string;
    setEditing?: React.Dispatch<React.SetStateAction<string>>;
}

interface VersionData {
    id: string;
    title: string;
    description: string;
    quantity: number;
    price: number;
    image: File;
}

const newProductContext = createContext<NewProductContextType>({});

const NewProductContextProvider = ({ children }) => {
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const brandRef = useRef<HTMLInputElement>(null);
    const categoryRef = useRef<HTMLSelectElement>(null);
    const [editing, setEditing] = useState<string>(null);

    const [versions, setVersion] = useState<VersionData[]>([]);

    const addVersion = () => {
        const nouveau = {
            id: randomBytes(20).toString("hex"),
            title: "",
            description: "",
            quantity: 0,
            price: 0,
            image: null,
        };
        setVersion((old) => [...old, nouveau]);
        setEditing(nouveau.id);
    };

    const deleteVersion = (id: string) => {
        setVersion((old) => old.filter((item) => item.id != id));
    };

    return (
        <newProductContext.Provider
            value={{
                titleRef,
                descriptionRef,
                brandRef,
                categoryRef,
                versions,
                addVersion,
                deleteVersion,
                editing,
                setEditing,
                setVersion,
            }}
        >
            {children}
        </newProductContext.Provider>
    );
};

export default NewProductContextProvider;

const useNewProductContext = () => useContext(newProductContext);

export { useNewProductContext };
