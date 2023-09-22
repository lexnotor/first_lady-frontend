"use client";
import no_image from "@/assets/no_image.png";
import { ProductVersionInfo } from "@/types";
import Image from "next/image";
import {
    useState,
    useImperativeHandle,
    MutableRefObject,
    forwardRef,
} from "react";
import { BiMinus, BiPlus } from "react-icons/bi";

const ItemSection = forwardRef(function ItemSection(
    { productV }: { productV: ProductVersionInfo },
    ref: MutableRefObject<any>
) {
    const [quantity, setQuantity] = useState(1);

    useImperativeHandle(ref, () => {
        return {
            getQuantity() {
                return quantity;
            },
        };
    });

    return (
        <>
            <header className="flex gap-4">
                <div className="w-32 h-32 ">
                    <Image
                        src={productV?.photo?.photo?.link ?? no_image}
                        height={500}
                        width={500}
                        alt="productv"
                        className="w-full aspect-square object-contain rounded-lg shadow-md"
                    />
                </div>
                <div className="grow">
                    <h3 className="font-bold">{productV?.product?.title}</h3>
                    <h4 className="text-neutral-500 text-[85%]">
                        {productV?.title}
                    </h4>
                    <p>{productV?.description.slice(0, 40)}...</p>
                    <div className="flex justify-between">
                        <span className="text-[115%] font-bold">
                            {productV?.price} USD
                        </span>
                        <div className="flex gap-2 items-center">
                            <span
                                onClick={() => setQuantity((old) => --old || 1)}
                                className="active:bg-red-600 active:text-white p-1 border border-red-600 text-red-600 rounded-md self-center aspect-square"
                            >
                                <BiMinus />
                            </span>
                            <span>{quantity}</span>
                            <span
                                onClick={() => setQuantity((old) => ++old || 1)}
                                className="active:bg-red-600 active:text-white p-1 border border-red-600 text-red-600 rounded-md self-center aspect-square"
                            >
                                <BiPlus />
                            </span>
                        </div>
                    </div>
                </div>
            </header>
            <h2 className="font-bold text-[115%] mt-5">Description</h2>
        </>
    );
});

export default ItemSection;
