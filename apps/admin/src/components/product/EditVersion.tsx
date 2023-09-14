"use client";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { updateProductVersion } from "@/redux/product/product.slice";
import { Drawer } from "antd";
import Image from "next/image";
import React from "react";
import { BiEdit } from "react-icons/bi";
import { AntConfig } from "ui";
import { useEditProductContext } from "./context/EditProductContext";

const EditVersion = () => {
    const { editingVer, setEditingVer, priceRef, descriptionRef, titleRef } =
        useEditProductContext();
    const dispatch = useAppDispatch();

    const submit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const payload = {
            productVId: editingVer.id,
            title: titleRef.current.value,
            price: +priceRef.current.value,
            description: descriptionRef.current.value,
        };

        if (payload.price < 0) return alert("Veuillez choisir un prix valid");

        await dispatch(updateProductVersion(payload));
        setEditingVer(null);
    };

    return (
        <AntConfig>
            <Drawer
                open={!!editingVer}
                onClose={() => setEditingVer(null)}
                title="Modifier Variant"
                destroyOnClose
            >
                <form onSubmit={submit} className="flex flex-col h-full">
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="" className="">
                            Designation
                        </label>
                        <input
                            ref={titleRef}
                            type="text"
                            className="bg-slate-800 py-2 px-3 rounded-lg"
                            defaultValue={editingVer?.title}
                        />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="" className="">
                            Prix (USD)
                        </label>
                        <input
                            ref={priceRef}
                            pattern="[0-9]+"
                            type="text"
                            className="bg-slate-800 py-2 px-3 rounded-lg"
                            defaultValue={editingVer?.price}
                        />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="" className="">
                            Description
                        </label>
                        <textarea
                            ref={descriptionRef}
                            defaultValue={editingVer?.description}
                            className="bg-slate-800 py-2 px-3 rounded-lg resize-none"
                            rows={4}
                        />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="photo" className=" flex gap-4">
                            <span>Photo</span>
                            <span className="text-2xl hover:text-secondary-800 cursor-pointer">
                                <BiEdit />
                            </span>
                        </label>
                        <input type="file" id="photo" hidden />
                        {editingVer?.photo?.photo?.link ? (
                            <Image
                                src={editingVer?.photo?.photo?.link}
                                alt="Photo"
                                width={500}
                                height={500}
                                className="w-full max-h-72 object-cover rounded-lg"
                            />
                        ) : (
                            <></>
                        )}
                    </div>
                    <div className="flex gap-2 pt-4">
                        <button
                            onClick={() => setEditingVer(null)}
                            type="button"
                            className="basis-1/2 px-4 py-1 border border-secondary-800 text-secondary-800 hover:bg-secondary-800 hover:text-primary-800 rounded-lg duration-500"
                        >
                            Annuler
                        </button>
                        <button className="basis-1/2 px-4 py-1 border border-secondary-800 text-secondary-800 hover:bg-secondary-800 hover:text-primary-800 rounded-lg duration-500">
                            Enregistrer
                        </button>
                    </div>
                </form>
            </Drawer>
        </AntConfig>
    );
};

export default EditVersion;
