import type { NextConfig } from "next";

/**
 * Cache policy (host-agnostic):
 * - /r/* JSON: stable URLs, changing content → revalidate, never immutable
 * - /chart/* thumbs: same path after re-export → must not stick on old bytes
 * - /_next/static/*: leave Next defaults (content-hashed, long-lived)
 * - Docs HTML: static at build; freshness via next production deploy
 */
const revalidateImmediately = [
  {
    key: "Cache-Control",
    value: "public, max-age=0, must-revalidate",
  },
] as const;

const nextConfig: NextConfig = {
  // Workspace package — must transpile + watch for HMR
  transpilePackages: ["@sonojs/ui"],
  // Keep Shiki off Turbopack transforms (token colors / grammars stay intact)
  serverExternalPackages: ["shiki"],
  // Slow disks freeze on Turbopack FS cache compaction — disable in local dev
  experimental: {
    turbopackFileSystemCacheForDev: false,
  },
  async redirects() {
    return [
      {
        source: "/blocks/login-01",
        destination: "/blocks/authentication/login",
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        // Stable URLs, changing JSON — never immutable
        source: "/r/:path*",
        headers: [...revalidateImmediately],
      },
      {
        // Gallery thumbs keep stable filenames; bust sticky browser cache after re-shot
        source: "/chart/:path*",
        headers: [...revalidateImmediately],
      },
      // Proven on next start: static docs defaulted to s-maxage=31536000.
      // Keep deploy freshness without disabling hashed /_next/static caching.
      {
        source: "/docs",
        headers: [...revalidateImmediately],
      },
      {
        source: "/docs/:path*",
        headers: [...revalidateImmediately],
      },
      {
        source: "/tools",
        headers: [...revalidateImmediately],
      },
      {
        source: "/tools/:path*",
        headers: [...revalidateImmediately],
      },
    ];
  },
};

export default nextConfig;
