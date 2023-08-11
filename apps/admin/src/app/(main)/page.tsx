"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SpinLoader } from "ui";

export default function Home() {
    const router = useRouter();
    useEffect(() => {
        router.replace("/dash");
    });
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <SpinLoader />
        </main>
    );
}
