/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  images: {
    domains: ['poupex-api.onrender.com'],
  },
}

export default nextConfig
