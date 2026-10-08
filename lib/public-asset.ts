/** Resolve public assets beneath the deployment's base path. */
export function publicAsset(src: string) {
  const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
  if (!src.startsWith("/") || src.startsWith("//") || !basePath || src === basePath || src.startsWith(`${basePath}/`)) return src;
  return `${basePath}${src}`;
}
