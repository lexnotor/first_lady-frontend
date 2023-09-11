import { ApiResponse } from "@/redux";
import { productUrl } from "@/redux/helper.api";
import axios, { AxiosResponse } from "axios";
import jsPDF from "jspdf";
import autotable from "jspdf-autotable";
import "../assert/courierprime-normal";
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
        .get(productUrl.getProductSummary + "?" + query.toString())
        .then(
            (res: AxiosResponse<ApiResponse<SummaryResponse[]>>) =>
                res.data.data
        )
        .then((data) => {
            const doc = new jsPDF({ putOnlyUsedFonts: true });

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
            });

            doc.save(`product-summary-${Date.now()}`);
        })
        .catch(alert);
};
