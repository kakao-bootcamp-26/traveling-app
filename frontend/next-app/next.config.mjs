/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["tsx", "ts"],
  experimental: {
    externalDir: true,
  },
};

export default nextConfig;
