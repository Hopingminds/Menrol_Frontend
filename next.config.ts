// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["example.com", "menrol.s3.ap-south-1.amazonaws.com"], // Add the required domain here
  },
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
  },
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;

