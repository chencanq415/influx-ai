import type { AssociatedCreator, InsightContent, Platform, ReportData } from "./report-data";

const profiles: Record<string, { name: string; category: string; themes: string[] }> = {
  shein: {
    name: "SHEIN",
    category: "Fashion",
    themes: ["Outfit ideas", "Product review", "Everyday styling", "Unboxing", "Seasonal edit"],
  },
  nike: {
    name: "Nike",
    category: "Fitness",
    themes: [
      "Training routine",
      "Product review",
      "Running stories",
      "Everyday styling",
      "Community challenge",
    ],
  },
  aesop: {
    name: "Aesop",
    category: "Beauty",
    themes: ["Skincare routine", "Product review", "Self-care", "Unboxing", "Store experience"],
  },
  oatside: {
    name: "Oatside",
    category: "Food & Drink",
    themes: ["Coffee ritual", "Recipe ideas", "Product review", "Everyday moments", "Taste test"],
  },
  glossier: {
    name: "Glossier",
    category: "Beauty",
    themes: [
      "Makeup tutorial",
      "Product review",
      "Skincare routine",
      "Unboxing",
      "Everyday makeup",
    ],
  },
  allbirds: {
    name: "Allbirds",
    category: "Lifestyle",
    themes: ["Everyday styling", "Product review", "Walking routine", "Travel diary", "Unboxing"],
  },
};

// Dates roll with the preview day; the same brand/day always yields the same fixtures.
export function createDemoReport(brandId: string, asOf?: string): ReportData {
  const id = brandId.toLowerCase();
  const profile = profiles[id] ?? profiles.shein;
  const assetId = profiles[id] ? id : "shein";
  const end =
    asOf ??
    new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Shanghai",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());
  const anchor = new Date(`${end}T12:00:00Z`);
  const dateAt = (offset: number) => {
    const day = new Date(anchor);
    day.setUTCDate(day.getUTCDate() - offset);
    return day.toISOString().slice(0, 10);
  };
  let seed = [...id].reduce((sum, letter) => sum * 31 + letter.charCodeAt(0), 17) >>> 0;
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const channels: Platform[] = ["Instagram", "TikTok", "YouTube"];
  const names = ["Maya", "Ellie", "Noah", "Sophie", "Lena", "Alex", "Jordan", "Chloe"];
  const regions = ["United States", "United Kingdom", "Singapore", "Japan"];
  const followerBases = [4800, 24000, 86000, 218000, 670000, 1350000];
  const creators: AssociatedCreator[] = Array.from({ length: 36 }, (_, index) => ({
    id: `${id}-demo-creator-${index}`,
    platform: channels[index % 3],
    name: `${names[index % names.length]} ${["Studio", "Journal", "Daily", "Edit"][Math.floor(index / names.length) % 4]} ${index + 1}`,
    avatar: null,
    followers: followerBases[index % followerBases.length] + Math.round(random() * 2300),
    category: index % 4 === 0 ? "Lifestyle" : profile.category,
    region: regions[index % regions.length],
    profileUrl: "",
    firstObservedAt: dateAt(index < 24 ? 110 : (index - 24) * 3),
  }));
  const contents: InsightContent[] = [];
  for (let offset = 119; offset >= 0; offset--) {
    const eligible = creators.filter((creator) => creator.firstObservedAt! <= dateAt(offset));
    const count = 3 + Math.floor(random() * 5) + (offset < 14 ? 2 : 0);
    if (!eligible.length) continue;
    for (let index = 0; index < count; index++) {
      const creator = eligible[Math.floor(random() * eligible.length)];
      const theme = profile.themes[Math.floor(random() * profile.themes.length)];
      const format =
        creator.platform === "YouTube"
          ? "Video"
          : creator.platform === "TikTok"
            ? "Short video"
            : ["Short video", "Carousel", "Image"][Math.floor(random() * 3)];
      const views = Math.round(6000 + random() * (creator.followers ?? 10000) * 1.4);
      contents.push({
        id: `${id}-demo-content-${offset}-${index}`,
        creatorId: creator.id,
        platform: creator.platform,
        publishedAt: `${dateAt(offset)}T${String(8 + index * 2).padStart(2, "0")}:00:00Z`,
        title: `${profile.name} · ${theme} — ${creator.name}`,
        // Locally bundled editorial artwork, not screenshots of actual social posts.
        cover: `/brand-reports/${assetId}-cover.jpg`,
        url: "",
        views: format === "Image" || format === "Carousel" ? null : views,
        likes: Math.round(views * (0.025 + random() * 0.05)),
        comments: Math.round(views * (0.001 + random() * 0.003)),
        shares: creator.platform === "YouTube" ? null : Math.round(views * random() * 0.008),
        theme,
        format,
      });
    }
  }
  return {
    status: "success",
    source: "demo",
    contents,
    creators,
    availablePlatforms: channels,
    updatedAt: `${end}T12:00:00Z`,
  };
}
