import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  outputFileTracingIncludes: { './**': ['../design/**/*'] },
  images: { unoptimized: true },
}

export default nextConfig
