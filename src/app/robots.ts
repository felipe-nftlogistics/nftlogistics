import type { MetadataRoute } from "next";
import { SITE_URL } from "@/src/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/logo/",
        ],
        disallow: [
          "/api/",
          "/_next/",
          "/nft-links/",
          "/imagens/",
          "/videos/",
          "/icones/",
          "/perfil/",
          "/*.mp4$",
          "/*.pdf$",
        ],
      },
      // Inteligências Artificiais (ChatGPT, Perplexity, Claude, Gemini, etc.)
      // Permite ler 100% dos dados textuais, GEO e LOGOTIPOS da marca
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
        allow: [
          "/",
          "/logo/",
        ],
        disallow: [
          "/imagens/",
          "/videos/",
          "/icones/",
          "/perfil/",
          "/*.mp4$",
          "/*.pdf$",
        ],
      },
      // Buscadores de imagem podem indexar apenas os logotipos da marca
      {
        userAgent: [
          "Googlebot-Image",
          "MSNBot-Media",
        ],
        allow: [
          "/logo/",
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
