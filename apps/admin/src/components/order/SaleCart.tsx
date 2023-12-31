"use client";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useLocatCart } from "@/hooks/useLocalCart";
import { OrderInfo } from "@/redux";
import { invoiceUrl } from "@/redux/helper.api";
import {
    emptyCart,
    removeItem,
    saveLocalOrder,
    setItemQty,
} from "@/redux/order/order.slice";
import Image from "next/image";
import { BsImage } from "react-icons/bs";

const SaleCart = () => {
    const { local_cart } = useLocatCart();
    const dispatch = useAppDispatch();

    const submit = async () => {
        if (local_cart.length == 0) return alert("Please add Items in Cart");

        const payload = local_cart.map((item) => ({
            id: item.product_v_id,
            qty: item.quantity,
        }));

        const order = (await dispatch(saveLocalOrder(payload)).then(
            ({ payload }) => {
                dispatch(emptyCart());
                return payload;
            }
        )) as OrderInfo;
        `${invoiceUrl.getOrderInvoice}/${order.id}`;
        alert("SALE_SAVED");
    };

    return (
        <div className="w-full h-full flex flex-col">
            <h2 className="flex justify-between">
                <span>Panier</span>
                <span className="font-bold text-secondary-800">
                    Total:{" "}
                    {local_cart?.reduce(
                        (prev, cur) =>
                            prev + cur.quantity * cur.product_v.price,
                        0
                    )}{" "}
                    USD
                </span>
            </h2>
            <div className="h-[calc(100%-1.5rem-1.5rem)] overflow-y-auto flex flex-col gap-4 mt-4">
                {local_cart.length == 0 ? (
                    <span>Pas de produit</span>
                ) : (
                    local_cart.map((item) => (
                        <div className="flex gap-4" key={item.product_v_id}>
                            {item.product_v?.photo?.photo?.link ? (
                                <Image
                                    width={200}
                                    alt="Photo"
                                    height={200}
                                    src={item.product_v?.photo?.photo?.link}
                                    className="object-cover aspect-square rounded-lg w-8 h-8 self-center shadow-lg"
                                />
                            ) : (
                                <div className="text-primary-500 flex flex-col gap-2 justify-center items-center rounded-lg  cursor-pointer">
                                    <span className="text-3xl">
                                        <BsImage />
                                    </span>
                                </div>
                            )}
                            <p className="flex flex-col">
                                <span className="font-bold">
                                    {item.product.title}
                                </span>
                                <span className="text-primary-300">
                                    {item.product_v.title} -{" "}
                                    {item.product_v.price} $
                                </span>
                            </p>
                            <p className="ml-auto flex items-center gap-2">
                                <button
                                    onClick={() =>
                                        dispatch(
                                            setItemQty({
                                                id: item.product_v_id,
                                                quantity: item.quantity - 1,
                                            })
                                        )
                                    }
                                    className="cursor-pointer text-sm px-2 py-[0px] text-secondary-800 border border-secondary-800 hover:bg-secondary-800 active:!bg-secondary-600 hover:text-black transition-colors duration-500 rounded-3xl"
                                >
                                    -
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                    onClick={() =>
                                        dispatch(
                                            setItemQty({
                                                id: item.product_v_id,
                                                quantity: item.quantity + 1,
                                            })
                                        )
                                    }
                                    className="cursor-pointer text-sm px-2 py-[0px] text-secondary-800 border border-secondary-800 hover:bg-secondary-800 active:!bg-secondary-600 hover:text-black transition-colors duration-500 rounded-3xl"
                                >
                                    +
                                </button>
                                <button
                                    onClick={() =>
                                        dispatch(removeItem(item.product_v_id))
                                    }
                                    className="cursor-pointer text-sm px-2 py-[0px] text-red-300 border border-red-300 hover:bg-red-300 active:!bg-secondary-600 hover:text-black transition-colors duration-500 rounded-3xl"
                                >
                                    x
                                </button>
                            </p>
                        </div>
                    ))
                )}
            </div>
            <footer className="shrink-0 flex gap-4">
                <button
                    onClick={() => dispatch(emptyCart())}
                    className="cursor-pointer w-[50%] px-4 py-1 text-secondary-800 border border-secondary-800 hover:bg-secondary-800 active:!bg-secondary-600 hover:text-black transition-colors duration-500 rounded-3xl"
                >
                    Vider
                </button>
                <button
                    onClick={submit}
                    className="cursor-pointer w-[50%] px-4 py-1 text-secondary-800 border border-secondary-800 hover:bg-secondary-800 active:!bg-secondary-600 hover:text-black transition-colors duration-500 rounded-3xl"
                >
                    Save
                </button>
            </footer>
        </div>
    );
};

export default SaleCart;
