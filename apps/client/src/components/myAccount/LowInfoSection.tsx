import React from "react";
import no_image from "@/assets/no_user.png";
import Image from "next/image";
import { UserInfo } from "@/types";

const LowInfoSection = ({ data }: { data: UserInfo }) => {
    return (
        <header className="flex flex-col justify-center mt-4 gap-2 items-center">
            <Image
                src={no_image}
                alt="Profile"
                width={500}
                height={500}
                className="w-32 aspect-square rounded-full border-8 border-slate-400/30"
            />
            <p className="text-2xl font-bold">{data?.names}</p>
            <p className="text-neutral-400 italic">@{data?.username}</p>
        </header>
    );
};

export default LowInfoSection;
