import StoreProvider from "@/redux/StoreProvider";
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthManager from "@/components/auth/AuthManager";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Dashboard - Admin",
    description: "Admin Dashboard",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr">
            <body className={inter.className}>
                <>{children}</>
                <StoreProvider>
                    <AuthManager />
                </StoreProvider>
            </body>
        </html>
    );
}
