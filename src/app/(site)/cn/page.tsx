import type { Metadata } from "next";
import Hero from "@/src/components/Hero";
import Button from "@/src/components/Button";
import HomeClient from "@/src/components/pagesComponents/HomeClient";

import { constructMetadata, SITE_ROUTES, SECTION_OG_IMAGES } from "@/src/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "NFT Logistics | 国际物流解决方案与巴西海关清关专家",
  description:
    "我们协助全球企业在巴西参展、进口和运营，免除监管困扰。提供端到端国际物流解决方案、巴西海关清关及特殊监管制度定制服务。",
  path: "/cn",
  lang: "cn",
  image: SECTION_OG_IMAGES.home,
  keywords: [
    "巴西国际物流",
    "巴西海关清关",
    "巴西暂时进境",
    "巴西特殊监管制度",
    "巴西展会物流",
    "巴西货运代理",
    "NFT Logistics",
  ],
  alternates: SITE_ROUTES.home,
});

import { getMediaUrl } from "@/src/lib/media";

export default function CnPage() {
  return (
    <main>
      <Hero
        videoSrc={getMediaUrl("/videos/home-nft-logistics.mp4")}
        title="我们协助全球企业在巴西参展、进口和运营，免除监管困扰。"
        subtitle="提供端到端的国际物流解决方案、海关清关与特殊监管制度咨询，助力您的全球业务与国际展会顺畅拓展巴西市场。"
        actions={
          <>
            <Button variant="primary" size="lg" href="/cn/contact">
              联系我们
            </Button>
            <Button
              variant="outline"
              size="lg"
              href="/cn/solutions"
              className="!border-white/40 !text-white hover:!bg-white/10 hover:!border-white/60 backdrop-blur-sm"
            >
              解决方案
            </Button>
          </>
        }
      />
      <HomeClient lang="cn" />
    </main>
  );
}


