"use client";
import { useAppSelector } from "@/hooks/useAppSelector";
import { ModalID } from "@/redux/modals/modal.slice";
import React from "react";
import dynamic from "next/dynamic";
const OrderMap = dynamic(() => import("../order/OrderMap"), { ssr: false });

const ModalManager = () => {
    const { modal_id, payload } = useAppSelector((state) => state.modalmanager);

    return modal_id == ModalID.SHOW_MAP ? (
        <OrderMap address={payload} id={modal_id} />
    ) : (
        <></>
    );
};

export default ModalManager;
