import Header from "@/components/sidebar/Header";
import AuthManager from "@/components/auth/AuthManager";
import StoreProvider from "@/redux/StoreProvider";
import type { Metadata } from "next";
import "../globals.css";

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
            <body className="text-neutral-100 bg-[#0b0b18] min-w-[1240px]">
                <div className="flex justify-center h-screen max-w-[1500px] mx-auto">
                    <div className="w-64 overflow-y-auto shrink-0 h-full">
                        <Header />
                    </div>
                    <main className="grow max-h-full overflow-y-auto">
                        {children}
                    </main>
                </div>

                <StoreProvider>
                    <AuthManager />
                </StoreProvider>
            </body>
        </html>
    );
}
