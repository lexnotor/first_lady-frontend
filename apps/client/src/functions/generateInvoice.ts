import { orderUrl } from "@/redux/helper.api";
import { ApiResponse, OrderInfo } from "@/types";
import axios, { AxiosResponse } from "axios";
import jsPDF from "jspdf";
import autoTable, { RowInput } from "jspdf-autotable";
import "@/assets/courierprime-normal";

export const generateInvoice = async (orderId: string) => {
    await axios
        .get(orderUrl.getOne(orderId), {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("user_token")}`,
            },
        })
        .then((res: AxiosResponse<ApiResponse<OrderInfo>>) => res.data.data)
        .then((data) => {
            const doc = new jsPDF({ putOnlyUsedFonts: true });
            doc.setFont("courierprime");

            doc.setTextColor("#4c4c4c");
            doc.setFontSize(11);
            doc.text(`SHOP: ${data.shop.title}`, 15, 15);

            doc.setFontSize(9);
            doc.setTextColor("#787878");
            doc.text(`Par: ${data.user.names} (${data.user.username})`, 15, 20);

            doc.text(`Date: ${new Date(data.date).toLocaleString()}`, 15, 25);

            doc.text(`Livraison: ${data.type}`, 15, 30);

            doc.text(`Status: ${data.state}`, 15, 35);

            const body: RowInput[] = data.products.map((item, index) => [
                index + 1,
                `${item.product.title} (${item.product_v.title})`,
                { content: item.quantity, styles: { halign: "right" } },
                {
                    content: "$ " + item.product_v.price,
                    styles: { halign: "right" },
                },
                {
                    content: "$ " + item.quantity * item.product_v.price,
                    styles: { halign: "right" },
                },
            ]);
            const total: RowInput[] = [
                [
                    {
                        content: "Total (usd)",
                        colSpan: 4,
                        styles: { fontStyle: "bold", fontSize: 12 },
                    },
                    {
                        content:
                            "$ " +
                            data.products.reduce(
                                (prev, cur) =>
                                    prev + cur.quantity * cur.product_v.price,
                                0
                            ),
                        styles: { halign: "right", fontSize: 12 },
                    },
                ],
            ];

            autoTable(doc, {
                styles: { font: "courierprime", fontSize: 8 },
                head: [
                    [
                        "N°",
                        "Désignation",
                        "Quantité",
                        "Prix Unitaire (usd)",
                        "Montant (usd)",
                    ],
                ],
                body: [...body, ...total],
                startY: 45,
            });

            doc.save(`facture-${data.user.username}-${Date.now()}`);
        })
        .catch(console.log)
        .catch(() => alert("Impossible de télecharger la facture"));
};
