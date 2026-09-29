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
        ],
      },
      {
        userAgent: [
          "GPTBot",
          "CCBot",
          "ChatGPT-User",
          "anthropic-ai",
          "ClaudeBot",
          "Claude-Web",
          "Bytespider",
          "Amazonbot",
          "FacebookBot",
          "Scrapy",
        ],
        disallow: ["/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
