const R2_DOMAIN = process.env.NEXT_PUBLIC_R2_DOMAIN;

/**
 * Retorna a URL otimizada do Cloudflare R2 ou caminho local relativo.
 * Permite carregar mídias pesadas (vídeos e imagens) diretamente da CDN global do R2,
 * economizando 100% da banda do servidor da Vercel.
 */
export function getMediaUrl(path: string): string {
  if (!path) return path;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (!R2_DOMAIN) return path;

  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `https://${R2_DOMAIN}/${cleanPath}`;
}
