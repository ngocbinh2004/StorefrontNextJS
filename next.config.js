/** @type {import('next').NextConfig} */
const nextConfig = {
  // cacheHandler: require.resolve('./cache-handler.mjs'),
  // cacheMaxMemorySize: 0, // disable default in-memory caching
  async rewrites() {
    return {
      afterFiles: [
        {
          source: "/order-success/:haskey", //  
          destination: "/ordersuccess?_rewrite=1",
        },
        {
          source: "/search", // Search Product
          destination: "/catalog/search?_rewrite=1",
        },
        {
          source: "/:categoryslug/:productslug", // Product Detail 
          destination: "/catalog/detail?_rewrite=1",
        },
        {
          source: "/:categoryslug", // Product Category 
          destination: "/catalog?_rewrite=1",
        },
        {
          source: "/news/:categoryslug", // News Category
          destination: "/news?_rewrite=1",
        },
        {
          source: "/news/:categoryslug/:newsslug", // news Detail 
          destination: "/news/detail?_rewrite=1",
        },
      ],
      fallback: [
        {
          source: "/:slug", // catchall routes
          destination: "/landing?_rewrite=1", // Landing page
        },
      ],
    };
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.oviro.vn",
        port: "",
      },
    ],
  },
}

module.exports = nextConfig
