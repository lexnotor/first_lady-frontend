"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const NotFound = () => {
    const router = useRouter();
    useEffect(() => router.replace("/dash"));
    return <div>NotFound</div>;
};

export default NotFound;
