import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "static.hanet.ai",
            },
        ],
    },
};

export default nextConfig;
