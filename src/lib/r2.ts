import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Trata accountId caso tenha sido colada a URL completa do endpoint
const rawAccountId = (process.env.CLOUDFLARE_ACCOUNT_ID || "").trim();
const accountIdMatch = rawAccountId.match(/([a-f0-9]{32})/i);
const accountId = accountIdMatch ? accountIdMatch[1] : rawAccountId;

const accessKeyId = (process.env.CLOUDFLARE_ACCESS_KEY_ID || "").trim();
const secretAccessKey = (process.env.CLOUDFLARE_SECRET_ACCESS_KEY || "").trim();
export const bucketName = (process.env.CLOUDFLARE_BUCKET_NAME || "").trim();

if (!accountId || !accessKeyId || !secretAccessKey) {
  console.warn("Aviso: Credenciais do Cloudflare R2 não foram configuradas corretamente.");
}

export const r2Client = new S3Client({
  region: "auto", // O R2 exige que a região seja "auto"
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

/**
 * Função utilitária para fazer upload de arquivos (Buffer) para o R2.
 */
export async function uploadToR2(fileBuffer: Buffer, fileName: string, contentType: string) {
  if (!bucketName) {
    throw new Error("O nome do bucket R2 não está configurado.");
  }

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
    Body: fileBuffer,
    ContentType: contentType,
    CacheControl: "public, max-age=31536000, immutable",
  });

  await r2Client.send(command);

  // Retorna a URL pública baseada no domínio configurado no seu R2
  const publicDomain = process.env.NEXT_PUBLIC_R2_DOMAIN;
  if (!publicDomain) {
    return null; // O arquivo foi enviado, mas não conseguimos gerar o link público sem o domínio
  }

  return `https://${publicDomain}/${fileName}`;
}
