"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
    const router = useRouter();
    const pathname = usePathname();
    useEffect(() => router.replace(`${pathname}/pend`));
    return <section className="px-5"></section>;
};

export default Page;
