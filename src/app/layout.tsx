import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nftlogistics.com.br"),
  title: {
    default: "NFT Logistics | Soluções em Logística Internacional & Regimes Especiais",
    template: "%s | NFT Logistics",
  },
  description:
    "A NFT Logistics é especialista em logística internacional, desembaraço aduaneiro, regimes aduaneiros especiais e comércio exterior no Brasil. Mais de 15 anos conectando empresas globais ao mercado brasileiro com segurança regulatória e pontualidade.",
  icons: {
    icon: [
      { url: "/logo/nft-logistics-icone-branco.webp" },
      { url: "/favicon.ico" },
    ],
    apple: "/logo/nft-logistics-icone-branco.webp",
    shortcut: "/logo/nft-logistics-icone-branco.webp",
  },
  openGraph: {
    title: "NFT Logistics | Logística Internacional & Regimes Especiais no Brasil",
    description:
      "Especialistas em desembaraço aduaneiro, admissão temporária, feiras internacionais e regimes especiais no Brasil. Portos de Santos, Paranaguá, GRU, VCP e GIG.",
    url: "https://www.nftlogistics.com.br",
    siteName: "NFT Logistics",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "https://www.nftlogistics.com.br/imagens/operacao-nft-logistics.webp",
        width: 1200,
        height: 630,
        alt: "NFT Logistics - Logística Internacional e Regimes Especiais no Brasil",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NFT Logistics | Logística Internacional & Regimes Especiais no Brasil",
    description:
      "Especialistas em desembaraço aduaneiro, admissão temporária, feiras internacionais e regimes especiais no Brasil.",
    images: [
      "https://www.nftlogistics.com.br/imagens/operacao-nft-logistics.webp",
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Default estático pt-BR (ajustado de forma instantânea via script inline no head conforme a rota)
  const htmlLang = "pt-BR";

  // ─── Schema.org: Organization + WebSite (expandido para AI Overview) ──────
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.nftlogistics.com.br/#organization",
        name: "NFT Logistics",
        alternateName: ["NFT Logistics Brazil", "NFT Logística Internacional"],
        url: "https://www.nftlogistics.com.br",
        logo: {
          "@type": "ImageObject",
          "@id": "https://www.nftlogistics.com.br/#logo",
          url: "https://www.nftlogistics.com.br/logo/nft-logistics-logo-completo-branco.webp",
          contentUrl:
            "https://www.nftlogistics.com.br/logo/nft-logistics-logo-completo-branco.webp",
          caption: "NFT Logistics",
          width: 400,
          height: 100,
        },
        image: "https://www.nftlogistics.com.br/imagens/operacao-nft-logistics.webp",
        description:
          "A NFT Logistics é uma empresa brasileira especializada em logística internacional, desembaraço aduaneiro, regimes aduaneiros especiais (Admissão Temporária, Drawback, RECOF, Entreposto Aduaneiro), logística para feiras e exposições internacionais, logística de obras de arte e projetos customizados de comércio exterior. Atuamos há mais de 15 anos nos principais portos e aeroportos do Brasil: Porto de Santos, Porto de Paranaguá, Aeroporto de Guarulhos (GRU), Aeroporto de Viracopos (VCP) e Aeroporto do Galeão (GIG).",
        foundingYear: "2009",
        numberOfEmployees: {
          "@type": "QuantitativeValue",
          minValue: 10,
          maxValue: 50,
        },
        areaServed: [
          { "@type": "Country", name: "Brazil" },
          { "@type": "Country", name: "United States" },
          { "@type": "Country", name: "Germany" },
          { "@type": "Country", name: "China" },
          { "@type": "Country", name: "Argentina" },
        ],
        knowsAbout: [
          "Logística Internacional",
          "Desembaraço Aduaneiro",
          "Regimes Aduaneiros Especiais",
          "Admissão Temporária",
          "Drawback Suspensão",
          "RECOF",
          "Entreposto Aduaneiro",
          "Feiras e Exposições Internacionais no Brasil",
          "Logística de Obras de Arte",
          "Comércio Exterior",
          "Customs Brokerage Brazil",
          "International Freight Forwarding",
          "Special Customs Regimes Brazil",
          "Exhibition Logistics Brazil",
          "Fine Art Logistics Brazil",
          "Medical Equipment Import Brazil",
          "Health Logistics Brazil",
          "Porto de Santos",
          "Aeroporto de Guarulhos",
          "Viracopos Cargo",
        ],
        sameAs: [
          "https://www.linkedin.com/company/nftlogistics/",
          "https://www.instagram.com/nftlogisticsbrazil/",
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+55-11-94853-0057",
            contactType: "customer service",
            contactOption: "TollFree",
            availableLanguage: [
              { "@type": "Language", name: "Portuguese" },
              { "@type": "Language", name: "English" },
              { "@type": "Language", name: "Chinese" },
            ],
          },
        ],
        address: {
          "@type": "PostalAddress",
          addressCountry: "BR",
          addressRegion: "SP",
          addressLocality: "São Paulo",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Soluções em Logística Internacional e Comércio Exterior",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Logística para Feiras e Exposições Internacionais",
                description:
                  "Serviço completo de logística para feiras e exposições internacionais no Brasil, incluindo admissão temporária, desembaraço aduaneiro prioritário e reexportação.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Regimes Aduaneiros Especiais",
                description:
                  "Consultoria e operação em Admissão Temporária, Drawback, RECOF e Entreposto Aduaneiro para otimização tributária e aduaneira.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Logística de Obras de Arte",
                description:
                  "Transporte especializado de obras de arte, peças museológicas e bens culturais de alto valor com total segurança e conformidade aduaneira.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Health Logistics — Importação de Equipamentos Médicos",
                description:
                  "Importação, exportação e admissão temporária de equipamentos médicos e hospitalares com conformidade ANVISA, INMETRO e MAPA.",
              },
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://www.nftlogistics.com.br/#website",
        url: "https://www.nftlogistics.com.br",
        name: "NFT Logistics",
        description:
          "Site oficial da NFT Logistics — empresa especializada em logística internacional, desembaraço aduaneiro e regimes especiais no Brasil.",
        publisher: {
          "@id": "https://www.nftlogistics.com.br/#organization",
        },
        inLanguage: ["pt-BR", "en", "zh-Hans"],
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate:
              "https://www.nftlogistics.com.br/pt/solucoes?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html
      lang={htmlLang}
      suppressHydrationWarning
      className={`${manrope.variable} h-full antialiased dark`}
    >
      <head>
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('theme');
                if (theme === 'light') {
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                }
                var p = window.location.pathname;
                if (p.startsWith('/cn')) document.documentElement.lang = 'zh-Hans';
                else if (p.startsWith('/en')) document.documentElement.lang = 'en';
                else document.documentElement.lang = 'pt-BR';
              } catch (_) {}
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
