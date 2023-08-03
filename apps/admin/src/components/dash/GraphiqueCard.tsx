"use client";
import { Line, LineConfig } from "@ant-design/plots";
import React, { useEffect, useState } from "react";

const GraphiqueCard = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        asyncFetch();
    }, []);

    const asyncFetch = () => {
        fetch(
            "https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json"
        )
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch(() => null);
    };
    const config: LineConfig = {
        data,
        padding: "auto",
        xField: "Date",
        yField: "scales",
        autoFit: true,
        smooth: true,
        color: "#f0ff25",
        lineStyle: {
            lineWidth: 1,
        },
        xAxis: {
            grid: { line: { style: { lineWidth: 0, lineHeight: 0 } } },
            line: { style: { lineWidth: 0, stroke: "#f0ff25" } },
        },
        yAxis: {
            grid: {
                line: {
                    style: { lineWidth: 1, lineHeight: 0, stroke: "#d8dd8f" },
                },
            },
            line: { style: { lineWidth: 0, stroke: "#f0ff25" } },
        },
    };
    return (
        <div className="h-80 bg-[#262830] p-4 rounded-xl flex flex-col">
            <h3 className="mb-2 pb-2 font-bold shrink-0 flex justify-between">
                <span>Graphique</span>
                <span>Selecte</span>
            </h3>
            <div className="w-full h-full basis-full">
                <Line {...config} />
            </div>
        </div>
    );
};

export default GraphiqueCard;
