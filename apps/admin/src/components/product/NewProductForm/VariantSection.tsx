"use client";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useNewProductContext } from "../context/NewProductContext";
import Image from "next/image";
import { BsImage } from "react-icons/bs";

const VariantSection = () => {
    const { addVersion, deleteVersion, versions, setEditing } =
        useNewProductContext();
    return (
        <section className="shrink-0 w-96 p-4 bg-primary-600 rounded-lg">
            <h3 className="flex justify-between items-center mb-4">
                <span className="font-bold text-lg">Variants</span>
                <button
                    onClick={addVersion}
                    type="button"
                    className="hover:bg-secondary-800 text-secondary-800 border-secondary-800 border hover:text-primary-600 py-1 px-4 rounded-lg"
                >
                    Ajouter une variante
                </button>
            </h3>
            <ul>
                {versions.map((item) => (
                    <li
                        key={item.id}
                        className="flex py-1 items-center justify-start gap-2"
                    >
                        <div>
                            {item.image ? (
                                <Image
                                    alt="photo"
                                    width={400}
                                    height={400}
                                    src={URL.createObjectURL(item.image)}
                                    className="w-8 h-8 rounded-lg shadow-lg object-cover"
                                />
                            ) : (
                                <span className="text-2xl">
                                    <BsImage />
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <h5 className="flex gap-2 items-center font-bold">
                                <span>{item.title || "Titre"}</span>
                                <span className="text-lg">
                                    <BiEdit />
                                </span>
                            </h5>
                            <p className="text-primary-400 text-[85%]">
                                {item.description.slice(0, 100) ||
                                    "Description ..."}
                            </p>
                            <p className="flex gap-2 text-[85%]">
                                <span>{item.price ?? 0} USD</span>
                                <span>|</span>
                                <span>x {item.quantity ?? 0}</span>
                            </p>
                        </div>
                        <div className="text-2xl ml-auto">
                            <button
                                type="button"
                                onClick={() => deleteVersion(item.id)}
                                className="hover:text-red-400"
                            >
                                <BiTrash />
                            </button>
                            <button
                                type="button"
                                onClick={() => setEditing(item.id)}
                                className="hover:text-secondary-800"
                            >
                                <BiEdit />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default VariantSection;
