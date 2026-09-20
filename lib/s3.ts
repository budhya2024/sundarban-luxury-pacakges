import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const endpoint = process.env.AWS_ENDPOINT_URL_S3;
const region = process.env.AWS_REGION || "us-east-2";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
export const BUCKET_NAME = process.env.NEON_STORAGE_BUCKET || "uploads";

if (!endpoint || !accessKeyId || !secretAccessKey) {
  console.warn("⚠️ Neon Object Storage AWS credentials missing in environment!");
}

export const s3Client = new S3Client({
  endpoint,
  region,
  credentials: {
    accessKeyId: accessKeyId || "",
    secretAccessKey: secretAccessKey || "",
  },
  forcePathStyle: true, // required: Neon uses path-style addressing
});

export async function uploadToStorage(
  buffer: Buffer,
  fileName: string,
  contentType: string,
  folder = "blog"
): Promise<{ url: string; key: string }> {
  // Sanitize filename
  const cleanName = fileName.replace(/[^a-zA-Z0-9.-]/g, "_").toLowerCase();
  const key = `${folder}/${Date.now()}-${cleanName}`;

  await s3Client.send(
    new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    })
  );

  // For public_read bucket in Neon, the object is anonymously accessible at:
  // ${endpoint}/${bucket}/${key}
  const cleanEndpoint = endpoint?.endsWith("/") ? endpoint.slice(0, -1) : endpoint;
  const url = `${cleanEndpoint}/${BUCKET_NAME}/${key}`;

  return { url, key };
}

export function extractStorageKey(urlOrKey: string): string | null {
  if (!urlOrKey || typeof urlOrKey !== "string") return null;

  const trimmed = urlOrKey.trim();

  // If it's a data URL or local asset path, ignore
  if (
    trimmed.startsWith("data:") ||
    trimmed.startsWith("/assets/") ||
    trimmed.startsWith("assets/")
  ) {
    return null;
  }

  // If it's a full URL
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    try {
      const parsed = new URL(trimmed);
      const pathname = parsed.pathname.startsWith("/")
        ? parsed.pathname.slice(1)
        : parsed.pathname;
      const parts = pathname.split("/");
      if (parts[0] === BUCKET_NAME && parts.length > 1) {
        return decodeURIComponent(parts.slice(1).join("/"));
      }
    } catch {
      // Fallback to substring matching below
    }

    const bucketPattern = `/${BUCKET_NAME}/`;
    const idx = trimmed.indexOf(bucketPattern);
    if (idx !== -1) {
      return decodeURIComponent(trimmed.slice(idx + bucketPattern.length));
    }

    // External URL (e.g. Unsplash)
    return null;
  }

  // It's already a relative key
  if (trimmed.startsWith(`${BUCKET_NAME}/`)) {
    return trimmed.slice(`${BUCKET_NAME}/`.length);
  }
  if (trimmed.startsWith(`/${BUCKET_NAME}/`)) {
    return trimmed.slice(`/${BUCKET_NAME}/`.length);
  }

  if (trimmed.includes("/")) {
    return trimmed;
  }

  return null;
}

export async function deleteFromStorage(urlOrKey: string): Promise<boolean> {
  const key = extractStorageKey(urlOrKey);
  if (!key) {
    return false;
  }

  try {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
      })
    );
    console.log(`[Neon Storage] Successfully deleted object: "${key}"`);
    return true;
  } catch (error) {
    console.error(`[Neon Storage] Error deleting object "${key}":`, error);
    return false;
  }
}

