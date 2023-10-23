"use client";
import { Modal } from "antd";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useRef, useState } from "react";
import { BiCreditCard } from "react-icons/bi";

const OrderForm = ({
    beginPaiement,
}: {
    beginPaiement: (address: string) => any;
}) => {
    const mapRef = useRef(null);
    const [isopen, setIsOpen] = useState(false);
    const [point, setPoint] = useState<L.LatLngExpression>(null);
    const addRef = useRef<HTMLInputElement>(null);

    const [map, setMap] = useState<L.Map>(null);

    const [delivery, toggleDelevery] = useState(false);

    useEffect(() => {
        if (!isopen || !delivery || !mapRef.current) {
            if (map) {
                map.remove();
                setMap(null);
            }
            return;
        }
        if (!!map) return;
        const carte = L.map(mapRef.current).setView(
            [-1.6795622403793975, 29.23368036746979],
            5
        );
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
    }, [isopen, map, delivery]);

    useEffect(() => {
        if (!map || !point || !delivery) return;
        const marker = L.marker(point).addTo(map);
        return () => {
            map.removeLayer(marker);
        };
    }, [map, point, delivery]);
    const close = () => {
        setIsOpen(false);
    };

    const submitOrder: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (delivery && !point && !addRef.current.value.trim())
            return alert("Veillez preciser une adresse");
        // delivery
        //     ? setAddress(`${addRef.current.value} + @[${point}]`)
        //     : setAddress(undefined);
        setTimeout(
            () =>
                beginPaiement(
                    delivery
                        ? `${addRef.current.value} + @[${point}]`
                        : undefined
                ),
            500
        );
    };
    return (
        <div>
            <button
                onClick={() => setIsOpen(true)}
                className="py-1 px-4 rounded-lg bg-red-600 text-white flex gap-2 justify-center items-center"
            >
                <span className="text-[150%]">
                    <BiCreditCard />
                </span>
                <span>Payer</span>
            </button>
            <Modal
                onCancel={close}
                open={isopen}
                footer={false}
                title={"Livraison"}
                destroyOnClose
            >
                <form onSubmit={submitOrder}>
                    <div className="flex gap-2 ">
                        <input
                            type="radio"
                            name="delivery"
                            id="delivery-on"
                            checked={!delivery}
                            onChange={() => toggleDelevery(false)}
                        />
                        <label htmlFor="delivery-on">
                            Je viendrais prendre mon colis à la boutique
                        </label>
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="radio"
                            name="delivery"
                            id="delivery-of"
                            checked={delivery}
                            onChange={() => toggleDelevery(true)}
                        />
                        <label htmlFor="delivery-of">
                            Je préfére être livré
                        </label>
                    </div>
                    {delivery && (
                        <div className="flex flex-col gap-2 mb-4">
                            <label htmlFor="">Adresse:</label>
                            <input
                                type="text"
                                className="border rounded-lg px-3 py-2"
                                placeholder="Réference ..."
                                ref={addRef}
                            />
                        </div>
                    )}
                    {delivery && (
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
                    )}
                    <footer className="pt-4 flex justify-end gap-5">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setIsOpen(false);
                            }}
                            className="py-1 px-4 rounded-lg bg-red-600 text-white"
                        >
                            Annuler
                        </button>
                        <button className="py-1 px-4 rounded-lg bg-red-600 text-white">
                            Payer
                        </button>
                    </footer>
                </form>
            </Modal>
        </div>
    );
};

export default OrderForm;
