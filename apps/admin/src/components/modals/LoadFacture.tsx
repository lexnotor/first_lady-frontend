"use client";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import usePdfFacture from "@/hooks/usePdfFacture";
import { setInvoiceId } from "@/redux/order/order.slice";
import { Modal } from "antd";
import Link from "next/link";
import { SpinLoader } from "ui";

const LoadFacture = () => {
    const dispatch = useAppDispatch();
    const { invoiceId: id } = useAppSelector((state) => state.order);

    const { url } = usePdfFacture(id);

    return (
        <Modal open={!!id} onCancel={() => dispatch(setInvoiceId())}>
            {url ? (
                <Link
                    href={url}
                    target="_blank"
                    rel="no-opener"
                    className="cursor-pointer px-4 py-1 text-secondary-800 border border-secondary-800 hover:bg-secondary-800  hover:text-black transition-colors duration-500 rounded-lg"
                >
                    Facture
                </Link>
            ) : (
                <>
                    <SpinLoader />
                </>
            )}
        </Modal>
    );
};

export default LoadFacture;
