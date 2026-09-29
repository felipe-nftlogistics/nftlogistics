import type { Metadata } from "next";
import Hero from "@/src/components/Hero";
import Button from "@/src/components/Button";
import HomeClient from "@/src/components/pagesComponents/HomeClient";

import { constructMetadata, SITE_ROUTES, SECTION_OG_IMAGES } from "@/src/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "NFT Logistics | Logística Internacional, Desembaraço Aduaneiro e Regimes Especiais no Brasil",
  description:
    "A NFT Logistics é especialista em logística internacional, desembaraço aduaneiro, regimes aduaneiros especiais e comércio exterior no Brasil. Mais de 15 anos de expertise nos portos de Santos e Paranaguá e aeroportos GRU, VCP e GIG.",
  path: "/pt",
  lang: "pt",
  image: SECTION_OG_IMAGES.home,
  keywords: [
    "Logística Internacional Brasil",
    "Desembaraço Aduaneiro Brasil",
    "Regimes Aduaneiros Especiais",
    "Admissão Temporária Brasil",
    "Comércio Exterior Brasil",
    "Despachante Aduaneiro",
    "Frete Internacional Brasil",
    "NFT Logistics",
  ],
  alternates: SITE_ROUTES.home,
});

import { getMediaUrl } from "@/src/lib/media";

export default function PtPage() {
  return (
    <main>
      <Hero
        videoSrc={getMediaUrl("/videos/home-nft-logistics.mp4")}
        title="Ajudamos empresas globais a expor, importar e operar no Brasil sem surpresas regulatórias."
        subtitle="Soluções completas em logística internacional, desembaraço aduaneiro e regimes especiais personalizadas para conectar o seu negócio ao mercado brasileiro com máxima eficiência e segurança regulatória."
        actions={
          <>
            <Button variant="primary" size="lg" href="/pt/contato">
              Fale Conosco
            </Button>
            <Button
              variant="outline"
              size="lg"
              href="/pt/solucoes"
              className="!border-white/40 !text-white hover:!bg-white/10 hover:!border-white/60 backdrop-blur-sm"
            >
              Nossas Soluções
            </Button>
          </>
        }
      />
      <HomeClient lang="pt" />
    </main>
  );
}

