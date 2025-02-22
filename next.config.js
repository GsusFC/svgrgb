/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  basePath: '/svgrgb',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
