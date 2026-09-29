import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  allowedDevOrigins: ["localhost", "192.168.15.9"],
  images: {
    unoptimized: true, // Desativa otimização do servidor Vercel para evitar custos/limite de 1.000 fotos
    formats: ["image/webp", "image/avif"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.r2.dev",
      },
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_R2_DOMAIN || "imagens.seudominio.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: securityHeaders,
    },
    {
      // Cache longo para mídias estáticas e instrução para robôs não indexarem imagens
      source: "/(imagens|icones|idiomas|logo|perfil|videos)/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
        {
          key: "X-Robots-Tag",
          value: "noindex, nofollow, noimageindex",
        },
      ],
    },
  ],
};

export default nextConfig;
