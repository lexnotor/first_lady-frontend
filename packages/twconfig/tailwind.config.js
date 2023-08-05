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
                    100: "#bcc6fa",
                    200: "#a0abe4",
                    300: "#7a84b9",
                    400: "#5c648a",
                    500: "#414350",
                    600: "#373a45",
                    700: "#262830",
                    800: "#131321",
                    900: "#0b0b18",
                },
                secondary: {
                    100: undefined,
                    200: "#f9f9e8",
                    300: "#fdffda",
                    400: "#faffb3",
                    500: "#edf57f",
                    600: "#f3fe61",
                    700: "#ecf846",
                    800: "#f0ff25",
                    900: "#ebfa14",
                    950: "#8d9700",
                },
            },
        },
    },
    plugins: [],
};
