"use client";
import { ApiResponse } from "@/redux";
import { orderUrl } from "@/redux/helper.api";
import { Line, LineConfig } from "@ant-design/plots";
import axios, { AxiosResponse } from "axios";
import { useEffect, useRef, useState } from "react";

const GraphiqueCard = ({ text }: { text?: string }) => {
    const [data, setData] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());

    const yearRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        asyncFetch(year);
    }, [year]);

    const asyncFetch = async (y: number) => {
        const res: AxiosResponse<ApiResponse<[]>> = await axios.get(
            `${orderUrl.getStats}?year=${y}`
        );

        setData(
            res.data.data.map((item: any) => ({ ...item, nbr: +item.nbr }))
        );
    };
    const config: LineConfig = {
        data,
        padding: "auto",
        xField: "month",
        yField: "nbr",
        autoFit: true,
        smooth: true,
        color: "#f0ff25",
        lineStyle: {
            lineWidth: 1,
        },
        xAxis: {
            grid: { line: { style: { lineWidth: 0, lineHeight: 0 } } },
            line: { style: { lineWidth: 0, stroke: "#f0ff25" } },
            tickInterval: 30,
            min: 0,
        },
        yAxis: {
            grid: {
                line: {
                    style: { lineWidth: 1, lineHeight: 0, stroke: "#d8dd8f" },
                },
            },
            line: { style: { lineWidth: 0, stroke: "#f0ff25" } },
            min: 0,
        },
        tooltip: {
            customContent: (title, data) => {
                if (!data[0]) return <></>;

                const info = data[0]?.data;
                return (
                    <div className="py-2 flex flex-col gap-1">
                        <span>{new Date(info.date).toDateString()}</span>
                        <span>{info.nbr} vente.s</span>
                    </div>
                );
            },
        },
    };

    const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const value = +yearRef.current.value;
        if (isNaN(value) || value < 2000 || value > new Date().getFullYear())
            return alert("Veuillez entrer une année valide");
        setYear(value);
    };
    return (
        <div className="h-80 bg-[#262830] p-4 rounded-xl flex flex-col">
            <h3 className="mb-2 pb-2 font-bold shrink-0 flex justify-between">
                <span>{text}</span>
                <form onSubmit={submit}>
                    <input
                        ref={yearRef}
                        type="number"
                        name=""
                        id=""
                        defaultValue={2023}
                        min={2022}
                        max={new Date().getFullYear()}
                        className="p-2 bg-primary-600 rounded-md w-24"
                    />
                </form>
            </h3>
            <div className="w-full h-full basis-full">
                <Line {...config} />
            </div>
        </div>
    );
};

export default GraphiqueCard;
