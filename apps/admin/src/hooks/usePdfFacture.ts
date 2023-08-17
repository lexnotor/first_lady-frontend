"use client";
import { invoiceUrl } from "@/redux/helper.api";
import axios from "axios";
import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";

const usePdfFacture = (id: string) => {
    const [url, setUrl] = useState(null);

    const getHTML = async (orderId: string) => {
        const html = await axios.get(
            `${invoiceUrl.getOrderInvoice}/${orderId}`
        );

        const doc = new jsPDF({
            unit: "px",
            format: [500, 500],
        });

        await doc.html(html.data, {
            width: 500,
            windowWidth: 500,
            margin: 0,
            autoPaging: "text",
        });

        // doc.output("pdfobjectnewwindow");
        setUrl(doc.output("bloburi").toString());
    };

    useEffect(() => {
        if (id) getHTML(id);
    }, [id]);

    return { url };
};

export default usePdfFacture;
