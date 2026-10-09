import { createDemoReport } from "./mock-report-data";

export type Platform = "Instagram" | "TikTok" | "YouTube";
export type InsightContent = {
  id: string;
  platform: Platform;
  creatorId: string;
  publishedAt: string;
  title: string;
  cover: string | null;
  url: string;
  views: number | null;
  likes: number | null;
  comments: number | null;
  shares: number | null;
  theme: string | null;
  format: string | null;
};
export type AssociatedCreator = {
  id: string;
  platform: Platform;
  name: string;
  avatar: string | null;
  followers: number | null;
  category: string | null;
  region: string | null;
  profileUrl: string;
  firstObservedAt?: string;
};
export type ReportData = {
  status: "loading" | "success" | "empty" | "partial" | "error" | "unsupported";
  contents: InsightContent[];
  creators: AssociatedCreator[];
  // Null means data coverage has not been established, rather than zero observations.
  availablePlatforms: Platform[] | null;
  updatedAt: string | null;
  source: "demo" | "verified" | null;
};

export const platforms: Platform[] = ["Instagram", "TikTok", "YouTube"];
export const unavailableReport: ReportData = {
  status: "unsupported",
  contents: [],
  creators: [],
  availablePlatforms: null,
  updatedAt: null,
  source: null,
};

export async function loadReportData(brandId: string): Promise<ReportData> {
  // Explicit demo fixtures, not a claim of live brand-social coverage.
  return createDemoReport(brandId);
}

export function engagement(content: InsightContent): number | null {
  const available = [content.likes, content.comments, content.shares].filter(
    (n): n is number => n !== null && Number.isFinite(n),
  );
  return available.length ? available.reduce((a, b) => a + b, 0) : null;
}
export function sumAvailable(values: Array<number | null>): number | null {
  const valid = values.filter((n): n is number => n !== null && Number.isFinite(n));
  return valid.length ? valid.reduce((a, b) => a + b, 0) : null;
}
export function tier(followers: number | null) {
  if (followers === null || followers < 1000) return null;
  if (followers < 10000) return "Nano";
  if (followers < 100000) return "Micro";
  if (followers < 500000) return "Mid-tier";
  if (followers < 1000000) return "Macro";
  return "Mega";
}
export function distribution(values: Array<string | null>) {
  const counts = new Map<string, number>();
  for (const value of values) if (value) counts.set(value, (counts.get(value) ?? 0) + 1);
  return [...counts].sort((a, b) => b[1] - a[1]);
}
export function filterReport(
  data: ReportData,
  start: string,
  end: string,
  platform: string,
  region: string,
) {
  const unique = new Map<string, InsightContent>();
  const creators = new Map(
    data.creators.map((creator) => [`${creator.platform}:${creator.id}`, creator]),
  );
  for (const content of data.contents) {
    const day = content.publishedAt.slice(0, 10);
    const creator = creators.get(`${content.platform}:${content.creatorId}`);
    if (
      day >= start &&
      day <= end &&
      (platform === "all" || platform === content.platform) &&
      (region === "all" || creator?.region === region)
    )
      unique.set(`${content.platform}:${content.id}`, content);
  }
  const contents = [...unique.values()];
  const associated = new Set(contents.map((content) => `${content.platform}:${content.creatorId}`));
  return {
    contents,
    creators: [...creators].filter(([key]) => associated.has(key)).map(([, creator]) => creator),
    creatorCount: associated.size,
  };
}
