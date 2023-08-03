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
            }}
        >
            {children}
        </ConfigProvider>
    );
};

export default AntConfig;
