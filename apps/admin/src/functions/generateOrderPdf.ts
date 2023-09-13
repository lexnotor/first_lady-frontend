import { OrderState } from "@/components/order";
import { ApiResponse, OrderInfo } from "@/redux";
import { orderUrl } from "@/redux/helper.api";
import axios, { AxiosResponse } from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../assert/courierprime-normal";

export const generatePdf = (query: URLSearchParams, status?: OrderState) => {
    status && query.set("state", status);

    axios
        .get(orderUrl.findOrders + "?" + query.toString())
        .then((res: AxiosResponse<ApiResponse<OrderInfo[]>>) => res.data.data)
        .then((data) => {
            const doc = new jsPDF({ putOnlyUsedFonts: true });

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
            });

            doc.save(`order-summary-${Date.now()}`);
        })
        .catch(alert);
    return query;
};
