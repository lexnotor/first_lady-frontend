const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
    extends: [
        "next",
        "turbo",
        "prettier",
        "plugin:@typescript-eslint/recommended",
    ],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint/eslint-plugin", "prettier"],
    rules: {
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@next/next/no-html-link-for-pages": "off",
        "react/no-unescaped-entities": 0,
        quotes: ["warn", "double"],
        "jsx-quotes": ["warn", "prefer-double"],
        semi: ["warn", "always"],
        "react/prop-types": "off",
        "react/no-unescaped-entities": "off",
        "prettier/prettier": "warn",
        "no-console": "error",
    },
    parserOptions: {
        // project: "tsconfig.json",
        sourceType: "module",
    },
});
