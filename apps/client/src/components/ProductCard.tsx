import { ProductVersionInfo } from "@/types";
import Image from "next/image";

const ProductCard = ({ productV }: { productV: ProductVersionInfo }) => {
    return (
        <div className="max-w-sm min-w-[10rem] rounded-b-lg shadow-lg flex flex-col">
            <div className="w-full bg-neutral-100 rounded-t-lg overflow-hidden">
                <Image
                    src={productV?.photo?.photo?.link}
                    width={500}
                    height={500}
                    alt={"Photo manquant"}
                    className="w-full max-h-96 object-contain"
                />
            </div>
            <div className="w-full p-2">
                <p className="text-base">{productV?.price} USD</p>
                <p className="text-[85%] text-neutral-500">
                    {productV?.quantity} restant.e.s
                </p>
                <p className="text-[85%] whitespace-nowrap overflow-hidden text-ellipsis">
                    {productV?.product?.title} - {productV?.title}
                </p>
            </div>
        </div>
    );
};

export default ProductCard;
