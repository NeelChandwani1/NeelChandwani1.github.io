/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/NeelChandwani1.github.io' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://NeelChandwani1.github.io/' : '',
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
}

module.exports = nextConfig
