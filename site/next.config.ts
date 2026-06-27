import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  outputFileTracingIncludes: { './**': ['../design/**/*'] },
  images: { unoptimized: true },
}

export default nextConfig
