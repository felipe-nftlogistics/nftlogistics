import fs from 'fs';
import path from 'path';
import { S3Client, PutObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';

// 1. Carrega as variáveis do .env
const envPath = path.resolve(process.cwd(), '.env');
if (!fs.existsSync(envPath)) {
  console.error('Arquivo .env não encontrado!');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars = Object.fromEntries(
  envContent.split('\n')
    .map(l => l.trim())
    .filter(l => l && !l.startsWith('#') && l.includes('='))
    .map(l => {
      const idx = l.indexOf('=');
      const k = l.slice(0, idx).trim();
      let v = l.slice(idx + 1).trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.slice(1, -1);
      }
      return [k, v];
    })
);

const rawAccountId = envVars.CLOUDFLARE_ACCOUNT_ID || '';
const accountMatch = rawAccountId.match(/([a-f0-9]{32})/i);
const accountId = accountMatch ? accountMatch[1] : rawAccountId;
const accessKeyId = envVars.CLOUDFLARE_ACCESS_KEY_ID;
const secretAccessKey = envVars.CLOUDFLARE_SECRET_ACCESS_KEY;
const bucketName = envVars.CLOUDFLARE_BUCKET_NAME;

console.log('Iniciando conexão com Cloudflare R2...');
console.log(`Account ID: ${accountId}`);
console.log(`Access Key: ${accessKeyId ? accessKeyId.slice(0, 6) + '...' : 'não configurada'}`);
console.log(`Bucket Name: ${bucketName}`);

const client = new S3Client({
  region: 'auto',
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.webp': return 'image/webp';
    case '.png': return 'image/png';
    case '.jpg':
    case '.jpeg': return 'image/jpeg';
    case '.svg': return 'image/svg+xml';
    case '.ico': return 'image/x-icon';
    case '.mp4': return 'video/mp4';
    case '.pdf': return 'application/pdf';
    default: return 'application/octet-stream';
  }
}

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });
  return arrayOfFiles;
}

async function main() {
  // Teste de conexão
  try {
    console.log(`\nVerificando acesso ao bucket "${bucketName}"...`);
    const testRes = await client.send(new ListObjectsV2Command({ Bucket: bucketName, MaxKeys: 5 }));
    console.log(`✓ Conexão bem-sucedida com o bucket "${bucketName}"!`);
    console.log(`Objetos já existentes: ${testRes.KeyCount ?? 0}`);
  } catch (err) {
    console.error(`✗ Erro ao conectar ao bucket "${bucketName}":`, err.message);
    process.exit(1);
  }

  // Coleta arquivos de public
  const publicDir = path.resolve(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    console.error('Pasta public/ não encontrada!');
    process.exit(1);
  }

  const allFiles = getAllFiles(publicDir);
  console.log(`\nEncontrados ${allFiles.length} arquivos na pasta public/.`);
  console.log('Iniciando upload para o Cloudflare R2...\n');

  let successCount = 0;
  let failCount = 0;

  for (const filePath of allFiles) {
    // Normaliza para barras normais /
    const relativeKey = path.relative(publicDir, filePath).replace(/\\/g, '/');
    const mimeType = getMimeType(filePath);
    const fileBuffer = fs.readFileSync(filePath);

    try {
      await client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: relativeKey,
          Body: fileBuffer,
          ContentType: mimeType,
          CacheControl: 'public, max-age=31536000, immutable',
        })
      );
      console.log(`✓ [${mimeType}] Upload concluído: ${relativeKey}`);
      successCount++;
    } catch (e) {
      console.error(`✗ Falha ao enviar ${relativeKey}:`, e.message);
      failCount++;
    }
  }

  console.log(`\n--- RESUMO DO UPLOAD ---`);
  console.log(`Sucessos: ${successCount}`);
  console.log(`Falhas: ${failCount}`);
  console.log(`Total: ${allFiles.length}`);
}

main();
