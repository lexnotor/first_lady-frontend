"use client";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { ModalID, closeModal } from "@/redux/modals/modal.slice";
import { Modal } from "antd";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useMemo, useRef, useState } from "react";

const OrderMap = ({ address }: { address: string; id: ModalID }) => {
    const mapRef = useRef(null);
    const [isopen] = useState(true);
    const dispatch = useAppDispatch();
    const point = useMemo(() => {
        const reg = /@\[([0-9\-.]+,[0-9\-.]+)\]$/i.exec(address);
        if (!reg) return null;
        return reg[1]
            .split(",")
            .map((item) => parseFloat(item)) as L.LatLngExpression;
    }, [address]);

    const [map, setMap] = useState<L.Map>(null);

    useEffect(() => {
        if (!point) return;
        if (!isopen) return;
        if (!!map) return;
        const carte = L.map(mapRef.current).setView([0, 0], 5);

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution:
                // eslint-disable-next-line quotes
                '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(carte);
        setMap(carte);
    }, [isopen, map, point]);

    useEffect(() => {
        if (!map || !point) return;
        const marker = L.marker(point).addTo(map);
        map.setView(point, 5);
        return () => {
            map.removeLayer(marker);
        };
    }, [map, point]);

    const close = () => {
        dispatch(closeModal());
    };

    const extractAddress = (str) => {
        const reg = str.replace(/\+ @\[([0-9\-.]+,[0-9\-.]+)\]$/i, "").trim();
        return reg ? reg : "Aucune";
    };
    return (
        <>
            <Modal
                onCancel={close}
                open={true}
                footer={false}
                title={"Livraison"}
            >
                <h3 className="mb-4">
                    <span className="">Reference: </span>
                    <span className="text-[115%] font-bold">
                        {extractAddress(address)}
                    </span>
                </h3>
                {point && (
                    <div
                        id="map"
                        className="w-full h-[50vh] bg-slate-400 relative"
                        ref={mapRef}
                    />
                )}
            </Modal>
        </>
    );
};

export default OrderMap;
