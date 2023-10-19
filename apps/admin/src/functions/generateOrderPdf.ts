import { OrderState } from "@/components/order";
import { ApiResponse, OrderInfo } from "@/redux";
import { orderUrl } from "@/redux/helper.api";
import axios, { AxiosResponse } from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../assert/courierprime-normal";
import logo from "../assert/logo_dark.png";

export const generatePdf = (query: URLSearchParams, status?: OrderState) => {
    status && query.set("state", status);

    axios
        .get(orderUrl.findOrders + "?" + query.toString(), {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(
                    "session_token"
                )}`,
            },
        })
        .then((res: AxiosResponse<ApiResponse<OrderInfo[]>>) => res.data.data)
        .then((data) => {
            const doc = new jsPDF({ putOnlyUsedFonts: true });

            doc.setFont("courierprime");

            doc.setTextColor("#4c4c4c");
            doc.setFontSize(11);
            const image = new Image();
            image.src = logo.src;
            doc.addImage(
                image,
                "JPEG",
                10,
                10,
                50,
                (logo.height * 50) / logo.width
            );

            doc.setTextColor("#787878");

            doc.text(`Liste Produit - ${new Date().toLocaleString()}`, 15, 35);
            doc.text(`${query.toString().replace("&", " ")}`, 15, 40);

            doc.setFontSize(10);

            autoTable(doc, {
                styles: { font: "courierprime", fontSize: 8 },
                head: [
                    ["N°", "Utilisateur", "Date", "Items", "Type", "Status"],
                ],
                body: data.map((item, index) => [
                    index + 1,
                    item.user.username,
                    new Date(item.date).toLocaleDateString(),
                    item.products.length,
                    item.type,
                    item.state,
                ]),
                startY: 50,
            });

            doc.save(`order-summary-${Date.now()}`);
        })
        .catch(alert);
    return query;
};
