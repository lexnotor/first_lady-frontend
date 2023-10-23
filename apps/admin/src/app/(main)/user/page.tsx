"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { SpinLoader } from "ui";

const Page = () => {
    const [router] = [useRouter()];

    useEffect(() => router.replace("/user/client"), [router]);
    return (
        <div>
            <SpinLoader />
        </div>
    );
};

export default Page;
