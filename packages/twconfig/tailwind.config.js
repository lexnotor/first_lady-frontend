/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "../../packages/ui/*.{tsx,jsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    100: undefined,
                    200: "#F2F2F2",
                    300: "#D9D9D9",
                    400: undefined,
                    500: "#AEAEAE",
                    600: undefined,
                    700: "#5F5F5F",
                    800: undefined,
                    900: "#2B2B2B",
                },
                secondary: {
                    100: undefined,
                    200: undefined,
                    300: undefined,
                    400: undefined,
                    500: undefined,
                    600: "#263790",
                    700: undefined,
                    800: undefined,
                    900: undefined,
                },
            },
        },
    },
    plugins: [],
};
