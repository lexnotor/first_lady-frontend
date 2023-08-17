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
            compress: true,
            putOnlyUsedFonts: true,
        });

        await doc.html(html.data, {
            width: 400,
            windowWidth: 500,
            margin: [20, 20, 20, 20],
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
