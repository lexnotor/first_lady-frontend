import { ApiResponse } from "@/redux";
import { productUrl } from "@/redux/helper.api";
import axios, { AxiosResponse } from "axios";
import jsPDF from "jspdf";
import autotable from "jspdf-autotable";
import "../assert/courierprime-normal";
import logo from "../assert/logo_dark.png";
// https://peckconsulting.s3.amazonaws.com/fontconverter/fontconverter.html
type SummaryResponse = {
    product: string;
    version: string;
    category: string;
    price: number;
    quantity: number;
};

export const generatePdf = (query: URLSearchParams) => {
    axios
        .get(productUrl.getProductSummary + "?" + query.toString(), {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(
                    "session_token"
                )}`,
            },
        })
        .then(
            (res: AxiosResponse<ApiResponse<SummaryResponse[]>>) =>
                res.data.data
        )
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

            autotable(doc, {
                styles: { font: "courierprime", fontSize: 8 },
                head: [
                    [
                        "N°",
                        "Produit",
                        "Variant",
                        "Categorie",
                        "Prix",
                        "Quantité",
                    ],
                ],
                body: data.map((item, index) => [
                    index + 1,
                    item.product,
                    item.version,
                    item.category,
                    item.price,
                    item.quantity,
                ]),
                startY: 50,
            });

            doc.save(`product-summary-${Date.now()}`);
        })
        .catch(alert);
};
