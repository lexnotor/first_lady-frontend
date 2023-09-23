import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Première Dame",
    description: "Profitez de meilleurs ventes au feminin",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr">
            <body className="flex flex-col">
                <main className="grow">{children}</main>
            </body>
        </html>
    );
}
