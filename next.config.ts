import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "k.kakaocdn.net",
                pathname: "/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg",
            }
        ]
    },
};

export default nextConfig;
