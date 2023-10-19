import { ApiResponse, UserInfo } from "@/redux";
import { userUrl } from "@/redux/helper.api";
import axios, { AxiosResponse } from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../assert/courierprime-normal";
import logo from "../assert/logo_dark.png";

const generatePdf = (query: URLSearchParams) => {
    query.set("page", "0");
    axios
        .get(userUrl.findUser(query.toString()), {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(
                    "session_token"
                )}`,
            },
        })
        .then((res: AxiosResponse<ApiResponse<UserInfo[]>>) => res.data.data)
        .then(async (data) => {
            const doc = new jsPDF({
                putOnlyUsedFonts: true,
                orientation: "landscape",
            });
            const extractRole = (user: UserInfo) => {
                return (
                    (Array.isArray(user.shops) &&
                        user.shops[0] &&
                        user.shops[0].roles) ||
                    []
                );
            };

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

            doc.text(
                `Liste utilisateur - ${new Date().toLocaleString()}`,
                15,
                35
            );
            doc.text(`${query.toString().replace("&", " ")}`, 15, 40);

            autoTable(doc, {
                styles: { font: "courierprime", fontSize: 9 },
                head: [
                    [
                        "N°",
                        "id",
                        "Noms",
                        "username",
                        "Email",
                        "Addresse",
                        "Créer le",
                        "Roles",
                    ],
                ],
                body: data.map((item, index) => [
                    index + 1,
                    item.id,
                    item.names,
                    item.username,
                    item.email,
                    item.address,
                    new Date(item.created_at).toLocaleDateString(),
                    extractRole(item).reduce(
                        (prev, cur) => `${prev} ${cur.role.title},`,
                        ""
                    ),
                ]),
                startY: 50,
            });
            doc.save(`user-list-${Date.now()}`);
        });
};

export default generatePdf;
