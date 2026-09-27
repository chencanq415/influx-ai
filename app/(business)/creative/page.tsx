"use client";

import { Button } from "@/components/ui/button";
import { useLoc } from "@/lib/i18n/use-i18n";
import { useUIStore } from "@/lib/store/ui-store";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  BarChart3,
  Bookmark,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  Eye,
  Flame,
  Images,
  Lightbulb,
  PackageSearch,
  PenLine,
  Play,
  Radar,
  Search,
  Sparkles,
  Tags,
  Telescope,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const L = {
  title: { zh: "创意中心", en: "Creative" },
  subtitle: {
    zh: "从营销节点与趋势信号中发现机会，用 AI 生成策划、文案和内容，并沉淀可复用的品牌创意。",
    en: "Turn marketing moments and trend signals into plans, copy, content, and reusable brand ideas with AI.",
  },
  calendar: { zh: "营销日历", en: "Marketing Calendar" },
  calendarDesc: {
    zh: "查看关键营销节点，提前安排策划、达人建联与内容发布。",
    en: "Plan strategy, creator outreach, and publishing around key marketing moments.",
  },
  generateCampaign: { zh: "生成营销活动", en: "Generate campaign" },
  previousMonth: { zh: "上一个月", en: "Previous month" },
  nextMonth: { zh: "下一个月", en: "Next month" },
  trendRadar: { zh: "热门趋势", en: "Trends" },
  trendRadarDesc: {
    zh: "查看正在增长的话题、商品与内容信号。",
    en: "See the topics, products, and content formats gaining momentum.",
  },
  sevenDays: { zh: "近 7 日", en: "Last 7 days" },
  thirtyDays: { zh: "近 30 日", en: "Last 30 days" },
  contentTrend: { zh: "内容趋势", en: "Content trends" },
  topicTrend: { zh: "话题趋势", en: "Topic trends" },
  productTrend: { zh: "商品趋势", en: "Product trends" },
  creativeStudio: { zh: "AI 创意工坊", en: "AI Creative Studio" },
  creativeStudioDesc: {
    zh: "把趋势洞察转化为可执行的营销活动策划、品牌文案和达人内容。",
    en: "Turn trend insights into campaign plans, brand copy, and creator-ready content.",
  },
  startCreating: { zh: "开始创作", en: "Start creating" },
  openStudio: { zh: "打开工坊", en: "Open studio" },
  inspiration: { zh: "灵感与沉淀", en: "Inspiration & Learnings" },
  inspirationDesc: {
    zh: "收藏外部灵感，并把历史高表现内容沉淀为团队可复用的方法。",
    en: "Save outside inspiration and turn past winners into reusable team knowledge.",
  },
  viewAll: { zh: "查看全部", en: "View all" },
} as const;

const calendarMonths = [
  { id: "aug", year: 2026, month: 7, label: { zh: "2026 年 8 月", en: "August 2026" } },
  { id: "sep", year: 2026, month: 8, label: { zh: "2026 年 9 月", en: "September 2026" } },
  { id: "oct", year: 2026, month: 9, label: { zh: "2026 年 10 月", en: "October 2026" } },
] as const;

const calendarEvents = {
  aug: [
    {
      start: 17,
      end: 31,
      title: { zh: "返校季内容高峰", en: "Back-to-school peak" },
      tone: "pink",
    },
    {
      start: 20,
      end: 30,
      title: { zh: "夏季清仓促销", en: "Summer clearance" },
      tone: "blue",
    },
    {
      start: 24,
      end: 31,
      title: { zh: "秋季新品预热窗口", en: "Autumn launch window" },
      tone: "green",
    },
  ],
  sep: [
    {
      start: 7,
      end: 7,
      title: { zh: "Labor Day 营销节点", en: "Labor Day moment" },
      tone: "pink",
    },
    {
      start: 10,
      end: 30,
      title: { zh: "时装月内容窗口", en: "Fashion Month content" },
      tone: "blue",
    },
    {
      start: 14,
      end: 30,
      title: { zh: "Holiday 达人种草启动", en: "Holiday creator seeding" },
      tone: "green",
    },
  ],
  oct: [
    {
      start: 1,
      end: 7,
      title: { zh: "黄金周营销窗口", en: "Golden Week moment" },
      tone: "pink",
    },
    {
      start: 5,
      end: 31,
      title: { zh: "Black Friday 筹备", en: "Black Friday prep" },
      tone: "blue",
    },
    {
      start: 19,
      end: 31,
      title: { zh: "万圣节内容热潮", en: "Halloween content peak" },
      tone: "green",
    },
  ],
} as const;

const contentTrends = [
  {
    handle: "@glowwithmia",
    format: { zh: "GRWM · 真实测评", en: "GRWM · Real review" },
    caption: { zh: "连续 7 天记录皮肤屏障变化", en: "Tracking my skin barrier for 7 days" },
    views: "1.2M",
    signal: 38,
    gradient: "from-[#f6d9cf] via-[#f4e8df] to-[#d5bbad]",
  },
  {
    handle: "@dailybyzoe",
    format: { zh: "前后对比 · 教程", en: "Before & after · Tutorial" },
    caption: { zh: "通勤妆从早八撑到晚八", en: "Desk-to-dinner makeup test" },
    views: "864K",
    signal: 31,
    gradient: "from-[#d4dcec] via-[#edf0f7] to-[#c5ccda]",
  },
] as const;

const topicTrends = [
  { hashtag: "#SkinBarrier", zh: "屏障修护", posts: "84.2K", signal: 54 },
  { hashtag: "#DeskToDinner", zh: "通勤变装", posts: "51.6K", signal: 36 },
  { hashtag: "#AffordableLuxury", zh: "低成本精致感", posts: "38.9K", signal: 29 },
] as const;

const productTrends = [
  {
    name: { zh: "旅行装精华套组", en: "Travel serum set" },
    category: { zh: "护肤", en: "Skincare" },
    signal: 42,
    shape: "bottle",
  },
  {
    name: { zh: "多用途腮红膏", en: "Multi-use balm" },
    category: { zh: "彩妆", en: "Makeup" },
    signal: 33,
    shape: "jar",
  },
  {
    name: { zh: "可替换香氛喷雾", en: "Refillable mist" },
    category: { zh: "香氛", en: "Fragrance" },
    signal: 21,
    shape: "tube",
  },
] as const;

const studios = [
  {
    title: { zh: "AI 做策划案", en: "AI Campaign Planner" },
    description: {
      zh: "输入品牌、产品和目标，生成营销活动 Big Idea、传播阶段与达人内容方向。",
      en: "Generate a big idea, rollout phases, and creator directions from your brand and goals.",
    },
    icon: Lightbulb,
    accent: "from-[#fff0f5] to-[#ffe2eb] text-brand",
    action: "chat" as const,
  },
  {
    title: { zh: "AI 做文案", en: "AI Copywriter" },
    description: {
      zh: "生成品牌主张、广告文案、社媒 Caption、达人 Brief 与多语言改写。",
      en: "Create brand claims, ad copy, captions, creator briefs, and localized variants.",
    },
    icon: PenLine,
    accent: "from-[#eef2fb] to-[#e1e8f8] text-[#415d9b]",
    action: "chat" as const,
  },
  {
    title: { zh: "AI 做内容", en: "AI Content Studio" },
    description: {
      zh: "从趋势和商品卖点生成短视频脚本、分镜、视觉方向和内容改编。",
      en: "Turn trends and product claims into scripts, storyboards, visual directions, and adaptations.",
    },
    icon: Images,
    accent: "from-[#e8f6f4] to-[#d8efec] text-[#16766e]",
    action: "link" as const,
    href: "/context-lab",
  },
] as const;

const inspirationCards = [
  {
    title: { zh: "创意灵感库", en: "Creative Library" },
    description: {
      zh: "收藏案例、视觉参考和达人内容",
      en: "Save campaigns, visuals, and creator content",
    },
    icon: Telescope,
    meta: { zh: "128 个灵感", en: "128 inspirations" },
  },
  {
    title: { zh: "竞品创意动态", en: "Competitor Creative Signals" },
    description: {
      zh: "查看竞品最近测试的主题与内容形式",
      en: "See themes and formats competitors are testing",
    },
    icon: Radar,
    meta: { zh: "本周 16 条新动态", en: "16 new this week" },
    href: "/tracking",
  },
  {
    title: { zh: "高表现内容规律", en: "Winning Content Patterns" },
    description: {
      zh: "从历史营销活动提炼 Hook 与脚本结构",
      en: "Learn hooks and structures from past campaigns",
    },
    icon: BarChart3,
    meta: { zh: "已沉淀 24 条规律", en: "24 patterns saved" },
    href: "/insights",
  },
] as const;

const weekdays = [
  { zh: "周一", en: "MON" },
  { zh: "周二", en: "TUE" },
  { zh: "周三", en: "WED" },
  { zh: "周四", en: "THU" },
  { zh: "周五", en: "FRI" },
  { zh: "周六", en: "SAT" },
  { zh: "周日", en: "SUN" },
] as const;

const eventTone = {
  pink: "border-[#ffd2df] bg-[#fff0f5] text-[#b31f50]",
  blue: "border-[#d9e2f5] bg-[#eef2fb] text-[#415d9b]",
  green: "border-[#cbe9e4] bg-[#e8f6f4] text-[#16766e]",
} as const;

function LegacyTrendRankings({ board, onBoardChange, range, onRangeChange, platform, onPlatformChange, region, onRegionChange }: { board: "topic" | "product" | "content"; onBoardChange: (value: "topic" | "product" | "content") => void; range: "7d" | "30d"; onRangeChange: (value: "7d" | "30d") => void; platform: string; onPlatformChange: (value: string) => void; region: string; onRegionChange: (value: string) => void }) {
  const l = useLoc();
  const boards = [
    { id: "topic" as const, label: { zh: "话题榜", en: "Topic ranking" }, icon: Tags },
    { id: "product" as const, label: { zh: "商品榜", en: "Product ranking" }, icon: PackageSearch },
    { id: "content" as const, label: { zh: "内容榜", en: "Content ranking" }, icon: Clapperboard },
  ];
  const growth = (value: number) => range === "7d" ? value : Math.round(value * 1.7);
  const topicRows = topicTrends.map((topic, index) => ({ id: topic.hashtag, rank: index + 1, primary: topic.hashtag, secondary: { zh: `${topic.zh} · ${topic.posts} 条内容`, en: `${topic.posts} posts` }, metric: topic.posts, signal: growth(topic.signal), icon: Tags }));
  const productRows = productTrends.map((product, index) => ({ id: product.name.en, rank: index + 1, primary: l(product.name), secondary: { zh: `${l(product.category)} · 关联内容持续增长`, en: `${l(product.category)} · Growing creator mentions` }, metric: ["12.8K", "9.4K", "6.2K"][index], signal: growth(product.signal), icon: PackageSearch, shape: product.shape }));
  const contentRows = contentTrends.map((content, index) => ({ id: content.handle, rank: index + 1, primary: content.handle, secondary: content.format, metric: content.views, signal: growth(content.signal), icon: Clapperboard, gradient: content.gradient, caption: content.caption }));
  const rows: any[] = board === "topic" ? topicRows : board === "product" ? productRows : contentRows;
  const column = board === "topic" ? { zh: "内容量", en: "Posts" } : board === "product" ? { zh: "关联内容", en: "Mentions" } : { zh: "播放量", en: "Views" };
  return <section className="mt-4"><div className="flex flex-wrap items-end justify-between gap-4"><div><h2 className="text-[20px] font-semibold tracking-[-0.025em] text-ink">{l(L.trendRadar)}</h2><p className="mt-1 text-[11px] text-muted">{l(L.trendRadarDesc)}</p></div><span className="text-[10px] text-muted">{l({ zh: "每日更新", en: "Updated daily" })}</span></div>
    <div className="mt-5 flex flex-wrap items-center gap-1 border-b border-border"><span className="mr-3 text-[9px] font-medium uppercase tracking-[0.08em] text-muted">{l({ zh: "排行榜", en: "Rankings" })}</span>{boards.map((item) => { const Icon = item.icon; const active = board === item.id; return <button key={item.id} type="button" onClick={() => onBoardChange(item.id)} className={`inline-flex h-9 items-center gap-2 rounded-t-[8px] px-3 text-[11px] transition-colors ${active ? "bg-[#F5F1FF] font-medium text-brand" : "text-slate hover:bg-[#F7F7F8] hover:text-ink"}`}><Icon className="h-3.5 w-3.5" />{l(item.label)}</button>; })}</div>
    <div className="mt-4 flex flex-wrap items-center gap-2"><label className="flex h-8 items-center rounded-[8px] bg-[#F5F5F6] px-2.5"><span className="sr-only">{l({ zh: "时间范围", en: "Time range" })}</span><select value={range} onChange={(event) => onRangeChange(event.target.value as "7d" | "30d")} className="bg-transparent text-[10px] text-slate outline-none"><option value="7d">{l(L.sevenDays)}</option><option value="30d">{l(L.thirtyDays)}</option></select></label><label className="flex h-8 items-center rounded-[8px] bg-[#F5F5F6] px-2.5"><span className="sr-only">{l({ zh: "平台", en: "Platform" })}</span><select value={platform} onChange={(event) => onPlatformChange(event.target.value)} className="bg-transparent text-[10px] text-slate outline-none"><option value="all">{l({ zh: "全部平台", en: "All platforms" })}</option><option value="instagram">Instagram</option><option value="tiktok">TikTok</option><option value="youtube">YouTube</option></select></label><label className="flex h-8 items-center rounded-[8px] bg-[#F5F5F6] px-2.5"><span className="sr-only">{l({ zh: "地区", en: "Region" })}</span><select value={region} onChange={(event) => onRegionChange(event.target.value)} className="bg-transparent text-[10px] text-slate outline-none"><option value="us">{l({ zh: "美国", en: "United States" })}</option><option value="global">{l({ zh: "全球", en: "Global" })}</option></select></label><label className="flex h-8 items-center rounded-[8px] bg-[#F5F5F6] px-2.5"><span className="sr-only">{l({ zh: "类目", en: "Category" })}</span><select className="bg-transparent text-[10px] text-slate outline-none"><option>{l({ zh: "全部类目", en: "All categories" })}</option><option>{l({ zh: "美妆", en: "Beauty" })}</option><option>{l({ zh: "生活方式", en: "Lifestyle" })}</option></select></label></div>
    <div className="mt-5 overflow-x-auto rounded-[12px] border border-border bg-white"><div className="min-w-[780px]"><div className="grid grid-cols-[64px_minmax(280px,1.4fr)_160px_160px_100px] border-b border-border bg-[#F7F7F8] px-5 py-3 text-[9px] font-medium uppercase tracking-[0.08em] text-muted"><span>{l({ zh: "排名", en: "Rank" })}</span><span>{l({ zh: "趋势对象", en: "Trend" })}</span><span>{l(column)}</span><span>{l({ zh: "增长", en: "Growth" })}</span><span className="text-right">{l({ zh: "操作", en: "Action" })}</span></div>{rows.map((row) => { const Icon = row.icon; return <article key={row.id} className="grid min-h-[82px] grid-cols-[64px_minmax(280px,1.4fr)_160px_160px_100px] items-center border-b border-border/70 px-5 py-3 last:border-b-0 hover:bg-[#FAFAFB]"><span className="text-[13px] font-medium text-ink">{String(row.rank).padStart(2, "0")}</span><div className="flex min-w-0 items-center gap-3">{board === "content" ? <div className={cn("flex h-11 w-14 shrink-0 items-end rounded-[7px] bg-gradient-to-br p-1.5", row.gradient)}><span className="line-clamp-2 rounded bg-black/30 px-1 py-0.5 text-[6px] leading-3 text-white">{l(row.caption!)}</span></div> : board === "product" ? <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-[#F7F3EE] text-slate"><PackageSearch className="h-4 w-4" /></div> : <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-[#F5F1FF] text-brand"><Icon className="h-4 w-4" /></div>}<div className="min-w-0"><p className="truncate text-[11.5px] font-medium text-ink">{row.primary}</p><p className="mt-1 truncate text-[9.5px] text-muted">{l(row.secondary)}</p></div></div><span className="text-[11px] font-medium text-ink">{row.metric}</span><span className="inline-flex items-center gap-1 text-[10px] font-medium text-teal-text"><TrendingUp className="h-3 w-3" />+{row.signal}%</span><button type="button" className="ml-auto inline-flex h-8 items-center gap-1.5 rounded-[8px] bg-[#F5F5F6] px-2.5 text-[10px] font-medium text-slate hover:bg-[#ECECEF] hover:text-ink"><ArrowRight className="h-3.5 w-3.5" />{l({ zh: "查看", en: "View" })}</button></article>; })}</div></div>
  </section>;
}

function TrendRankings({ board, onBoardChange, range, onRangeChange, platform, onPlatformChange, region, onRegionChange }: { board: "topic" | "product" | "content"; onBoardChange: (value: "topic" | "product" | "content") => void; range: "7d" | "30d"; onRangeChange: (value: "7d" | "30d") => void; platform: string; onPlatformChange: (value: string) => void; region: string; onRegionChange: (value: string) => void }) {
  const l = useLoc();
  const [query, setQuery] = useState("");
  return <TopicRankingDefault board={board} range={range} onRangeChange={onRangeChange} platform={platform} onPlatformChange={onPlatformChange} region={region} onRegionChange={onRegionChange} />;
  const tabs: Array<{ id: "topic" | "product" | "content"; label: { zh: string; en: string }; icon: typeof Tags }> = [];
  const topicRows = [
    ["#SkinBarrier", "护肤", "屏障修护 · 84.2K 条内容", "84.2K", 54, "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=160&q=80"],
    ["#DeskToDinner", "穿搭", "通勤变装 · 51.6K 条内容", "51.6K", 36, "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=160&q=80"],
    ["#AffordableLuxury", "家居", "低成本精致感 · 38.9K 条内容", "38.9K", 29, "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=160&q=80"],
    ["#CleanGirlMakeup", "美妆", "清透妆容 · 32.1K 条内容", "32.1K", 28, "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=160&q=80"],
    ["#PilatesAtHome", "健身", "居家普拉提 · 28.4K 条内容", "28.4K", 24, "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=160&q=80"],
  ];
  const productRows = [["旅行装精华套组", "护肤", "旅行护肤组合 · 12.8K 条内容", "12.8K", 42, "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=160&q=80"], ["多用途腮红膏", "彩妆", "一物多用妆容 · 9.4K 条内容", "9.4K", 33, "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=160&q=80"], ["可替换香氛喷雾", "香氛", "可持续生活方式 · 6.2K 条内容", "6.2K", 21, "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=160&q=80"], ["防晒棒", "护肤", "通勤防晒需求 · 5.8K 条内容", "5.8K", 18, "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=160&q=80"], ["丝绒唇釉", "彩妆", "低饱和口红趋势 · 4.6K 条内容", "4.6K", 16, "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=160&q=80"]];
  const contentRows = [["@glowwithmia", "护肤", "连续 7 天记录皮肤屏障变化", "1.2M", 38, "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=160&q=80"], ["@dailybyzoe", "生活方式", "从早八到晚八的通勤妆测试", "864K", 31, "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=160&q=80"], ["@theminimaledit", "家居", "一周低成本空间焕新", "621K", 27, "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=160&q=80"], ["@miasoftglow", "美妆", "干净底妆的五分钟教程", "518K", 24, "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=160&q=80"], ["@slowmorningclub", "健身", "15 分钟居家普拉提", "404K", 19, "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=160&q=80"]];
  const rows = board === "topic" ? topicRows : board === "product" ? productRows : contentRows;
  const visibleRows = rows.filter((row) => `${row[0]} ${row[1]} ${row[2]}`.toLowerCase().includes(query.toLowerCase())) as Array<[string, string, string, string, number, string]>;
  const valueLabel = board === "content" ? { zh: "播放量", en: "Views" } : { zh: "内容量", en: "Posts" };
  return <section className="mt-6"><div className="flex items-center gap-3 border-b border-border"><div className="flex items-center gap-2">{tabs.map((tab) => { const Icon = tab.icon; const active = board === tab.id; return <button key={tab.id} type="button" onClick={() => onBoardChange(tab.id)} className={`inline-flex h-12 items-center gap-2 rounded-t-[9px] px-4 text-[12px] font-medium transition-colors ${active ? "border border-brand/50 bg-[#FAF8FF] text-brand" : "text-slate hover:bg-[#F7F7F8] hover:text-ink"}`}><Icon className="h-4 w-4" />{l(tab.label)}</button>; })}</div></div><div className="mt-6 flex flex-wrap items-center gap-2"><label className="flex h-9 items-center rounded-[8px] bg-[#F5F5F6] px-2.5"><select value={range} onChange={(event) => onRangeChange(event.target.value as "7d" | "30d")} className="bg-transparent text-[10px] text-slate outline-none"><option value="7d">{l({ zh: "近 7 天", en: "Last 7 days" })}</option><option value="30d">{l({ zh: "近 30 天", en: "Last 30 days" })}</option></select></label><label className="flex h-9 items-center rounded-[8px] bg-[#F5F5F6] px-2.5"><select value={platform} onChange={(event) => onPlatformChange(event.target.value)} className="bg-transparent text-[10px] text-slate outline-none"><option value="all">{l({ zh: "全部平台", en: "All platforms" })}</option><option value="instagram">Instagram</option><option value="tiktok">TikTok</option><option value="youtube">YouTube</option></select></label><label className="flex h-9 items-center rounded-[8px] bg-[#F5F5F6] px-2.5"><select value={region} onChange={(event) => onRegionChange(event.target.value)} className="bg-transparent text-[10px] text-slate outline-none"><option value="us">{l({ zh: "美国", en: "United States" })}</option><option value="global">{l({ zh: "全球", en: "Global" })}</option></select></label><label className="flex h-9 items-center rounded-[8px] bg-[#F5F5F6] px-2.5"><select className="bg-transparent text-[10px] text-slate outline-none"><option>{l({ zh: "全部类目", en: "All categories" })}</option><option>{l({ zh: "美妆", en: "Beauty" })}</option><option>{l({ zh: "生活方式", en: "Lifestyle" })}</option></select></label><div className="relative ml-auto w-full max-w-[310px]"><Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={l({ zh: board === "topic" ? "搜索话题或关键词…" : board === "product" ? "搜索商品或关键词…" : "搜索内容或创作者…", en: "Search rankings…" })} className="h-9 w-full rounded-[8px] bg-[#F5F5F6] pl-9 pr-3 text-[10px] text-ink outline-none placeholder:text-muted focus:bg-white focus:ring-1 focus:ring-brand/25" /></div></div><div className="mt-6 overflow-x-auto rounded-[12px] border border-border bg-white"><div className="min-w-[760px]"><div className="grid grid-cols-[80px_minmax(330px,1.35fr)_180px_170px_90px] border-b border-border bg-[#F7F7F8] px-5 py-3 text-[9px] font-medium uppercase tracking-[0.08em] text-muted"><span>{l({ zh: "排名", en: "Rank" })}</span><span>{l({ zh: board === "topic" ? "话题" : board === "product" ? "商品" : "内容", en: "Trend" })}</span><span>{l(valueLabel)}</span><span>{l({ zh: "增长", en: "Growth" })}</span><span className="text-right">{l({ zh: "操作", en: "Action" })}</span></div>{visibleRows.map((row, index) => <article key={row[0]} className="grid min-h-[100px] grid-cols-[80px_minmax(330px,1.35fr)_180px_170px_90px] items-center border-b border-border/70 px-5 py-3 last:border-b-0 hover:bg-[#FAFAFB]"><span className="text-[14px] font-semibold text-ink">{String(index + 1).padStart(2, "0")}</span><div className="flex min-w-0 items-center gap-3"><img src={row[5]} alt="" className="h-[60px] w-[60px] shrink-0 rounded-[8px] object-cover" /><div className="min-w-0"><div className="flex items-center gap-2"><p className="truncate text-[12px] font-semibold text-ink">{row[0]}</p><span className="rounded-full bg-[#F5F1FF] px-2 py-0.5 text-[8.5px] font-medium text-brand">{row[1]}</span></div><p className="mt-1 truncate text-[10px] text-muted">{row[2]}</p></div></div><span className="text-[11px] font-medium text-ink">{row[3]}</span><span className="inline-flex items-center gap-1 text-[11px] font-medium text-teal-text"><TrendingUp className="h-3.5 w-3.5" />+{row[4]}%</span><button type="button" className="ml-auto inline-flex h-8 items-center gap-1 rounded-[8px] bg-[#F5F5F6] px-2.5 text-[10px] font-medium text-slate hover:bg-[#ECECEF] hover:text-ink"><ArrowRight className="h-3.5 w-3.5" />{l({ zh: "查看", en: "View" })}</button></article>)}{visibleRows.length === 0 && <div className="px-5 py-16 text-center text-[10px] text-muted">{l({ zh: "没有匹配的趋势结果", en: "No matching trends" })}</div>}</div></div></section>;
}

function TopicRankingDefault({ board, range, onRangeChange, platform, onPlatformChange, region, onRegionChange }: { board: "topic" | "product" | "content"; range: "7d" | "30d"; onRangeChange: (value: "7d" | "30d") => void; platform: string; onPlatformChange: (value: string) => void; region: string; onRegionChange: (value: string) => void }) {
  const l = useLoc();
  const [query, setQuery] = useState("");
  const topicRows = [["#SkinBarrier", "护肤", "屏障修护 · 84.2K 条内容", "84.2K", 54, "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=160&q=80"], ["#DeskToDinner", "穿搭", "通勤变装 · 51.6K 条内容", "51.6K", 36, "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=160&q=80"], ["#AffordableLuxury", "家居", "低成本精致感 · 38.9K 条内容", "38.9K", 29, "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=160&q=80"], ["#CleanGirlMakeup", "美妆", "清透妆容 · 32.1K 条内容", "32.1K", 28, "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=160&q=80"], ["#PilatesAtHome", "健身", "居家普拉提 · 28.4K 条内容", "28.4K", 24, "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=160&q=80"]] as Array<[string, string, string, string, number, string]>;
  const productRows = [["旅行装精华套组", "护肤", "旅行护肤组合 · 12.8K 条内容", "12.8K", 42, "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=160&q=80"], ["多用途腮红膏", "彩妆", "一物多用妆容 · 9.4K 条内容", "9.4K", 33, "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=160&q=80"], ["可替换香氛喷雾", "香氛", "可持续生活方式 · 6.2K 条内容", "6.2K", 21, "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=160&q=80"], ["防晒棒", "护肤", "通勤防晒需求 · 5.8K 条内容", "5.8K", 18, "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=160&q=80"], ["丝绒唇釉", "彩妆", "低饱和口红趋势 · 4.6K 条内容", "4.6K", 16, "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=160&q=80"]] as Array<[string, string, string, string, number, string]>;
  const contentRows = [["@glowwithmia", "护肤", "连续 7 天记录皮肤屏障变化", "1.2M", 38, "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=160&q=80"], ["@dailybyzoe", "生活方式", "从早八到晚八的通勤妆测试", "864K", 31, "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=160&q=80"], ["@theminimaledit", "家居", "一周低成本空间焕新", "621K", 27, "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=160&q=80"], ["@miasoftglow", "美妆", "干净底妆的五分钟教程", "518K", 24, "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=160&q=80"], ["@slowmorningclub", "健身", "15 分钟居家普拉提", "404K", 19, "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=160&q=80"]] as Array<[string, string, string, string, number, string]>;
  const rows = board === "topic" ? topicRows : board === "product" ? productRows : contentRows;
  const visible = rows.filter((row) => `${row[0]} ${row[1]} ${row[2]}`.toLowerCase().includes(query.toLowerCase()));
  const growth = (value: number) => range === "7d" ? value : Math.round(value * 1.7);
  return <section className="mt-6"><div className="flex flex-wrap items-center gap-2"><label className="flex h-9 items-center rounded-[8px] bg-[#F5F5F6] px-2.5"><select value={range} onChange={(event) => onRangeChange(event.target.value as "7d" | "30d")} className="bg-transparent text-[10px] text-slate outline-none"><option value="7d">{l({ zh: "近 7 天", en: "Last 7 days" })}</option><option value="30d">{l({ zh: "近 30 天", en: "Last 30 days" })}</option></select></label><label className="flex h-9 items-center rounded-[8px] bg-[#F5F5F6] px-2.5"><select value={platform} onChange={(event) => onPlatformChange(event.target.value)} className="bg-transparent text-[10px] text-slate outline-none"><option value="all">{l({ zh: "全部平台", en: "All platforms" })}</option><option value="instagram">Instagram</option><option value="tiktok">TikTok</option><option value="youtube">YouTube</option></select></label><label className="flex h-9 items-center rounded-[8px] bg-[#F5F5F6] px-2.5"><select value={region} onChange={(event) => onRegionChange(event.target.value)} className="bg-transparent text-[10px] text-slate outline-none"><option value="us">{l({ zh: "美国", en: "United States" })}</option><option value="global">{l({ zh: "全球", en: "Global" })}</option></select></label><label className="flex h-9 items-center rounded-[8px] bg-[#F5F5F6] px-2.5"><select className="bg-transparent text-[10px] text-slate outline-none"><option>{l({ zh: "全部类目", en: "All categories" })}</option><option>{l({ zh: "美妆", en: "Beauty" })}</option><option>{l({ zh: "生活方式", en: "Lifestyle" })}</option></select></label><div className="relative ml-auto w-full max-w-[310px]"><Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={l({ zh: "搜索话题或关键词…", en: "Search topics or keywords…" })} className="h-9 w-full rounded-[8px] bg-[#F5F5F6] pl-9 pr-3 text-[10px] text-ink outline-none placeholder:text-muted focus:bg-white focus:ring-1 focus:ring-brand/25" /></div></div><div className="mt-6 overflow-x-auto rounded-[12px] border border-border bg-white"><div className="min-w-[760px]"><div className="grid grid-cols-[80px_minmax(330px,1.35fr)_180px_170px_90px] border-b border-border bg-[#F7F7F8] px-5 py-3 text-[9px] font-medium uppercase tracking-[0.08em] text-muted"><span>{l({ zh: "排名", en: "Rank" })}</span><span>{l({ zh: "话题", en: "Topic" })}</span><span>{l({ zh: "内容量", en: "Posts" })}</span><span>{l({ zh: "增长", en: "Growth" })}</span><span className="text-right">{l({ zh: "操作", en: "Action" })}</span></div>{visible.map((row, index) => <article key={row[0]} className="grid min-h-[100px] grid-cols-[80px_minmax(330px,1.35fr)_180px_170px_90px] items-center border-b border-border/70 px-5 py-3 last:border-b-0 hover:bg-[#FAFAFB]"><span className="text-[14px] font-semibold text-ink">{String(index + 1).padStart(2, "0")}</span><div className="flex min-w-0 items-center gap-3"><img src={row[5]} alt="" className="h-[60px] w-[60px] shrink-0 rounded-[8px] object-cover" /><div className="min-w-0"><div className="flex items-center gap-2"><p className="truncate text-[12px] font-semibold text-ink">{row[0]}</p><span className="rounded-full bg-[#F5F1FF] px-2 py-0.5 text-[8.5px] font-medium text-brand">{row[1]}</span></div><p className="mt-1 truncate text-[10px] text-muted">{row[2]}</p></div></div><span className="text-[11px] font-medium text-ink">{row[3]}</span><span className="inline-flex items-center gap-1 text-[11px] font-medium text-teal-text"><TrendingUp className="h-3.5 w-3.5" />+{growth(row[4])}%</span><button type="button" className="ml-auto inline-flex h-8 items-center gap-1 rounded-[8px] bg-[#F5F5F6] px-2.5 text-[10px] font-medium text-slate hover:bg-[#ECECEF] hover:text-ink"><ArrowRight className="h-3.5 w-3.5" />{l({ zh: "查看", en: "View" })}</button></article>)}{visible.length === 0 && <div className="px-5 py-16 text-center text-[10px] text-muted">{l({ zh: "没有匹配的话题", en: "No matching topics" })}</div>}</div></div></section>;
}

function StudioPreview({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="relative h-40 overflow-hidden rounded-[12px] bg-gradient-to-br from-[#fff4f7] to-[#f5edf8] p-4">
        <div className="absolute left-5 top-5 rounded-[8px] border border-[#f5cddd] bg-white px-3 py-2 shadow-sm">
          <span className="text-[8px] font-semibold text-brand">BIG IDEA</span>
          <p className="mt-0.5 text-[10px] font-bold text-navy">Everyday Glow</p>
        </div>
        <div className="absolute left-[49%] top-[49%] h-px w-16 -translate-x-1/2 rotate-[22deg] bg-[#e7b9ca]" />
        <div className="absolute left-[49%] top-[49%] h-px w-16 -translate-x-1/2 -rotate-[22deg] bg-[#e7b9ca]" />
        <div className="absolute bottom-5 left-5 rounded-[8px] border border-white bg-white/85 px-3 py-2 shadow-sm">
          <p className="text-[8px] text-muted">AWARENESS</p>
          <p className="mt-0.5 text-[9px] font-semibold text-ink">Creator seeding</p>
        </div>
        <div className="absolute bottom-5 right-5 rounded-[8px] border border-white bg-white/85 px-3 py-2 shadow-sm">
          <p className="text-[8px] text-muted">CONVERSION</p>
          <p className="mt-0.5 text-[9px] font-semibold text-ink">Launch offer</p>
        </div>
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className="h-40 overflow-hidden rounded-[12px] bg-gradient-to-br from-[#eef2fb] to-[#e7ebf6] p-4">
        <div className="h-full rounded-[10px] border border-white/80 bg-white/90 p-3 shadow-sm">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <div className="flex gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff8caa]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#f2c66d]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#69c7b9]" />
            </div>
            <span className="rounded-full bg-soft-lavender px-2 py-0.5 text-[7px] font-semibold text-lavender-text">
              3 VARIANTS
            </span>
          </div>
          <p className="mt-3 text-[8px] font-semibold uppercase tracking-[0.12em] text-muted">
            Social caption
          </p>
          <p className="mt-2 text-[10px] font-semibold leading-[16px] text-navy">
            Your morning glow,
            <br />
            made effortless.
          </p>
          <div className="mt-3 flex gap-1.5">
            <span className="rounded-full bg-[#eef2fb] px-2 py-1 text-[7px] text-[#415d9b]">
              Shorter
            </span>
            <span className="rounded-full bg-[#eef2fb] px-2 py-1 text-[7px] text-[#415d9b]">
              Playful
            </span>
            <span className="rounded-full bg-[#eef2fb] px-2 py-1 text-[7px] text-[#415d9b]">
              Translate
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-40 overflow-hidden rounded-[12px] bg-gradient-to-br from-[#e8f6f4] to-[#dcebea] p-3">
      <div className="mx-auto h-full w-[76px] overflow-hidden rounded-[12px] border-[3px] border-white bg-gradient-to-b from-[#d9bca8] to-[#846653] shadow-md">
        <div className="relative flex h-full items-center justify-center">
          <span className="absolute left-2 top-2 rounded-full bg-white/85 px-1.5 py-0.5 text-[6px] font-bold text-navy">
            9:16
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#16766e] shadow-sm">
            <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />
          </span>
          <div className="absolute bottom-2 left-2 right-2 space-y-1">
            <div className="h-1.5 rounded-full bg-white/90" />
            <div className="h-1.5 w-2/3 rounded-full bg-white/65" />
          </div>
        </div>
      </div>
      <div className="absolute left-5 top-5 rounded-[7px] bg-white/80 px-2 py-1.5 shadow-sm">
        <Clapperboard className="h-3 w-3 text-[#16766e]" />
      </div>
      <div className="absolute bottom-5 right-5 rounded-[7px] bg-white/80 px-2 py-1.5 shadow-sm">
        <Images className="h-3 w-3 text-[#16766e]" />
      </div>
    </div>
  );
}

function CalendarOnlyView({ month, monthIndex, setMonthIndex, calendarCells }: { month: typeof calendarMonths[number]; monthIndex: number; setMonthIndex: React.Dispatch<React.SetStateAction<number>>; calendarCells: Array<number | null> }) {
  const l = useLoc();
  return <CalendarGridOnly month={month} calendarCells={calendarCells} />;
  return <section className="mt-6"><div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-3"><button type="button" aria-label={l(L.previousMonth)} onClick={() => setMonthIndex((current) => Math.max(0, current - 1))} disabled={monthIndex === 0} className="flex h-10 w-10 items-center justify-center rounded-[8px] border border-border text-slate disabled:opacity-35 hover:bg-[#F7F7F8]"><ChevronLeft className="h-4 w-4" /></button><p className="min-w-[118px] text-center text-[16px] font-semibold text-ink">{l(month.label)}</p><button type="button" aria-label={l(L.nextMonth)} onClick={() => setMonthIndex((current) => Math.min(calendarMonths.length - 1, current + 1))} disabled={monthIndex === calendarMonths.length - 1} className="flex h-10 w-10 items-center justify-center rounded-[8px] border border-border text-slate disabled:opacity-35 hover:bg-[#F7F7F8]"><ChevronRight className="h-4 w-4" /></button><button type="button" onClick={() => setMonthIndex(0)} className="h-10 rounded-[8px] border border-border px-4 text-[11px] font-medium text-slate hover:bg-[#F7F7F8] hover:text-ink">{l({ zh: "今天", en: "Today" })}</button></div><label className="flex h-10 items-center rounded-[8px] border border-border bg-white px-3"><select className="bg-transparent text-[11px] font-medium text-slate outline-none"><option>{l({ zh: "全部活动", en: "All activities" })}</option><option>{l({ zh: "营销节点", en: "Marketing moments" })}</option><option>{l({ zh: "内容计划", en: "Content plans" })}</option></select></label></div><div className="mt-5 overflow-x-auto rounded-[10px] border border-border bg-white"><div className="min-w-[860px]"><div className="grid grid-cols-7 border-b border-border bg-[#F7F7F8]">{weekdays.map((weekday, index) => <div key={weekday.en} className={`px-3 py-3 text-center text-[10px] font-medium ${index >= 5 ? "text-brand" : "text-slate"}`}>{l(weekday)}</div>)}</div><div className="grid grid-cols-7">{calendarCells.map((day, index) => { const events = day ? calendarEvents[month.id].filter((event) => day >= event.start && day <= event.end) : []; const isToday = month.id === "aug" && day === 20; return <div key={`${month.id}-${index}`} className={`min-h-[108px] border-b border-r border-border p-3 last:border-r-0 ${!day ? "bg-[#FAFAFB]" : "bg-white"}`}><div className="flex h-5 items-center justify-between"><span className={`text-[10px] font-medium ${!day ? "text-muted/55" : "text-slate"}`}>{day ?? (index < 7 ? 27 + index : index - 34)}</span>{isToday && <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand text-[9px] font-medium text-white">{day}</span>}</div><div className="mt-2 space-y-1.5">{events.map((event) => <span key={event.title.en} className={`flex h-6 items-center truncate rounded-[5px] border px-2 text-[8.5px] font-medium ${eventTone[event.tone]}`}><span className="mr-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current" />{l(event.title)}</span>)}</div></div>; })}</div></div></div><div className="mt-4 flex flex-wrap items-center gap-5 text-[10px] text-slate">{calendarEvents[month.id].map((event) => <span key={event.title.en} className="inline-flex items-center gap-1.5"><span className={`h-2 w-2 rounded-full ${event.tone === "pink" ? "bg-[#e65783]" : event.tone === "blue" ? "bg-[#4b82e5]" : "bg-[#38a66a]"}`} />{l(event.title)}</span>)}</div></section>;
}

function CalendarGridOnly({ month, calendarCells }: { month: typeof calendarMonths[number]; calendarCells: Array<number | null> }) {
  const l = useLoc();
  const dayLabel = (index: number) => index < 7 ? 27 + index : index - 34;
  return <section className="mt-4"><div className="overflow-x-auto rounded-[10px] border border-border bg-white"><div className="min-w-[860px]"><div className="grid grid-cols-7 border-b border-border bg-[#F7F7F8]">{weekdays.map((weekday, index) => <div key={weekday.en} className={`px-3 py-3 text-center text-[10px] font-medium ${index >= 5 ? "text-brand" : "text-slate"}`}>{l(weekday)}</div>)}</div><div className="grid grid-cols-7">{calendarCells.map((day, index) => { const events = day ? calendarEvents[month.id].filter((event) => day >= event.start && day <= event.end) : []; const isToday = month.id === "aug" && day === 20; return <div key={`${month.id}-${index}`} className={`min-h-[108px] border-b border-r border-border p-3 ${!day ? "bg-[#FAFAFB]" : "bg-white"}`}><div className="flex h-5 items-center"><span className={`text-[10px] font-medium ${!day ? "text-muted/55" : "text-slate"}`}>{isToday ? "" : day ?? dayLabel(index)}</span>{isToday && <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand text-[9px] font-medium text-white">{day}</span>}</div><div className="mt-2 space-y-1.5">{events.map((event) => <span key={event.title.en} className={`flex h-6 items-center truncate rounded-[5px] border px-2 text-[8.5px] font-medium ${eventTone[event.tone]}`}><span className="mr-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current" />{l(event.title)}</span>)}</div></div>; })}</div></div></div><div className="mt-4 flex flex-wrap items-center gap-5 text-[10px] text-slate">{calendarEvents[month.id].map((event) => <span key={event.title.en} className="inline-flex items-center gap-1.5"><span className={`h-2 w-2 rounded-full ${event.tone === "pink" ? "bg-[#e65783]" : event.tone === "blue" ? "bg-[#4b82e5]" : "bg-[#38a66a]"}`} />{l(event.title)}</span>)}</div></section>;
}

function CalendarReadOnlyGrid({ month, monthIndex, setMonthIndex, calendarCells }: { month: typeof calendarMonths[number]; monthIndex: number; setMonthIndex: React.Dispatch<React.SetStateAction<number>>; calendarCells: Array<number | null> }) {
  const l = useLoc();
  const dayLabel = (index: number) => index < 7 ? 27 + index : index - 34;
  return <section className="mt-6"><div className="flex flex-wrap items-center gap-3"><button type="button" aria-label={l(L.previousMonth)} onClick={() => setMonthIndex((current) => Math.max(0, current - 1))} disabled={monthIndex === 0} className="flex h-10 w-10 items-center justify-center rounded-[8px] border border-border text-slate transition-colors hover:bg-[#F7F7F8] disabled:opacity-35"><ChevronLeft className="h-4 w-4" /></button><p className="min-w-[118px] text-center text-[16px] font-semibold text-ink">{l(month.label)}</p><button type="button" aria-label={l(L.nextMonth)} onClick={() => setMonthIndex((current) => Math.min(calendarMonths.length - 1, current + 1))} disabled={monthIndex === calendarMonths.length - 1} className="flex h-10 w-10 items-center justify-center rounded-[8px] border border-border text-slate transition-colors hover:bg-[#F7F7F8] disabled:opacity-35"><ChevronRight className="h-4 w-4" /></button><button type="button" onClick={() => setMonthIndex(0)} className="h-10 rounded-[8px] border border-border px-4 text-[11px] font-medium text-slate transition-colors hover:bg-[#F7F7F8] hover:text-ink">{l({ zh: "今天", en: "Today" })}</button></div><div className="mt-5 overflow-x-auto rounded-[10px] border border-border bg-white"><div className="min-w-[860px]"><div className="grid grid-cols-7 border-b border-border bg-[#F7F7F8]">{weekdays.map((weekday, index) => <div key={weekday.en} className={`px-3 py-3 text-center text-[10px] font-medium ${index >= 5 ? "text-brand" : "text-slate"}`}>{l(weekday)}</div>)}</div><div className="grid grid-cols-7">{calendarCells.map((day, index) => { const events = day ? calendarEvents[month.id].filter((event) => day >= event.start && day <= event.end) : []; const isToday = month.id === "aug" && day === 20; return <div key={`${month.id}-${index}`} className={`min-h-[108px] border-b border-r border-border p-3 ${!day ? "bg-[#FAFAFB]" : "bg-white"}`}><div className="flex h-5 items-center"><span className={`text-[10px] font-medium ${!day ? "text-muted/55" : "text-slate"}`}>{isToday ? "" : day ?? dayLabel(index)}</span>{isToday && <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand text-[9px] font-medium text-white">{day}</span>}</div><div className="mt-2 space-y-1.5">{events.map((event) => <span key={event.title.en} className={`flex h-6 items-center truncate rounded-[5px] border px-2 text-[8.5px] font-medium ${eventTone[event.tone]}`}><span className="mr-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current" />{l(event.title)}</span>)}</div></div>; })}</div></div></div><div className="mt-4 flex flex-wrap items-center gap-5 text-[10px] text-slate">{calendarEvents[month.id].map((event) => <span key={event.title.en} className="inline-flex items-center gap-1.5"><span className={`h-2 w-2 rounded-full ${event.tone === "pink" ? "bg-[#e65783]" : event.tone === "blue" ? "bg-[#4b82e5]" : "bg-[#38a66a]"}`} />{l(event.title)}</span>)}</div></section>;
}

export default function CreativePage() {
  const l = useLoc();
  const openChat = useUIStore((state) => state.openChat);
  const productMode = useUIStore((state) => state.productMode);
  const sectionTab = useUIStore((state) => state.discoverSections.creative);
  const isDiscover = productMode === "discover";
  const discoverTitle = sectionTab === "calendar" ? L.calendar : sectionTab === "trends" ? L.trendRadar : { zh: "AI 工具", en: "AI Tools" };
  const monthIndex = useUIStore((state) => state.calendarMonthIndex);
  const setMonthIndexStore = useUIStore((state) => state.setCalendarMonthIndex);
  const setMonthIndex: React.Dispatch<React.SetStateAction<number>> = (value) => setMonthIndexStore(typeof value === "function" ? value(monthIndex) : value);
  const [trendRange, setTrendRange] = useState<"7d" | "30d">("7d");
  const trendBoard = useUIStore((state) => state.trendBoard);
  const setTrendBoard = useUIStore((state) => state.setTrendBoard);
  const [trendPlatform, setTrendPlatform] = useState("all");
  const [trendRegion, setTrendRegion] = useState("us");
  const month = calendarMonths[monthIndex];
  const daysInMonth = new Date(month.year, month.month + 1, 0).getDate();
  const firstDayOffset = (new Date(month.year, month.month, 1).getDay() + 6) % 7;
  const calendarCells = Array.from({ length: 42 }, (_, index) => {
    const day = index - firstDayOffset + 1;
    return day > 0 && day <= daysInMonth ? day : null;
  });

  return (
    <div className="min-h-full bg-surface px-6 py-3 lg:px-10">
      <div className="w-full">
        {isDiscover ? sectionTab === "ai-tools" && <header className="flex h-14 items-center"><h1 className="text-[30px] font-bold tracking-[-0.035em] text-navy">{l(discoverTitle)}</h1></header> : <header><h1 className="text-[26px] font-bold tracking-[-0.03em] text-navy">{l(L.title)}</h1><p className="mt-1 text-[11.5px] text-slate">{l(L.subtitle)}</p></header>}

        {false && <section className="mt-4 overflow-hidden rounded-[14px] border border-border bg-surface shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-2.5">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[9px] bg-soft-pink text-brand">
                <CalendarDays className="h-4.5 w-4.5" />
              </span>
              <div>
                <h2 className="text-[14px] font-semibold text-navy">{l(L.calendar)}</h2>
                <p className="mt-0.5 text-[9.5px] text-muted">{l(L.calendarDesc)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label={l(L.previousMonth)}
                onClick={() => setMonthIndex((current) => Math.max(0, current - 1))}
                disabled={monthIndex === 0}
                className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-border text-slate disabled:opacity-35"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <span className="min-w-[72px] text-center text-[11.5px] font-semibold text-ink">
                {l(month.label)}
              </span>
              <button
                type="button"
                aria-label={l(L.nextMonth)}
                onClick={() =>
                  setMonthIndex((current) => Math.min(calendarMonths.length - 1, current + 1))
                }
                disabled={monthIndex === calendarMonths.length - 1}
                className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-border text-slate disabled:opacity-35"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-[860px]">
              <div className="grid grid-cols-7 border-b border-border bg-surface-warm/55">
                {weekdays.map((weekday, index) => (
                  <div
                    key={weekday.en}
                    className={cn(
                      "px-2 py-2 text-center text-[8px] font-bold tracking-[0.1em] text-muted",
                      index >= 5 && "text-brand/70",
                    )}
                  >
                    {l(weekday)}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 bg-border">
                {calendarCells.map((day, index) => {
                  const dayEvents = day
                    ? calendarEvents[month.id].filter(
                        (event) => day >= event.start && day <= event.end,
                      )
                    : [];
                  return (
                    <div
                      key={`${month.id}-${index}`}
                      className={cn(
                        "min-h-[58px] border-b border-r border-border bg-surface p-1",
                        !day && "bg-surface-warm/35",
                        index % 7 >= 5 && day && "bg-[#fffafb]",
                      )}
                    >
                      {day && (
                        <>
                          <div className="flex items-center justify-between px-0.5">
                            <span className="text-[8px] font-semibold text-slate">{day}</span>
                            {day === 20 && month.id === "aug" && (
                              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                            )}
                          </div>
                          <div className="mt-0.5 space-y-px">
                            {dayEvents.map((event) => (
                              <button
                                key={event.title.en}
                                type="button"
                                title={`${l(event.title)} · ${l(L.generateCampaign)}`}
                                onClick={() => openChat("lucy")}
                                className={cn(
                                  "block w-full truncate border px-1 py-0 text-left text-[7px] font-semibold leading-[11px] transition-opacity hover:opacity-80",
                                  eventTone[event.tone],
                                  day === event.start
                                    ? "rounded-l-[5px]"
                                    : "rounded-l-none border-l-0",
                                  day === event.end ? "rounded-r-[5px]" : "rounded-r-none",
                                )}
                              >
                                {day === event.start || index % 7 === 0 ? l(event.title) : "·"}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-wrap items-center gap-3 px-4 py-1.5">
                {calendarEvents[month.id].map((event) => (
                  <div
                    key={event.title.en}
                    className="flex items-center gap-1.5 text-[8px] text-muted"
                  >
                    <span className={cn("h-2 w-2 rounded-full border", eventTone[event.tone])} />
                    <span>{l(event.title)}</span>
                    <span className="text-muted/70">
                      {event.start}–{event.end}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>}

        {(!isDiscover || sectionTab === "calendar") && <CalendarOnlyView month={month} monthIndex={monthIndex} setMonthIndex={setMonthIndex} calendarCells={calendarCells} />}

        {false && <section className="mt-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-[18px] font-bold tracking-[-0.02em] text-navy">
                {l(L.trendRadar)}
              </h2>
              <p className="mt-1 text-[10.5px] text-muted">{l(L.trendRadarDesc)}</p>
            </div>
            <div className="flex rounded-[9px] border border-border bg-surface p-1">
              {(["7d", "30d"] as const).map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => setTrendRange(range)}
                  className={cn(
                    "rounded-[7px] px-3 py-1.5 text-[9.5px] font-semibold transition-colors",
                    trendRange === range ? "bg-soft-pink text-brand" : "text-muted hover:text-ink",
                  )}
                >
                  {l(range === "7d" ? L.sevenDays : L.thirtyDays)}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <article className="rounded-[15px] border border-border bg-surface p-5 shadow-card">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-soft-pink text-brand">
                  <Clapperboard className="h-4 w-4" />
                </span>
                <h3 className="text-[13.5px] font-semibold text-navy">{l(L.contentTrend)}</h3>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2.5">
                {contentTrends.map((post) => (
                  <div
                    key={post.handle}
                    className="overflow-hidden rounded-[11px] border border-border bg-white"
                  >
                    <div className={cn("relative h-[112px] bg-gradient-to-br", post.gradient)}>
                      <div className="absolute inset-x-3 top-3 flex items-center justify-between">
                        <span className="rounded-full bg-black/35 px-2 py-1 text-[7px] font-semibold text-white">
                          TikTok
                        </span>
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/85 text-navy">
                          <Play className="ml-0.5 h-2.5 w-2.5 fill-current" />
                        </span>
                      </div>
                      <div className="absolute inset-x-3 bottom-3 rounded-[7px] bg-black/35 px-2 py-1.5 text-[7.5px] font-medium leading-3 text-white">
                        {l(post.caption)}
                      </div>
                    </div>
                    <div className="p-2.5">
                      <p className="truncate text-[8.5px] font-semibold text-ink">{post.handle}</p>
                      <p className="mt-0.5 truncate text-[7.5px] text-muted">{l(post.format)}</p>
                      <div className="mt-2 flex items-center justify-between text-[7.5px] text-muted">
                        <span className="inline-flex items-center gap-1">
                          <Eye className="h-2.5 w-2.5" />
                          {post.views}
                        </span>
                        <span className="font-semibold text-teal-text">
                          +{trendRange === "7d" ? post.signal : Math.round(post.signal * 1.7)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[15px] border border-border bg-surface p-5 shadow-card">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-soft-lavender text-lavender-text">
                  <Tags className="h-4 w-4" />
                </span>
                <h3 className="text-[13.5px] font-semibold text-navy">{l(L.topicTrend)}</h3>
              </div>
              <div className="mt-4 space-y-2.5">
                {topicTrends.map((topic, index) => {
                  const signal =
                    trendRange === "7d" ? topic.signal : Math.round(topic.signal * 1.7);
                  return (
                    <div
                      key={topic.hashtag}
                      className="rounded-[11px] border border-border bg-gradient-to-r from-[#faf8ff] to-white p-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-[12px] font-bold text-[#6f4fb7]">
                            {topic.hashtag}
                          </p>
                          <p className="mt-0.5 text-[8px] text-muted">
                            {l({ zh: topic.zh, en: `${topic.posts} posts` })}
                          </p>
                        </div>
                        <span className="inline-flex items-center gap-1 rounded-full bg-soft-teal px-2 py-1 text-[8px] font-bold text-teal-text">
                          <TrendingUp className="h-2.5 w-2.5" />+{signal}%
                        </span>
                      </div>
                      <div className="mt-3 flex h-5 items-end gap-1">
                        {[35, 48, 42, 64, 58, 79, 92].map((height, barIndex) => (
                          <span
                            key={`${topic.hashtag}-${barIndex}`}
                            className="flex-1 rounded-t-[2px] bg-[#d9ccf3]"
                            style={{ height: `${Math.max(20, height - index * 6)}%` }}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>

            <article className="rounded-[15px] border border-border bg-surface p-5 shadow-card">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-soft-teal text-teal-text">
                  <PackageSearch className="h-4 w-4" />
                </span>
                <h3 className="text-[13.5px] font-semibold text-navy">{l(L.productTrend)}</h3>
              </div>
              <div className="mt-4 space-y-2.5">
                {productTrends.map((product) => (
                  <div
                    key={product.name.en}
                    className="flex items-center gap-3 rounded-[11px] border border-border p-2.5"
                  >
                    <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-[9px] bg-gradient-to-br from-[#f7f1eb] to-[#eee2d7]">
                      {product.shape === "bottle" && (
                        <div className="relative h-10 w-5 rounded-b-[6px] rounded-t-[3px] bg-gradient-to-r from-[#dcae91] to-[#b88061] shadow-sm before:absolute before:-top-2 before:left-1/2 before:h-2 before:w-3 before:-translate-x-1/2 before:rounded-t-[2px] before:bg-[#8f6954]" />
                      )}
                      {product.shape === "jar" && (
                        <div className="relative h-6 w-9 rounded-b-[7px] bg-gradient-to-r from-[#e7a7ad] to-[#bd747d] shadow-sm before:absolute before:-top-1.5 before:left-0 before:h-2 before:w-9 before:rounded-[3px] before:bg-[#8f6469]" />
                      )}
                      {product.shape === "tube" && (
                        <div className="relative h-11 w-5 rounded-b-[3px] rounded-t-[8px] bg-gradient-to-r from-[#c5d8d3] to-[#7ba99f] shadow-sm after:absolute after:-bottom-1.5 after:left-0 after:h-2 after:w-5 after:rounded-[2px] after:bg-[#4b7b72]" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[7.5px] font-semibold uppercase tracking-[0.08em] text-muted">
                        {l(product.category)}
                      </span>
                      <p className="mt-1 truncate text-[10px] font-semibold text-ink">
                        {l(product.name)}
                      </p>
                      <span className="mt-2 inline-flex items-center gap-1 text-[8.5px] font-bold text-teal-text">
                        <TrendingUp className="h-2.5 w-2.5" />+
                        {trendRange === "7d" ? product.signal : Math.round(product.signal * 1.7)}%
                      </span>
                    </div>
                    <Bookmark className="h-3.5 w-3.5 flex-shrink-0 text-muted" />
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>}

        {(!isDiscover || sectionTab === "trends") && <div className={isDiscover ? "-mt-3" : ""}><TrendRankings board={trendBoard} onBoardChange={setTrendBoard} range={trendRange} onRangeChange={setTrendRange} platform={trendPlatform} onPlatformChange={setTrendPlatform} region={trendRegion} onRegionChange={setTrendRegion} /></div>}

        {(!isDiscover || sectionTab === "ai-tools") && <section className={isDiscover ? "mt-5" : "mt-7"}>
          <div>
            <h2 className="text-[18px] font-bold tracking-[-0.02em] text-navy">
              {l(L.creativeStudio)}
            </h2>
            <p className="mt-1 text-[10.5px] text-muted">{l(L.creativeStudioDesc)}</p>
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {studios.map((studio, index) => {
              const content = (
                <>
                  <StudioPreview index={index} />
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-[15px] font-bold text-navy">{l(studio.title)}</h3>
                        <p className="mt-2 min-h-[48px] text-[10px] leading-[17px] text-muted">
                          {l(studio.description)}
                        </p>
                      </div>
                      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-soft-pink text-brand transition-transform group-hover:translate-x-0.5">
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                    <span className="mt-3 inline-flex rounded-full border border-border px-2.5 py-1 text-[8.5px] font-semibold text-brand">
                      {l(studio.action === "chat" ? L.startCreating : L.openStudio)}
                    </span>
                  </div>
                </>
              );
              return studio.action === "chat" ? (
                <button
                  key={studio.title.en}
                  type="button"
                  onClick={() => openChat("lucy")}
                  className="group overflow-hidden rounded-[15px] border border-border bg-surface p-2 text-left shadow-card transition-all hover:-translate-y-0.5 hover:border-border-strong hover:shadow-elev"
                >
                  {content}
                </button>
              ) : (
                <Link
                  key={studio.title.en}
                  href={studio.href}
                  className="group overflow-hidden rounded-[15px] border border-border bg-surface p-2 text-left shadow-card transition-all hover:-translate-y-0.5 hover:border-border-strong hover:shadow-elev"
                >
                  {content}
                </Link>
              );
            })}
          </div>
        </section>}

        {(!isDiscover || sectionTab === "trends") && <section className="mt-7 pb-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <h2 className="text-[18px] font-bold tracking-[-0.02em] text-navy">
                {l(L.inspiration)}
              </h2>
              <p className="mt-1 text-[10.5px] text-muted">{l(L.inspirationDesc)}</p>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/context-lab">{l(L.viewAll)}</Link>
            </Button>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {inspirationCards.map((card) => {
              const Icon = card.icon;
              const content = (
                <>
                  <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-surface-warm text-slate">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[12px] font-semibold text-ink">{l(card.title)}</h3>
                    <p className="mt-1 text-[9.5px] leading-4 text-muted">{l(card.description)}</p>
                    <div className="mt-2 inline-flex items-center gap-1 text-[9px] font-semibold text-brand">
                      <Flame className="h-3 w-3" />
                      {l(card.meta)}
                    </div>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 flex-shrink-0 text-muted" />
                </>
              );
              return "href" in card && card.href ? (
                <Link
                  key={card.title.en}
                  href={card.href}
                  className="flex items-start gap-3 rounded-[13px] border border-border bg-surface p-4 shadow-card transition-colors hover:border-border-strong"
                >
                  {content}
                </Link>
              ) : (
                <button
                  key={card.title.en}
                  type="button"
                  onClick={() => openChat("lucy")}
                  className="flex items-start gap-3 rounded-[13px] border border-border bg-surface p-4 text-left shadow-card transition-colors hover:border-border-strong"
                >
                  {content}
                </button>
              );
            })}
          </div>
        </section>}
      </div>
    </div>
  );
}
