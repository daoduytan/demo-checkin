import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    output: "standalone",
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
