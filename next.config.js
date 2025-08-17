const path = require("path");
console.log(path);
/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: ["./src/style"],
  },
  serverExternalPackages: ["@react-pdf/renderer"],
  allowedDevOrigins: ["localhost:3000", "192.168.1.25"], // Ajout pour cross-origin
  compress: false,
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
