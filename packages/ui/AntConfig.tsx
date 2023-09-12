"use client";

import { ConfigProvider } from "antd";
import React from "react";

const AntConfig = ({ children }: { children: React.ReactNode }) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#9539f1",
                    colorTextBase: "#1d1c1c",
                },
                components: {
                    Modal: {
                        contentBg: "#131321",
                        headerBg: "#131321",
                        footerBg: "#131321",
                        titleColor: "#e8e8e8",
                        colorText: "#e8e8e8",
                    },
                    Drawer: {
                        colorBgElevated: "#131321",
                        colorBgContainer: "#131321",
                        colorTextBase: "#e8e8e8",
                        colorTextHeading: "#e8e8e8",
                        colorIcon: "#e8e8e8",
                        colorIconHover: "#dbe438",
                        colorText: "#e8e8e8",
                    },
                    Popover: {
                        padding: 0,
                        colorBgElevated: "#222238",
                        colorText: "#e8e8e8",
                    },
                },
            }}
        >
            {children}
        </ConfigProvider>
    );
};

export default AntConfig;
