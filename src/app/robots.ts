import type { MetadataRoute } from "next";
import { SITE_URL } from "@/src/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/nft-links/",
          "/imagens/",
          "/videos/",
          "/icones/",
          "/logo/",
          "/perfil/",
          "/*.webp$",
          "/*.mp4$",
          "/*.pdf$",
        ],
      },
      // Inteligências Artificiais (ChatGPT, Perplexity, Claude, Gemini, etc.)
      // Permite ler 100% dos dados textuais e GEO, mas bloqueia download de mídias e vídeos
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "PerplexityBot",
          "ClaudeBot",
          "Claude-Web",
          "anthropic-ai",
          "Google-Extended",
          "Applebot-Extended",
          "cohere-ai",
        ],
        allow: "/",
        disallow: [
          "/imagens/",
          "/videos/",
          "/icones/",
          "/logo/",
          "/perfil/",
          "/*.webp$",
          "/*.mp4$",
          "/*.pdf$",
        ],
      },
      // Bloqueia bots de busca de imagens de consumir requisições em massa
      {
        userAgent: [
          "Googlebot-Image",
          "MSNBot-Media",
        ],
        disallow: ["/"],
      },
      // Scrapers abusivos comerciais sem valor de busca
      {
        userAgent: [
          "Bytespider",
          "PetalBot",
          "Scrapy",
        ],
        disallow: ["/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
