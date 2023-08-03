import ModalManager from "@/components/modals/ModalManager";
import StoreProvider from "@/redux/StoreProvider";
import Link from "next/link";
import "../globals.css";

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
            <body>
                <h1 className="mt-7 ml-[7vh]">
                    <Link href={"/"}>FIRST-LADY</Link>
                </h1>
                <main className="flex gap-4 h-screen max-w-[1500px] mx-auto p-[7vh]">
                    <div className="w-[25rem]">{children}</div>
                    <div className="grow">image</div>
                </main>
                <StoreProvider>
                    <ModalManager />
                </StoreProvider>
            </body>
        </html>
    );
}
