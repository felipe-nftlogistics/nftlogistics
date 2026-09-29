import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = (request.headers.get("user-agent") || "").toLowerCase();

  // Bloqueio de bots abusivos e scrapers conhecidos na borda para economizar requisições
  const abusiveBots = ["bytespider", "petalbot", "semrushbot", "ahrefsbot", "mj12bot", "dotbot", "scrapy"];
  if (abusiveBots.some((bot) => userAgent.includes(bot))) {
    return new NextResponse("Access Denied", { status: 403 });
  }

  // ─── Propaga o pathname via response header para que Server Components
  // possam ler e definir o atributo `lang` do <html> corretamente no SSR
  // (necessário porque o layout raiz não tem acesso direto aos route segments)
  const response = NextResponse.next({
    request: {
      headers: new Headers(request.headers),
    },
  });

  // 1. Intercepta estritamente a rota raiz "/"
  if (pathname === "/") {
    // Verifica se há preferência salva em cookie
    const cookieLang = request.cookies.get("preferred_language")?.value;
    if (cookieLang === "pt" || cookieLang === "en" || cookieLang === "cn") {
      const redirectResponse = NextResponse.redirect(new URL(`/${cookieLang}`, request.url), 307);
      redirectResponse.headers.set("x-pathname", pathname);
      return redirectResponse;
    }

    // Detecta idioma com base no cabeçalho Accept-Language do navegador
    const acceptLanguage = (request.headers.get("accept-language") || "").toLowerCase();

    let targetLang = "en"; // Padrão internacional (x-default)
    if (acceptLanguage.includes("pt")) {
      targetLang = "pt";
    } else if (acceptLanguage.includes("zh") || acceptLanguage.includes("cn")) {
      targetLang = "cn";
    }

    const redirectResponse = NextResponse.redirect(new URL(`/${targetLang}`, request.url), 307);
    redirectResponse.headers.set("x-pathname", pathname);
    return redirectResponse;
  }

  // 2. Redirecionamento de compatibilidade para URLs legadas em chinês com sufixo "-cn"
  if (pathname.startsWith("/cn/")) {
    const legacyRedirectMap: Record<string, string> = {
      "/cn/about-cn": "/cn/about",
      "/cn/contact-cn": "/cn/contact",
      "/cn/health-cn": "/cn/health",
      "/cn/privacy-cn": "/cn/privacy",
      "/cn/solutions-cn": "/cn/solutions",
      "/cn/solutions-cn/fairs-and-events-cn": "/cn/solutions/fairs-and-events",
      "/cn/solutions-cn/special-customs-regimes-cn": "/cn/solutions/special-customs-regimes",
      "/cn/solutions-cn/customized-projects-cn": "/cn/solutions/customized-projects",
      "/cn/solutions-cn/artworks-logistics-cn": "/cn/solutions/artworks-logistics",
    };

    const cleanPath = pathname.replace(/\/+$/, "");
    if (legacyRedirectMap[cleanPath]) {
      const redirectResponse = NextResponse.redirect(new URL(legacyRedirectMap[cleanPath], request.url), 301);
      redirectResponse.headers.set("x-pathname", cleanPath);
      return redirectResponse;
    }
  }

  // Propaga o pathname atual para leitura no Server Component do layout raiz
  response.headers.set("x-pathname", pathname);
  return response;
}

export const config = {
  // Amplia o matcher para incluir todas as rotas públicas (necessário para propagar o x-pathname header)
  // Exclui API, arquivos estáticos do Next.js e arquivos com extensão
  matcher: [
    "/",
    "/cn/:path*",
    "/pt/:path*",
    "/en/:path*",
  ],
};
