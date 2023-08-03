"use client";
import useAuth from "@/hooks/useAuth";
import { Modal } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "ui";

const AuthManager = () => {
    const { isLogin } = useAuth();

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => setIsOpen(!isLogin), [isLogin]);

    return (
        <Modal closable={false} footer={null} open={isOpen} destroyOnClose>
            <div className="flex flex-col gap-4 items-center justify-center">
                <h4 className="font-bold">Espace reservé</h4>
                <Button size="small">
                    <Link href={"/login"}>Connectez-vous</Link>
                </Button>
            </div>
        </Modal>
    );
};

export default AuthManager;
