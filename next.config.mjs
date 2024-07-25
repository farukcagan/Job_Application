/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["avatars.githubusercontent.com","cloudflare-ipfs.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
