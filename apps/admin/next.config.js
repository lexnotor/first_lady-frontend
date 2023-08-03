module.exports = {
    reactStrictMode: false,
    transpilePackages: ["ui"],
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                port: "",
                pathname: "/dkm0afqqy/**",
            },
            {
                protocol: "https",
                hostname: "cdn.pixabay.com",
                port: "",
                pathname: "/photo/**",
            },
        ],
    },
};
