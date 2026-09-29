import type { Metadata } from "next";
import Hero from "@/src/components/Hero";
import Button from "@/src/components/Button";
import HomeClient from "@/src/components/pagesComponents/HomeClient";

import { constructMetadata, SITE_ROUTES, SECTION_OG_IMAGES } from "@/src/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "NFT Logistics | International Logistics, Customs Clearance & Special Regimes in Brazil",
  description:
    "NFT Logistics is a Brazilian customs broker and freight forwarder specializing in international logistics, special customs regimes, trade fair logistics, fine art shipping, and health logistics across Brazil. Over 15 years of regulatory expertise at Santos, Paranaguá, GRU, VCP, and GIG.",
  path: "/en",
  lang: "en",
  image: SECTION_OG_IMAGES.home,
  keywords: [
    "International Logistics Brazil",
    "Customs Broker Brazil",
    "Freight Forwarder Brazil",
    "Temporary Admission Brazil",
    "Special Customs Regimes Brazil",
    "Exhibition Logistics Brazil",
    "Brazil Customs Clearance",
    "NFT Logistics",
  ],
  alternates: SITE_ROUTES.home,
});

import { getMediaUrl } from "@/src/lib/media";

export default function EnPage() {
  return (
    <main>
      <Hero
        videoSrc={getMediaUrl("/videos/home-nft-logistics.mp4")}
        subtitle="Specialized end-to-end logistics solutions, customs clearance, and regulatory advisory tailored to ensure your operations and international events flow seamlessly in the Brazilian market."
        title="We help global companies exhibit, import and operate in Brazil without regulatory surprises."
        actions={
          <>
            <Button variant="primary" size="lg" href="/en/contact">
              Contact Us
            </Button>
            <Button
              variant="outline"
              size="lg"
              href="/en/solutions"
              className="!border-white/40 !text-white hover:!bg-white/10 hover:!border-white/60 backdrop-blur-sm"
            >
              Our Solutions
            </Button>
          </>
        }
      />  
      <HomeClient lang="en" />
    </main>
  );
}


