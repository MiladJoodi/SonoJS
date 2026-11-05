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
  // Workspace package - must transpile + watch for HMR
  transpilePackages: ["@sonojs/ui", "@mdxeditor/editor"],
  // Keep Shiki off Turbopack transforms (token colors / grammars stay intact)
  serverExternalPackages: ["shiki"],
  /**
   * Docs/routes that `readFile` registry paths used to pull entire trees into
   * each Vercel Function (public/r alone ~120MB → over the 250MB limit).
   * Registry JSON is served as static `/r/*`; loaders fetch or read one file.
   */
  outputFileTracingExcludes: {
    "*": [
      "./public/r/**",
      "./registry/blocks/**",
      "./registry/charts/**",
      "./node_modules/highcharts/**",
      "./node_modules/highcharts-react-official/**",
    ],
  },
  // Slow disks freeze on Turbopack FS cache compaction - disable in local dev
  experimental: {
    turbopackFileSystemCacheForDev: false,
  },
  // Local block showcase media (video + audio demos)
  turbopack: {
    rules: {
      "*.mp4": {
        type: "asset",
      },
      "*.wav": {
        type: "asset",
      },
      "*.mp3": {
        type: "asset",
      },
      "*.hdr": {
        type: "asset",
      },
    },
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|wav|mp3|hdr)$/i,
      type: "asset/resource",
    })
    return config
  },
  async redirects() {
    return [
      {
        source: "/blocks/login-01",
        destination: "/blocks/authentication/login",
        permanent: true,
      },
      {
        source: "/docs/components/agent-code-block",
        destination: "/ai/code-block",
        permanent: true,
      },
      {
        source: "/docs/components/toast",
        destination: "/docs/components/sonner",
        permanent: true,
      },
      {
        source: "/docs/components/agent-activity",
        destination: "/ai/agent-activity",
        permanent: true,
      },
      {
        source: "/docs/components/agent-activity-2",
        destination: "/ai/agent-activity-2",
        permanent: true,
      },
      {
        source: "/docs/components/ai-sidebar",
        destination: "/ai/ai-sidebar",
        permanent: true,
      },
      {
        source: "/docs/components/approval-card",
        destination: "/ai/approval-card",
        permanent: true,
      },
      {
        source: "/docs/components/attachment",
        destination: "/ai/attachment",
        permanent: true,
      },
      {
        source: "/ai/bubble",
        destination: "/docs/components/bubble",
        permanent: true,
      },
      {
        source: "/docs/components/citations",
        destination: "/ai/citations",
        permanent: true,
      },
      {
        source: "/docs/components/code-block",
        destination: "/ai/code-block",
        permanent: true,
      },
      {
        source: "/docs/components/file-diff",
        destination: "/ai/file-diff",
        permanent: true,
      },
      {
        source: "/docs/components/fluid-orb",
        destination: "/ai/fluid-orb",
        permanent: true,
      },
      {
        source: "/docs/components/image-generation",
        destination: "/ai/image-generation",
        permanent: true,
      },
      {
        source: "/docs/components/image-generation-2",
        destination: "/ai/image-generation-2",
        permanent: true,
      },
      {
        source: "/docs/components/inline-citation",
        destination: "/ai/inline-citation",
        permanent: true,
      },
      {
        source: "/docs/components/loading-states",
        destination: "/ai/loading-states",
        permanent: true,
      },
      {
        source: "/docs/components/mic-selector",
        destination: "/ai/mic-selector",
        permanent: true,
      },
      {
        source: "/docs/components/model-selector",
        destination: "/ai/model-selector",
        permanent: true,
      },
      {
        source: "/docs/components/open-in-chat",
        destination: "/ai/open-in-chat",
        permanent: true,
      },
      {
        source: "/docs/components/persona",
        destination: "/ai/persona",
        permanent: true,
      },
      {
        source: "/docs/components/prompt-input",
        destination: "/ai/prompt-input",
        permanent: true,
      },
      {
        source: "/docs/components/prompt-input-2",
        destination: "/ai/prompt-input-2",
        permanent: true,
      },
      {
        source: "/docs/components/queue",
        destination: "/ai/queue",
        permanent: true,
      },
      {
        source: "/docs/components/reasoning-text",
        destination: "/ai/reasoning-text",
        permanent: true,
      },
      {
        source: "/docs/components/selection-actions",
        destination: "/ai/selection-actions",
        permanent: true,
      },
      {
        source: "/docs/components/streaming-response",
        destination: "/ai/streaming-response",
        permanent: true,
      },
      {
        source: "/docs/components/structured-output",
        destination: "/ai/structured-output",
        permanent: true,
      },
      {
        source: "/docs/components/task-rows",
        destination: "/ai/task-rows",
        permanent: true,
      },
      {
        source: "/docs/components/terminal",
        destination: "/ai/terminal",
        permanent: true,
      },
      {
        source: "/docs/components/thinking-orbs",
        destination: "/ai/thinking-orbs",
        permanent: true,
      },
      {
        source: "/docs/components/todo-list",
        destination: "/ai/todo-list",
        permanent: true,
      },
      {
        source: "/docs/components/tool-approval",
        destination: "/ai/tool-approval",
        permanent: true,
      },
      {
        source: "/docs/components/trace",
        destination: "/ai/trace",
        permanent: true,
      },
      {
        source: "/docs/components/transcription",
        destination: "/ai/transcription",
        permanent: true,
      },
      {
        source: "/docs/components/voice-ai-orb",
        destination: "/ai/voice-ai-orb",
        permanent: true,
      },
      {
        source: "/docs/components/voice-selector",
        destination: "/ai/voice-selector",
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        // Block previews: meta noindex + header (query variants stay non-indexable)
        source: "/view/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
      {
        // Stable URLs, changing JSON - never immutable
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
