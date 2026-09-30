"use client";

import { Button } from "@/components/ui/button";
import { useUIStore } from "@/lib/store/ui-store";
import { useLoc } from "@/lib/i18n/use-i18n";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  BarChart3,
  BellRing,
  Building2,
  ChevronDown,
  Globe2,
  HelpCircle,
  MessageSquareText,
  MoreHorizontal,
  Radar,
  Search,
  Sparkles,
  TrendingUp,
  UsersRound,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const L = {
  title: { zh: "品牌洞察", en: "BrandRadar" },
  eyebrow: { zh: "品牌、竞品与市场信号", en: "Brand, competitor & market signals" },
  hero: { zh: "看见品牌正在发生什么", en: "See what’s happening around your brand" },
  heroDesc: {
    zh: "从社媒讨论、竞品动作与内容趋势中，找到下一步值得行动的信号。",
    en: "Find the next signal worth acting on across conversations, competitors, and content trends.",
  },
  brandPlaceholder: {
    zh: "搜索品牌、官网、品类或竞品",
    en: "Search a brand, website, category, or competitor",
  },
  analyze: { zh: "开始探索", en: "Explore" },
  examples: { zh: "试试：GlowLab、护肤、竞品名称", en: "Try: GlowLab, skincare, or a competitor" },
  monitoring: { zh: "已建立监听范围", en: "Monitoring scope created" },
  report: { zh: "品牌信号报告", en: "Brand signal report" },
  reportDesc: {
    zh: "过去 30 天公开内容、消费者讨论与竞品动态的综合观察。",
    en: "A 30-day view of public content, consumer conversations, and competitor activity.",
  },
  mentions: { zh: "品牌提及", en: "Brand mentions" },
  sentiment: { zh: "正向情感", en: "Positive sentiment" },
  shareOfVoice: { zh: "品类声量份额", en: "Share of voice" },
  emergingTopics: { zh: "新兴话题", en: "Emerging topics" },
  conversation: { zh: "消费者讨论", en: "Consumer conversations" },
  competitor: { zh: "竞品动态", en: "Competitor watch" },
  creator: { zh: "达人与内容机会", en: "Creator & content opportunities" },
  alert: { zh: "设置提醒", en: "Set alert" },
  exploreTopics: { zh: "热门观察方向", en: "Explore signals" },
  social: { zh: "社媒讨论", en: "Social conversation" },
  category: { zh: "类目趋势", en: "Category movement" },
  opportunity: { zh: "合作机会", en: "Creator opportunity" },
} as const;

const signalDots = [
  { className: "left-[7%] top-[28%]", icon: "◌", label: "+38% conversations", tone: "pink" },
  { className: "right-[8%] top-[25%]", icon: "◒", label: "24 competitor moves", tone: "blue" },
] as const;

const categories = [
  { zh: "推荐", en: "Recommend" },
  { zh: "美妆护肤", en: "Beauty & skincare" },
  { zh: "时尚生活", en: "Fashion & lifestyle" },
  { zh: "食品饮料", en: "Food & beverage" },
  { zh: "健康运动", en: "Health & fitness" },
  { zh: "母婴家庭", en: "Family & parenting" },
  { zh: "消费科技", en: "Consumer tech" },
] as const;

const featuredBrands = [
  {
    name: "SHEIN",
    url: "shein.com",
    cover: "/brand-reports/shein-cover.jpg",
    logo: "/brand-reports/shein-logo.png",
    description: {
      zh: "快速上新的时尚内容持续带动年轻消费者讨论。",
      en: "Fast-moving fashion content continues to drive younger consumer conversation.",
    },
    tags: ["Fashion", "Gen Z", "+42% mentions"],
  },
  {
    name: "Nike",
    url: "nike.com",
    cover: "/brand-reports/nike-cover.jpg",
    logo: "/brand-reports/nike-logo.svg",
    description: {
      zh: "跑步与日常运动场景仍是内容合作的高热度方向。",
      en: "Running and everyday movement remain high-interest creator collaboration themes.",
    },
    tags: ["Sportswear", "Running", "High engagement"],
  },
  {
    name: "Aesop",
    url: "aesop.com",
    cover: "/brand-reports/aesop-cover.jpg",
    logo: "/brand-reports/aesop-logo.png",
    description: {
      zh: "仪式感护理与空间美学内容保持稳定的高意向互动。",
      en: "Ritual-led care and design-forward content continue to attract high-intent engagement.",
    },
    tags: ["Beauty", "Premium", "High intent"],
  },
  {
    name: "Oatside",
    url: "oatside.com",
    cover: "/brand-reports/oatside-cover.jpg",
    logo: "/brand-reports/oatside-logo.png",
    description: {
      zh: "咖啡、通勤与轻生活方式内容带来更多自然讨论。",
      en: "Coffee, commute, and easy-living content are driving organic conversations.",
    },
    tags: ["Food & beverage", "Lifestyle", "+24% creators"],
  },
  {
    name: "Glossier",
    url: "glossier.com",
    cover: "/brand-reports/glossier-cover.jpg",
    logo: "",
    description: {
      zh: "真实体验与日常妆容分享更适合社区型内容合作。",
      en: "Authentic routines and everyday makeup fit community-led creator programs.",
    },
    tags: ["Beauty", "Community", "Creator fit"],
  },
  {
    name: "Allbirds",
    url: "allbirds.com",
    cover: "/brand-reports/allbirds-cover.jpg",
    logo: "",
    description: {
      zh: "舒适、可持续和轻运动话题适合长期内容种草。",
      en: "Comfort, sustainability, and easy movement suit ongoing content seeding.",
    },
    tags: ["Fashion", "Sustainability", "8 creator fits"],
  },
] as const;

export default function BrandInsightsPage() {
  const l = useLoc();
  const sectionTab = useUIStore((state) => state.discoverSections.brandRadar);
  const [brand, setBrand] = useState("");
  const [ready, setReady] = useState(false);
  const [activeFilter, setActiveFilter] = useState(0);
  const displayedBrand = brand.trim() || "GlowLab";
  const explore = () => setReady(true);

  return (
    <main className="min-h-full bg-surface px-6 py-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1400px]">
        {sectionTab === "competitors" ? (
          <CompetitorsPanel />
        ) : !ready ? (
          <section>
            <div className="relative min-h-[290px] overflow-hidden rounded-[18px] border border-white/90 bg-white/65 shadow-[0_14px_42px_rgba(39,48,71,0.06)] backdrop-blur-xl">
              <div className="pointer-events-none absolute -left-24 -top-36 h-[330px] w-[500px] rounded-full bg-soft-pink/70 blur-3xl" />
              <div className="pointer-events-none absolute -right-20 bottom-[-150px] h-[360px] w-[500px] rounded-full bg-brand/10 blur-3xl" />
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand/10" />
              {signalDots.map((signal) => (
                <div
                  key={signal.label}
                  className={cn(
                    "pointer-events-none absolute hidden items-center gap-2 rounded-[10px] border border-white/80 bg-white/55 px-3 py-2 backdrop-blur-md md:flex",
                    signal.className,
                  )}
                >
                  <span
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-[7px] text-[14px] font-semibold",
                      signal.tone === "pink"
                        ? "bg-soft-pink text-brand"
                        : "bg-soft-blue text-blue-text",
                    )}
                  >
                    {signal.icon}
                  </span>
                  <span className="text-[10px] font-semibold text-slate">{signal.label}</span>
                </div>
              ))}
              <div className="relative mx-auto flex min-h-[290px] max-w-[860px] flex-col items-center justify-center px-6 text-center">
                <div className="mb-2 flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-white/75 text-brand shadow-sm">
                    <Radar className="h-4 w-4" />
                  </span>
                  <span className="text-[14px] font-bold tracking-[-0.025em] text-navy">
                    {l(L.title)}
                  </span>
                </div>
                <h1 className="text-[28px] font-bold tracking-[-0.05em] text-navy sm:text-[38px]">
                  {l({ zh: "发现品牌下一步的机会", en: "Discover your brand’s next opportunity" })}
                </h1>
                <p className="mt-1.5 text-[11px] text-slate">
                  {l({
                    zh: "搜索一个品牌、官网或品类，开始追踪市场正在发生的变化。",
                    en: "Search a brand, website, or category to see what’s moving in the market.",
                  })}
                </p>
                <div className="mt-5 flex w-full max-w-[760px] items-center gap-2 rounded-full border border-white/95 bg-white/80 p-1.5 shadow-[0_12px_36px_rgba(32,42,67,0.08)] backdrop-blur-md">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                    <input
                      value={brand}
                      onChange={(event) => setBrand(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") explore();
                      }}
                      placeholder={l({
                        zh: "输入品牌名称或官网，例如 Shein、shein.com",
                        en: "Enter a brand or website, e.g. Shein or shein.com",
                      })}
                      className="h-10 w-full bg-transparent pl-10 pr-2 text-[12px] text-ink outline-none placeholder:text-muted"
                    />
                  </div>
                  <Button onClick={explore} className="h-10 rounded-full px-5">
                    <Sparkles className="h-3.5 w-3.5" />
                    {l(L.analyze)}
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <button
                  key={category.en}
                  type="button"
                  onClick={() => setActiveFilter(index)}
                  className={cn(
                    "rounded-full px-4 py-2 text-[10.5px] font-semibold transition-colors",
                    activeFilter === index
                      ? "bg-brand text-white shadow-cta"
                      : "bg-page text-slate hover:bg-soft-pink hover:text-brand",
                  )}
                >
                  {l(category)}
                </button>
              ))}
            </div>
            <BrandGrid category={activeFilter} />
          </section>
        ) : (
          <BrandReport brand={displayedBrand} onBack={() => setReady(false)} />
        )}
      </div>
    </main>
  );
}

function LegacyCompetitorsPanel() {
  const l = useLoc();
  const competitors = featuredBrands
    .slice(0, 4)
    .map((brand, index) => ({
      brand,
      mentions: ["128K", "96K", "74K", "52K"][index],
      share: ["32%", "24%", "19%", "13%"][index],
      growth: [18, 12, 27, 9][index],
      creators: [428, 316, 204, 148][index],
    }));
  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-[20px] font-bold tracking-[-0.025em] text-navy">
            {l({ zh: "竞品表现对比", en: "Competitor landscape" })}
          </h2>
          <p className="mt-1 text-[11px] text-slate">
            {l({
              zh: "对比品牌声量、增长速度、达人覆盖和近期市场动作。",
              en: "Compare share of voice, momentum, creator coverage, and recent market moves.",
            })}
          </p>
        </div>
        <Button variant="outline">
          <Sparkles className="h-3.5 w-3.5" />
          {l({ zh: "生成竞品解读", en: "Generate analysis" })}
        </Button>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {competitors.map(({ brand, mentions, share, growth, creators }) => (
          <article key={brand.name} className="rounded-[14px] border border-border bg-white p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-[10px] border border-border bg-white">
                {brand.logo ? (
                  <img src={brand.logo} alt="" className="h-full w-full object-contain p-2" />
                ) : (
                  <Building2 className="h-4 w-4 text-muted" />
                )}
              </span>
              <div>
                <h3 className="text-[13px] font-semibold text-ink">{brand.name}</h3>
                <p className="text-[9px] text-muted">{brand.url}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <CompareMetric label={l({ zh: "品牌提及", en: "Mentions" })} value={mentions} />
              <CompareMetric label={l({ zh: "声量份额", en: "Share" })} value={share} />
              <CompareMetric
                label={l({ zh: "达人覆盖", en: "Creators" })}
                value={String(creators)}
              />
              <CompareMetric
                label={l({ zh: "增长", en: "Growth" })}
                value={`+${growth}%`}
                positive
              />
            </div>
          </article>
        ))}
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-[1.2fr_.8fr]">
        <article className="rounded-[14px] border border-border bg-white p-5">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-brand" />
            <h3 className="text-[14px] font-semibold text-navy">
              {l({ zh: "市场位置", en: "Market position" })}
            </h3>
          </div>
          <div className="mt-5 space-y-4">
            {competitors.map(({ brand, growth }, index) => (
              <div key={brand.name} className="grid grid-cols-[90px_1fr_44px] items-center gap-3">
                <span className="text-[10.5px] font-medium text-ink">{brand.name}</span>
                <div className="h-2 overflow-hidden rounded-full bg-page">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      index === 0
                        ? "bg-brand"
                        : index === 1
                          ? "bg-[#7c8fbd]"
                          : index === 2
                            ? "bg-teal"
                            : "bg-[#c6a36b]",
                    )}
                    style={{ width: `${48 + growth * 2}%` }}
                  />
                </div>
                <span className="text-right text-[9.5px] font-semibold text-slate">+{growth}%</span>
              </div>
            ))}
          </div>
        </article>
        <article className="rounded-[14px] border border-border bg-white p-5">
          <h3 className="text-[14px] font-semibold text-navy">
            {l({ zh: "近期动作", en: "Recent moves" })}
          </h3>
          <div className="mt-4 space-y-3">
            {[
              l({
                zh: "Nike 扩大跑步社区达人合作",
                en: "Nike expanded running-community creator partnerships",
              }),
              l({
                zh: "SHEIN 提高新品短视频发布频率",
                en: "SHEIN increased short-form launch frequency",
              }),
              l({
                zh: "Aesop 加码门店体验内容",
                en: "Aesop invested in retail-experience content",
              }),
            ].map((item, index) => (
              <div key={item} className="flex gap-3">
                <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-brand" />
                <div>
                  <p className="text-[10.5px] leading-5 text-slate">{item}</p>
                  <span className="text-[8.5px] text-muted">
                    {index + 1} {l({ zh: "天前", en: "days ago" })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

function CompetitorsPanel() {
  const l = useLoc();
  const [brand, setBrand] = useState("");
  const [competitors, setCompetitors] = useState("");
  const [reports, setReports] = useState([
    {
      id: "shein-nike",
      title: "SHEIN vs Nike",
      brand: "SHEIN",
      competitor: "Nike",
      scope: { zh: "美妆与生活方式 · 美国", en: "Beauty & lifestyle · US" },
      date: "2026-09-18",
      cover: "/brand-reports/shein-cover.jpg",
      logo: "/brand-reports/shein-logo.png",
      rivalLogo: "/brand-reports/nike-logo.svg",
    },
    {
      id: "aesop-glossier",
      title: "Aesop vs Glossier",
      brand: "Aesop",
      competitor: "Glossier",
      scope: { zh: "护肤 · 美国", en: "Skincare · US" },
      date: "2026-09-12",
      cover: "/brand-reports/aesop-cover.jpg",
      logo: "/brand-reports/aesop-logo.png",
      rivalLogo: "",
    },
    {
      id: "oatside-oatly",
      title: "Oatside vs Oatly",
      brand: "Oatside",
      competitor: "Oatly",
      scope: { zh: "食品饮料 · 新加坡", en: "Food & beverage · Singapore" },
      date: "2026-09-04",
      cover: "/brand-reports/oatside-cover.jpg",
      logo: "/brand-reports/oatside-logo.png",
      rivalLogo: "",
    },
  ]);
  const createReport = () => {
    const own = brand.trim() || "My brand";
    const rival = competitors.trim() || "Competitor";
    setReports((current) => [
      {
        id: `${own}-${rival}-${Date.now()}`,
        title: `${own} vs ${rival}`,
        brand: own,
        competitor: rival,
        scope: { zh: "全部行业 · 全球", en: "All categories · Global" },
        date: l({ zh: "刚刚", en: "Just now" }),
        cover: "/brand-reports/shein-cover.jpg",
        logo: "",
        rivalLogo: "",
      },
      ...current,
    ]);
  };
  const examples = ["SHEIN", "Nike", "Aesop", "Glossier", "Oatside"];
  return (
    <section className="py-1">
      <div className="relative overflow-hidden rounded-[16px] border border-border bg-white px-5 py-6 md:px-7 md:py-7">
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[35%] bg-gradient-to-l from-[#f6f3ff] via-[#faf9ff] to-transparent lg:block" />
        <div className="pointer-events-none absolute right-10 top-1/2 hidden h-[126px] w-[226px] -translate-y-1/2 lg:block">
          <div className="absolute left-0 top-8 h-[70px] w-[76px] -rotate-6 rounded-[12px] border border-white bg-white/75 p-3 shadow-[0_10px_28px_rgba(63,50,106,0.08)]">
            <span className="block h-1.5 w-10 rounded-full bg-[#ded9f5]" />
            <span className="mt-3 block h-1.5 w-8 rounded-full bg-[#ebe8f7]" />
            <span className="mt-3 block h-1.5 w-11 rounded-full bg-[#ebe8f7]" />
          </div>
          <div className="absolute left-[62px] top-0 flex h-[112px] w-[112px] items-center justify-center rounded-[15px] border border-white bg-white shadow-[0_14px_36px_rgba(63,50,106,0.1)]">
            <BarChart3 className="h-12 w-12 text-brand" />
          </div>
          <div className="absolute right-0 top-9 h-[72px] w-[70px] rotate-6 rounded-[12px] border border-white bg-white/65 p-3 shadow-[0_10px_28px_rgba(63,50,106,0.07)]">
            <span className="block h-1.5 w-10 rounded-full bg-[#ded9f5]" />
            <span className="mt-3 block h-1.5 w-8 rounded-full bg-[#ebe8f7]" />
            <span className="mt-3 block h-1.5 w-11 rounded-full bg-[#ebe8f7]" />
          </div>
          <Sparkles className="absolute right-5 -top-1 h-5 w-5 text-brand" />
        </div>
        <div className="relative max-w-[1040px]">
          <div className="inline-flex items-center gap-2 rounded-full bg-page px-3 py-1.5 text-[10px] font-medium text-slate">
            <Sparkles className="h-3.5 w-3.5 text-brand" />
            {l({ zh: "AI 竞品分析", en: "AI competitor analysis" })}
          </div>
          <h1 className="mt-4 text-[27px] font-semibold tracking-[-0.04em] text-ink md:text-[30px]">
            {l({ zh: "生成一份竞品分析报告", en: "Generate a competitor analysis report" })}
          </h1>
          <p className="mt-2 max-w-[680px] text-[12px] leading-6 text-slate">
            {l({
              zh: "输入你的品牌和竞品，AI 会整理品牌声量、内容策略与达人合作等维度进行对比分析。",
              en: "Add your brand and competitors. AI will compare share of voice, content strategy, and creator partnerships.",
            })}
          </p>
          <div className="mt-6 grid gap-3 lg:grid-cols-[1fr_1.12fr_auto]">
            <label htmlFor="competitor-own-brand" className="block">
              <span className="mb-2 block text-[10.5px] font-medium text-ink">
                {l({ zh: "请输入你的品牌", en: "Your brand" })}
                <span className="ml-1 text-brand">*</span>
              </span>
              <span className="relative block">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  id="competitor-own-brand"
                  value={brand}
                  onChange={(event) => setBrand(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") createReport();
                  }}
                  placeholder={l({ zh: "例如：SHEIN", en: "e.g. SHEIN" })}
                  className="h-11 w-full rounded-[9px] border border-border bg-white pl-10 pr-3 text-[12px] text-ink outline-none placeholder:text-muted focus:border-brand/40 focus:ring-2 focus:ring-brand/5"
                />
              </span>
            </label>
            <label htmlFor="competitor-rivals" className="block">
              <span className="mb-2 flex items-center gap-1.5 text-[10.5px] font-medium text-ink">
                {l({ zh: "查看竞品（可选）", en: "Competitors (optional)" })}
                <HelpCircle className="h-3.5 w-3.5 text-muted" />
              </span>
              <span className="relative block">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  id="competitor-rivals"
                  value={competitors}
                  onChange={(event) => setCompetitors(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") createReport();
                  }}
                  placeholder={l({
                    zh: "例如：Nike、Aesop；不填写将自动推荐",
                    en: "e.g. Nike, Aesop; leave blank for recommendations",
                  })}
                  className="h-11 w-full rounded-[9px] border border-border bg-white pl-10 pr-3 text-[12px] text-ink outline-none placeholder:text-muted focus:border-brand/40 focus:ring-2 focus:ring-brand/5"
                />
              </span>
            </label>
            <div className="flex items-end">
              <Button onClick={createReport} className="h-11 w-full px-5 lg:w-auto">
                <Sparkles className="h-3.5 w-3.5" />
                {l({ zh: "生成报告", en: "Generate report" })}
              </Button>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] text-muted">
            <span>{l({ zh: "不知道填什么？试试这些品牌：", en: "Need an example? Try:" })}</span>
            {examples.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => setBrand(example)}
                className="rounded-full border border-border bg-white px-2.5 py-1 text-slate transition-colors hover:border-border-strong hover:text-ink"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-[17px] font-semibold tracking-[-0.02em] text-ink">
            {l({ zh: "历史报告", en: "Report history" })}
          </h2>
          <p className="mt-1 text-[10px] text-muted">
            {l({ zh: `共 ${reports.length} 份报告`, en: `${reports.length} reports` })}
          </p>
        </div>
        <label htmlFor="competitor-report-sort" className="relative">
          <select
            id="competitor-report-sort"
            className="h-9 appearance-none rounded-[9px] border border-border bg-white pl-3 pr-8 text-[10.5px] text-slate outline-none focus:border-border-strong"
          >
            <option>{l({ zh: "最近生成", en: "Newest" })}</option>
            <option>{l({ zh: "最早生成", en: "Oldest" })}</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
        </label>
      </div>
      <div className="mt-3 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {reports.map((report) => (
          <article
            key={report.id}
            className="group overflow-hidden rounded-[14px] border border-border bg-white transition-colors hover:border-border-strong"
          >
            <div className="block w-full text-left">
              <div className="relative h-[166px] overflow-hidden bg-page">
                <img
                  src={report.cover}
                  alt=""
                  className="h-full w-full object-cover opacity-75 transition-transform duration-500 group-hover:scale-[1.025]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/72 to-white/10" />
                <div className="absolute inset-0 p-5">
                  <p className="text-[8px] font-medium uppercase tracking-[0.12em] text-muted">
                    Competitor analysis report
                  </p>
                  <h3 className="mt-2 max-w-[220px] text-[19px] font-semibold tracking-[-0.03em] text-ink">
                    {report.title}
                  </h3>
                  <p className="mt-2 text-[9px] text-muted">{report.date}</p>
                  <div className="absolute bottom-4 left-5 flex items-center gap-2">
                    <span className="flex h-8 min-w-8 items-center justify-center overflow-hidden rounded-[8px] border border-white bg-white px-1.5 shadow-sm">
                      {report.logo ? (
                        <img
                          src={report.logo}
                          alt={`${report.brand} logo`}
                          className="h-5 w-7 object-contain"
                        />
                      ) : (
                        <span className="text-[9px] font-semibold text-ink">
                          {report.brand.slice(0, 3)}
                        </span>
                      )}
                    </span>
                    <span className="text-[10px] text-muted">vs</span>
                    <span className="flex h-8 min-w-8 items-center justify-center overflow-hidden rounded-[8px] border border-white bg-white px-1.5 shadow-sm">
                      {report.rivalLogo ? (
                        <img
                          src={report.rivalLogo}
                          alt={`${report.competitor} logo`}
                          className="h-5 w-7 object-contain"
                        />
                      ) : (
                        <span className="text-[9px] font-semibold text-ink">
                          {report.competitor.slice(0, 3)}
                        </span>
                      )}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label={l({ zh: "更多操作", en: "More actions" })}
                  className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-slate shadow-sm hover:text-ink"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-end justify-between gap-3 p-4">
                <div>
                  <p className="text-[13px] font-medium text-ink">{report.title}</p>
                  <p className="mt-1 text-[9.5px] text-muted">
                    {l(report.scope)} · {report.date}
                  </p>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-ink" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function CompareMetric({
  label,
  value,
  positive,
}: { label: string; value: string; positive?: boolean }) {
  return (
    <div className="rounded-[9px] bg-page p-2.5">
      <p className="text-[8.5px] text-muted">{label}</p>
      <p className={cn("mt-1 text-[13px] font-bold", positive ? "text-teal-text" : "text-ink")}>
        {value}
      </p>
    </div>
  );
}

function BrandGrid({ category: _category }: { category: number }) {
  const l = useLoc();
  return (
    <section className="pt-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {featuredBrands.map((brand) => (
          <Link
            key={brand.name}
            href={`/brand-insights/${brand.name.toLowerCase()}`}
            className="group overflow-hidden rounded-[15px] border border-border bg-surface transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(26,36,58,0.06)]"
          >
            <div className="relative h-[152px] overflow-hidden bg-[#f1f2f4]">
              <img
                src={brand.cover}
                alt=""
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            <div className="relative p-4 pt-5">
              <span className="absolute -top-6 left-4 flex h-11 w-11 items-center justify-center overflow-hidden rounded-[12px] border-4 border-surface bg-white text-slate shadow-sm">
                {brand.logo ? (
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className="h-full w-full object-contain p-2"
                  />
                ) : (
                  <Building2 className="h-4 w-4" />
                )}
              </span>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-[15px] font-semibold text-navy">{brand.name}</h3>
                  <p className="mt-0.5 text-[10px] text-muted">{brand.url}</p>
                </div>
                <ArrowUpRight className="mt-1 h-4 w-4 text-muted transition-colors group-hover:text-brand" />
              </div>
              <p className="mt-3 min-h-[32px] text-[10.5px] leading-4 text-slate">
                {l(brand.description)}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {brand.tags.map((tag, tagIndex) => (
                  <span
                    key={tag}
                    className={cn(
                      "rounded-full px-2 py-1 text-[9px] font-medium",
                      tagIndex === 2 ? "bg-soft-pink text-brand" : "bg-page text-slate",
                    )}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function BrandReport({ brand, onBack }: { brand: string; onBack: () => void }) {
  const l = useLoc();
  return (
    <section>
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <button
            type="button"
            onClick={onBack}
            className="mb-3 text-[10px] font-semibold text-brand hover:text-brand-hover"
          >
            ← {l({ zh: "重新探索", en: "Explore another brand" })}
          </button>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-[11px] bg-soft-pink text-brand">
              <Building2 className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
                {l(L.monitoring)}
              </p>
              <h1 className="mt-0.5 text-[28px] font-bold tracking-[-0.04em] text-navy">
                {brand} · {l(L.report)}
              </h1>
            </div>
          </div>
          <p className="mt-3 text-[11px] text-slate">{l(L.reportDesc)}</p>
        </div>
        <Button variant="outline">
          <BellRing className="h-3.5 w-3.5" />
          {l(L.alert)}
        </Button>
      </header>
      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <Metric
          icon={<MessageSquareText className="h-4 w-4" />}
          label={l(L.mentions)}
          value="12.4K"
          delta="+18%"
          tone="pink"
        />
        <Metric
          icon={<TrendingUp className="h-4 w-4" />}
          label={l(L.sentiment)}
          value="78%"
          delta="+6%"
          tone="teal"
        />
        <Metric
          icon={<Radar className="h-4 w-4" />}
          label={l(L.shareOfVoice)}
          value="14.2%"
          delta="+2.1%"
          tone="blue"
        />
        <Metric
          icon={<Sparkles className="h-4 w-4" />}
          label={l(L.emergingTopics)}
          value="6"
          delta="+2"
          tone="lavender"
        />
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-[1.2fr_.8fr]">
        <article className="rounded-[14px] border border-border bg-surface p-5">
          <div className="flex items-center gap-2">
            <MessageSquareText className="h-4 w-4 text-brand" />
            <h2 className="text-[14px] font-semibold text-navy">{l(L.conversation)}</h2>
          </div>
          <div className="mt-4 space-y-3">
            {["#SkinBarrier", "#7DayRoutine", "#CommuterSkincare"].map((topic, index) => (
              <div
                key={topic}
                className="flex items-center gap-3 rounded-[10px] bg-surface-warm p-3"
              >
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    index === 0 ? "bg-brand" : index === 1 ? "bg-teal" : "bg-blue-500",
                  )}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-[11.5px] font-semibold text-ink">{topic}</p>
                  <p className="mt-1 text-[9.5px] text-slate">
                    {l({
                      zh: "讨论集中在真实功效、连续使用记录与换季护理。",
                      en: "Conversation centers on proof points, routine diaries, and seasonal skincare.",
                    })}
                  </p>
                </div>
                <span className="text-[11px] font-bold text-teal-text">+{38 - index * 9}%</span>
              </div>
            ))}
          </div>
        </article>
        <div className="space-y-4">
          <InsightCard
            icon={<Globe2 className="h-4 w-4" />}
            title={l(L.competitor)}
            items={[
              l({
                zh: "竞品 A 加大 #SkinBarrier 内容投放",
                en: "Competitor A increased #SkinBarrier content",
              }),
              l({
                zh: "竞品 B 新增微型达人测评合作",
                en: "Competitor B added micro-creator reviews",
              }),
            ]}
          />
          <InsightCard
            icon={<UsersRound className="h-4 w-4" />}
            title={l(L.creator)}
            items={[
              l({
                zh: "教育型护肤达人互动率高出均值 1.8 倍",
                en: "Educational skincare creators outperform by 1.8×",
              }),
              l({
                zh: "7 天实测内容更适合中腰部达人扩散",
                en: "7-day tests suit mid-tier creator seeding",
              }),
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function Metric({
  icon,
  label,
  value,
  delta,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  delta: string;
  tone: "pink" | "teal" | "blue" | "lavender";
}) {
  const color =
    tone === "pink"
      ? "bg-soft-pink text-brand"
      : tone === "teal"
        ? "bg-soft-teal text-teal-text"
        : tone === "blue"
          ? "bg-soft-blue text-blue-text"
          : "bg-soft-lavender text-lavender-text";
  return (
    <article className="rounded-[13px] border border-border bg-surface p-4">
      <span className={cn("flex h-8 w-8 items-center justify-center rounded-[8px]", color)}>
        {icon}
      </span>
      <p className="mt-3 text-[10px] text-muted">{label}</p>
      <div className="mt-1 flex items-end justify-between">
        <strong className="text-[23px] tracking-[-0.03em] text-navy">{value}</strong>
        <span className="text-[10px] font-semibold text-teal-text">{delta}</span>
      </div>
    </article>
  );
}

function InsightCard({
  icon,
  title,
  items,
}: { icon: React.ReactNode; title: string; items: string[] }) {
  return (
    <article className="rounded-[14px] border border-border bg-surface p-4">
      <div className="flex items-center gap-2 text-navy">
        {icon}
        <h2 className="text-[13px] font-semibold">{title}</h2>
      </div>
      <div className="mt-3 space-y-2">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-[8px] bg-surface-warm px-3 py-2.5 text-[10.5px] leading-4 text-slate"
          >
            {item}
            <ArrowUpRight className="ml-1 inline h-3 w-3 text-muted" />
          </div>
        ))}
      </div>
    </article>
  );
}
