import { ApiResponse } from "@/redux";
import { productUrl } from "@/redux/helper.api";
import axios, { AxiosResponse } from "axios";
import jsPDF from "jspdf";
import autotable from "jspdf-autotable";

type SummaryResponse = {
    product: string;
    version: string;
    category: string;
    price: number;
    quantity: number;
};

export const generatePdf = async (query: URLSearchParams) => {
    const res: AxiosResponse<ApiResponse<SummaryResponse[]>> = await axios.get(
        productUrl.getProductSummary + "?" + query.toString()
    );
    const doc = new jsPDF({ putOnlyUsedFonts: true });

    autotable(doc, {
        styles: { font: "cultivemono", fontSize: 8 },
        head: [["Produit", "Variant", "Categorie", "Prix", "Quantité"]],
        body: res.data.data.map((item) => [
            item.product,
            item.version,
            item.category,
            item.price,
            item.quantity,
        ]),
    });

    doc.save(`product-summary-${Date.now()}`);
};
