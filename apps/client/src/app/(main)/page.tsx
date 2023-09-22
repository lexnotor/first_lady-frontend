"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        router.push("/shop");
    }, [router]);
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <span className="w-32 h-32 border-2 border-transparent border-t-red-600 animate-spin rounded-full" />
        </main>
    );
}
