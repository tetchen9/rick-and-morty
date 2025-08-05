import type { NextConfig } from 'next'
import { readFileSync } from 'fs'
import { join } from 'path'

// Read version from package.json
const packageJson = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf8'))

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
  env: {
    NEXT_PUBLIC_VERSION: packageJson.version,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rickandmortyapi.com',
      },
    ],
  }
}

export default nextConfig
