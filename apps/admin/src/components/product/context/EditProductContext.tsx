"use client";
import { ProductInfo, ProductVersionInfo } from "@/redux";
import React, {
    SetStateAction,
    createContext,
    useContext,
    useRef,
    useState,
} from "react";

type EditProductContextType = {
    editing?: ProductInfo;
    setEditing?: React.Dispatch<SetStateAction<ProductInfo>>;
    editingVer?: ProductVersionInfo;
    setEditingVer?: React.Dispatch<SetStateAction<ProductVersionInfo>>;
    titleRef?: React.MutableRefObject<HTMLInputElement>;
    categoryRef?: React.MutableRefObject<HTMLSelectElement>;
    descriptionRef?: React.MutableRefObject<HTMLTextAreaElement>;
    priceRef?: React.MutableRefObject<HTMLInputElement>;
};

const editProductContext = createContext<EditProductContextType>({});

const EditProductContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [editing, setEditing] = useState<ProductInfo>(null);
    const [editingVer, setEditingVer] = useState<ProductVersionInfo>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const categoryRef = useRef<HTMLSelectElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);

    return (
        <editProductContext.Provider
            value={{
                editing,
                setEditing,
                titleRef,
                categoryRef,
                descriptionRef,
                priceRef,
                editingVer,
                setEditingVer,
            }}
        >
            {children}
        </editProductContext.Provider>
    );
};

const useEditProductContext = () => useContext(editProductContext);

export default EditProductContextProvider;
export { useEditProductContext };
