import { ProductVersionInfo } from "@/types";
import Image from "next/image";
import no_image from "@/assets/no_image.png";

const ProductCard = ({ productV }: { productV: ProductVersionInfo }) => {
    return (
        <div className="max-w-sm h-full min-w-[10rem] rounded-b-lg shadow-lg flex flex-col">
            <div className="basis-2/3 w-full bg-neutral-100 rounded-t-lg overflow-hidden">
                <Image
                    src={productV?.photo?.photo?.link ?? no_image}
                    width={500}
                    height={500}
                    alt={"Photo manquant"}
                    className="w-full max-h-96 h-full object-cover"
                />
            </div>
            <div className="w-full p-2 mt-auto">
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
