/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["www.datocms-assets.com", "avatars.githubusercontent.com"],
  },
  async redirects() {
    return [
      {
        source: "/extension",
        destination:
          "https://chrome.google.com/webstore/detail/inspectgpt/clppmiggpgjclcmgmmlfpcnpckphieik",
        permanent: false,
        basePath: false,
      },
    ];
  },
  // Adding policies:
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(); battery=(); geolocation=(); microphone=()",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
