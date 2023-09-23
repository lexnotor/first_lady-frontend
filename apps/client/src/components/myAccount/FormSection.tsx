"use client";
import { UserInfo } from "@/types";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
    MutableRefObject,
    forwardRef,
    useImperativeHandle,
    useRef,
} from "react";
import { BiEdit } from "react-icons/bi";

const FormSection = forwardRef(function FormSection(
    { data }: { data: UserInfo },
    ref: MutableRefObject<any>
) {
    const emailRef = useRef<HTMLInputElement>(null),
        namesRef = useRef<HTMLInputElement>(null),
        adressRef = useRef<HTMLInputElement>(null);

    const [searchParams] = [useSearchParams()];

    useImperativeHandle(ref, () => {
        return {
            getNewUserData: () => ({
                email: emailRef.current.value,
                names: namesRef.current.value,
                address: adressRef.current.value,
            }),
        };
    });

    return (
        <section className="px-4 mt-6 flex flex-col gap-6">
            <div>
                <p className="text-base mb-2 flex gap-3 items-center">
                    <span>Noms</span>
                    <Link href="?editing=true">
                        <BiEdit />
                    </Link>
                </p>
                <input
                    disabled={!searchParams.get("editing")}
                    type="text"
                    className="border rounded-lg border-neutral-300 w-full py-3 px-4"
                    defaultValue={data?.names}
                    placeholder="Non définie"
                    ref={namesRef}
                />
            </div>
            <div>
                <p className="text-base mb-2 flex gap-3 items-center">
                    <span>Email</span>
                    <Link href="?editing=true">
                        <BiEdit />
                    </Link>
                </p>
                <input
                    disabled={!searchParams.get("editing")}
                    type="email"
                    className="border rounded-lg border-neutral-300 w-full py-3 px-4"
                    defaultValue={data?.email}
                    placeholder="Non définie"
                    ref={emailRef}
                />
            </div>
            <div>
                <p className="text-base mb-2 flex gap-3 items-center">
                    <span>Adresse de livraison</span>
                    <Link href="?editing=true">
                        <BiEdit />
                    </Link>
                </p>
                <input
                    disabled={!searchParams.get("editing")}
                    type="text"
                    className="border rounded-lg border-neutral-300 w-full py-3 px-4"
                    defaultValue={data?.address}
                    placeholder="Non définie"
                    ref={adressRef}
                />
            </div>
        </section>
    );
});

export default FormSection;
