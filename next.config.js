/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /* 
     Essential for Cardano DApps: 
     Enables WebAssembly and layers for Mesh SDK/Serialization Lib 
  */
  webpack: (config) => {
    config.experiments = { 
      asyncWebAssembly: true,
      layers: true 
    };
    return config;
  },
};
module.exports = nextConfig;