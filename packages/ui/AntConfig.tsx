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
                },
            }}
        >
            {children}
        </ConfigProvider>
    );
};

export default AntConfig;
