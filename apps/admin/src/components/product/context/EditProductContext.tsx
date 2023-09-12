"use client";
import { ProductVersionInfo } from "@/redux";
import React, {
    SetStateAction,
    createContext,
    useContext,
    useRef,
    useState,
} from "react";

type EditProductContextType = {
    editing?: ProductVersionInfo;
    setEditing?: React.Dispatch<SetStateAction<ProductVersionInfo>>;
    titleRef?: React.MutableRefObject<HTMLInputElement>;
    categoryRef?: React.MutableRefObject<HTMLSelectElement>;
    descriptionRef?: React.MutableRefObject<HTMLTextAreaElement>;
};

const editProductContext = createContext<EditProductContextType>({});

const EditProductContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [editing, setEditing] = useState<ProductVersionInfo>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const categoryRef = useRef<HTMLSelectElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);

    return (
        <editProductContext.Provider
            value={{
                editing,
                setEditing,
                titleRef,
                categoryRef,
                descriptionRef,
            }}
        >
            {children}
        </editProductContext.Provider>
    );
};

const useEditProductContext = () => useContext(editProductContext);

export default EditProductContextProvider;
export { useEditProductContext };
