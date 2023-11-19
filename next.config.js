/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                pathname: "**",
            },
        ],
    },
    experimental: {
        swcPlugins: [["@swc-jotai/react-refresh", {}]],
    },
};

module.exports = nextConfig;
