"use client";
import { Modal } from "antd";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { SetStateAction, useEffect, useRef, useState } from "react";

const OrderForm = ({
    address,
    beginPaiement,
    setAddress,
}: {
    setAddress: React.Dispatch<SetStateAction<string>>;
    address: string;
    beginPaiement: () => any;
}) => {
    const mapRef = useRef(null);
    const [isopen, setIsOpen] = useState(false);
    const [point, setPoint] = useState<L.LatLngExpression>(null);
    const addRef = useRef<HTMLInputElement>(null);

    const [map, setMap] = useState(null);

    useEffect(() => {
        if (!isopen) return;
        if (!!map) return;
        const carte = L.map(mapRef.current).setView([0, 0], 5);
        carte.on("click", (e) => {
            setPoint([e.latlng.lat, e.latlng.lng]);
        });
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution:
                // eslint-disable-next-line quotes
                '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(carte);
        setMap(carte);
    }, [isopen, map]);

    useEffect(() => {
        if (!map || !point) return;
        const marker = L.marker(point).addTo(map);
        return () => {
            map.removeLayer(marker);
        };
    }, [map, point]);
    const close = () => {
        setIsOpen(false);
    };

    const submitOrder: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        setAddress(`${addRef.current.value} + @[${point}]`);
        setTimeout(beginPaiement, 500);
    };
    return (
        <div>
            <button
                onClick={() => setIsOpen(true)}
                className="py-1 px-4 rounded-lg bg-red-600 text-white"
            >
                Payer
            </button>
            <Modal
                onCancel={close}
                open={isopen}
                footer={false}
                title={"Livraison"}
            >
                <form onSubmit={submitOrder}>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="">Adresse:</label>
                        <input
                            type="text"
                            className="border rounded-lg px-3 py-2"
                            defaultValue={address}
                            ref={addRef}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="">
                            Plus de precision (cliquer sur un endroit):{" "}
                        </label>
                        <div
                            id="map"
                            className="w-full h-[50vh] bg-slate-400 relative"
                            ref={mapRef}
                        ></div>
                    </div>
                    <button>Annuler</button>
                    <button>Payer</button>
                </form>
            </Modal>
        </div>
    );
};

export default OrderForm;
