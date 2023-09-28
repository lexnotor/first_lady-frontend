import no_image from "@/assets/no_image.png";
import { generateInvoice } from "@/functions/generateInvoice";
import { OrderInfo } from "@/types";
import Image from "next/image";
import { BiPrinter } from "react-icons/bi";

enum OrderState {
    DONE = "TERMINER",
    PENDING = "EN_COURS",
    ERROR = "ERREUR",
}

const OrderCard = ({ order }: { order: OrderInfo }) => {
    return (
        <div className="py-3 px-4">
            <h2 className="flex justify-between mb-3">
                <span className="text-neutral-500 italic">
                    {order?.state == OrderState.DONE
                        ? "Terminée"
                        : order?.state == OrderState.ERROR
                        ? "Annulée"
                        : "En cours de traitement"}
                </span>
                <span>{new Date(order?.created_at).toLocaleDateString()}</span>
            </h2>
            <ul>
                {order.products.map((product) => {
                    return (
                        <li key={product?.id} className="flex gap-2">
                            <div className="w-20 h-20 rounded-lg overflow-hidden">
                                <Image
                                    src={
                                        product?.product_v?.photo?.photo
                                            ?.link ?? no_image
                                    }
                                    alt="Image produit"
                                    width={300}
                                    height={300}
                                    className="max-w-full h-full object-cover mx-auto"
                                />
                            </div>
                            <div className="grow">
                                <h3 className="">{product?.product?.title}</h3>
                                <h4 className="text-neutral-500 italic">
                                    {product?.product_v?.title}
                                </h4>
                                <p className="text-[85%] text-neutral-500">
                                    {product?.product_v?.description?.slice(
                                        0,
                                        50
                                    )}
                                </p>
                                <p className="flex justify-between mt-auto">
                                    <span className="text-[105%]">
                                        {product?.product_v?.price}
                                    </span>
                                    <span>x {product?.quantity}</span>
                                </p>
                            </div>
                        </li>
                    );
                })}
            </ul>
            <footer className="flex justify-end">
                <button
                    onClick={() => generateInvoice(order?.id)}
                    className="flex items-center gap-2 py-2 px-4 bg-red-500 text-white rounded-lg"
                >
                    <span className="text-base">
                        <BiPrinter />
                    </span>
                    <span>Facture</span>
                </button>
            </footer>
        </div>
    );
};

export default OrderCard;
