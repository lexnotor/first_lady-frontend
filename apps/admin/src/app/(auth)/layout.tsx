import ModalManager from "@/components/modals/ModalManager";
import StoreProvider from "@/redux/StoreProvider";
import Link from "next/link";
import "../globals.css";
import logo from "../../assert/logo_dark.png";
import banner from "../../assert/login_bg.png";
import Image from "next/image";

export const metadata = {
    title: "Logo - ",
    description: "Créez un compte",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr">
            <body className="flex">
                <main className="flex flex-col gap-4 h-screen max-w-[1500px] mx-auto p-[7vh]">
                    <h1 className="">
                        <Link href={"/"}>
                            <Image
                                alt="PREMIERE DAME VLISCO"
                                src={logo}
                                width={200}
                                height={200}
                                className="mx-auto"
                            />
                        </Link>
                    </h1>
                    <div className="w-[25rem]">{children}</div>
                </main>
                <div className="grow">
                    <Image
                        alt="PREMIERE DAME VLISCO"
                        src={banner}
                        width={900}
                        height={900}
                        className="mx-auto h-screen object-cover"
                    />
                </div>
                <StoreProvider>
                    <ModalManager />
                </StoreProvider>
            </body>
        </html>
    );
}
