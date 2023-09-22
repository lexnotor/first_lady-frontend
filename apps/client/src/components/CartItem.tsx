import no_image from "@/assets/no_image.png";
import { CartProductInfo } from "@/types";
import Image from "next/image";

const CartItem = ({ item }: { item: CartProductInfo }) => {
    return (
        <div key={item?.id} className="flex gap-2">
            <div className="w-28 h-28 rounded-lg overflow-hidden">
                <Image
                    src={item?.product_v?.photo?.photo?.link ?? no_image}
                    alt="Image produit"
                    width={300}
                    height={300}
                    className="max-w-full h-full object-cover mx-auto"
                />
            </div>
            <div className="grow">
                <h3 className="">{item?.product?.title}</h3>
                <h4 className="text-neutral-500 italic">
                    {item?.product_v?.title}
                </h4>
                <p className="text-[85%] text-neutral-500">
                    {item?.product_v?.description?.slice(0, 50)}
                </p>
                <p className="flex justify-between mt-auto">
                    <span className="text-[105%]">
                        {item?.product_v?.price}
                    </span>
                    <span>x {item?.quantity}</span>
                </p>
            </div>
        </div>
    );
};

export default CartItem;
