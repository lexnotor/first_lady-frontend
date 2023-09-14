"use client";
import { Modal } from "antd";
import { useEffect, useMemo, useState } from "react";
import { AntConfig } from "ui";
import { useNewProductContext } from "../context/NewProductContext";
import Image from "next/image";
import { BsImage } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";

const ModalSection = () => {
    const { editing, versions, setEditing } = useNewProductContext();
    const current = useMemo(
        () => (editing ? versions.find((item) => item.id == editing) : null),
        [editing, versions]
    );

    const [temp, setTemp] = useState<(typeof versions)[number]>({
        description: "",
        id: "",
        price: 0,
        quantity: 0,
        title: "",
        image: null,
    });

    const save = () => {
        current.description = temp.description;
        current.price = temp.price;
        current.quantity = temp.quantity;
        current.title = temp.title;
        current.image = temp.image;
        setEditing(null);
    };

    useEffect(() => {
        setTemp({
            id: current?.id,
            title: current?.title,
            description: current?.description,
            price: current?.price,
            quantity: current?.quantity,
            image: current?.image,
        });
    }, [editing, current]);
    return (
        <AntConfig>
            <Modal
                destroyOnClose
                title={"Editer Variante"}
                footer={false}
                closable={false}
                onCancel={() => setEditing(null)}
                open={!!editing}
                width={600}
            >
                {current ? (
                    <div className="flex gap-4">
                        <div className="flex flex-col gap-4 basis-2/3">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="">Designation</label>
                                <input
                                    type="text"
                                    onChange={(e) =>
                                        setTemp((old) => ({
                                            ...old,
                                            title: e.target.value,
                                        }))
                                    }
                                    className="py-1 px-4 border border-primary-500 rounded-lg bg-transparent"
                                    placeholder="Designation"
                                    value={temp.title}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="">Prix</label>
                                <input
                                    type="text"
                                    onChange={(e) =>
                                        setTemp((old) => ({
                                            ...old,
                                            price: +e.target.value,
                                        }))
                                    }
                                    className="py-1 px-4 border border-primary-500 rounded-lg bg-transparent"
                                    placeholder="Prix"
                                    value={temp.price}
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="">Quantité</label>
                                <input
                                    type="text"
                                    onChange={(e) =>
                                        setTemp((old) => ({
                                            ...old,
                                            quantity: +e.target.value,
                                        }))
                                    }
                                    className="py-1 px-4 border border-primary-500 rounded-lg bg-transparent"
                                    placeholder="Designation"
                                    value={temp.quantity}
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="">Description</label>
                                <textarea
                                    onChange={(e) =>
                                        setTemp((old) => ({
                                            ...old,
                                            description: e.target.value,
                                        }))
                                    }
                                    className="resize-none py-1 px-4 border border-primary-500 rounded-lg bg-transparent"
                                    rows={4}
                                    placeholder="Designation"
                                    value={temp.description}
                                />
                            </div>
                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={save}
                                    className="bg-secondary-800 text-primary-600 py-1 px-4 rounded-lg"
                                >
                                    OK
                                </button>
                                <button
                                    type="button"
                                    onClick={save}
                                    className="border border-secondary-800 text-secondary-800 py-1 px-4 rounded-lg"
                                >
                                    Annuler
                                </button>
                            </div>
                        </div>
                        <div className="basis-1/3">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="photo" className=" flex gap-4">
                                    <span>Photo</span>
                                    <span className="text-2xl hover:text-secondary-800 cursor-pointer">
                                        <BiEdit />
                                    </span>
                                </label>
                                <div className="">
                                    <label>
                                        {temp?.image ? (
                                            <Image
                                                width={500}
                                                alt="Photo"
                                                height={500}
                                                src={URL.createObjectURL(
                                                    temp?.image
                                                )}
                                                className="w-48 max-h-48 object-cover"
                                            />
                                        ) : (
                                            <div className="text-primary-500 flex flex-col gap-2 justify-center items-center w-48 h-40 rounded-lg bg-primary-700 cursor-pointer">
                                                <span className="text-8xl">
                                                    <BsImage />
                                                </span>
                                                <span className="text-[85%]">
                                                    Select Photo
                                                </span>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            name="photo"
                                            id="photo"
                                            hidden
                                            onChange={(e) =>
                                                setTemp((old) => ({
                                                    ...old,
                                                    image: e.target.files.item(
                                                        0
                                                    ),
                                                }))
                                            }
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </Modal>
        </AntConfig>
    );
};

export default ModalSection;
