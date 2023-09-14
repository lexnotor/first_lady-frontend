"use client";

import { useAppSelector } from "@/hooks/useAppSelector";
import { useMemo } from "react";

const FloatingLoader = () => {
    const { thread } = useAppSelector((state) => state.product);
    const isLoading = useMemo(
        () => !!thread.find((item) => item.status == "LOADING"),
        [thread]
    );
    return isLoading ? (
        <div className="fixed bottom-9 right-9 w-12 h-12 bg-white/60 shadow-2xl rounded-full flex justify-center items-center">
            <div className="border-4 border-t-primary-800 rounded-full w-9 h-9 animate-spin" />
        </div>
    ) : (
        <></>
    );
};

export default FloatingLoader;
