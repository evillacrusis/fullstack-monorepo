import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Strict mode catches lifecycle bugs early
  reactStrictMode: true,

  // Produces a minimal standalone Node.js server — ideal for Docker
  output: 'standalone',

  // Tree-shake the contracts package directly (no separate build step)
  transpilePackages: ['@repo/contracts', '@repo/env'],

  // Expose only NEXT_PUBLIC_* vars — this is Next.js default behaviour,
  // but listed here explicitly as documentation.
  env: {},
};

export default nextConfig;
