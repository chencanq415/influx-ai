"use client";

import Link from "next/link";
import { ArrowUpRight, Bell, Check, ChevronLeft, ChevronRight, Gauge, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLoc, useT } from "@/lib/i18n/use-i18n";
import { useI18nStore } from "@/lib/i18n/use-i18n";
import { useUIStore } from "@/lib/store/ui-store";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AccountMenu } from "./account-menu";
import { CreatorSearchTabs } from "@/components/creator-search-tabs";
import { TopbarTabs } from "@/components/ui/topbar-tabs";
import { getFreeTool } from "@/lib/free-tools";

export function BusinessTopbar() {
  const pathname = usePathname();
  const showToolControls = pathname.startsWith("/creative/tools/");
  const t = useT();
  const discoverSections = useUIStore((state) => state.discoverSections);
  const pageTitle = getPageTitle(pathname, discoverSections, t);
  const showCreatorSearchTabs = pathname.startsWith("/creators") && (discoverSections.creators === "ai-search" || discoverSections.creators === "cover-search");
  const showCreatorDirectoryTabs = pathname.startsWith("/creators") && (discoverSections.creators === "discovery" || discoverSections.creators === "private");
  const showTrendTabs = !showToolControls && pathname.startsWith("/creative") && discoverSections.creative === "trends";
  const showCalendarControls = !showToolControls && pathname.startsWith("/creative") && discoverSections.creative === "calendar";
  const showBrandReportControls = pathname.startsWith("/brand-insights/") && pathname.split("/").filter(Boolean).length > 1;

  return (
    <header
      className={`flex h-16 flex-shrink-0 items-center justify-between border-b border-border/45 bg-white px-6 lg:pr-10 ${
        showCreatorSearchTabs ? "lg:pl-8" : "lg:pl-10"
      }`}
    >
      <div className="min-w-0">{showToolControls ? <ToolTopbarControls /> : showCreatorSearchTabs ? <CreatorSearchTabs /> : showCreatorDirectoryTabs ? <CreatorDirectoryTabs /> : showTrendTabs ? <TrendTopbarTabs /> : showCalendarControls ? <CalendarTopbarControls /> : showBrandReportControls ? <BrandReportTopbarControls /> : <p className="truncate text-[15px] font-semibold tracking-[-0.01em] text-ink" aria-live="polite">{pageTitle}</p>}</div>
      <div className="ml-6 flex flex-shrink-0 items-center gap-3">
        <PlanSummary />
        <TopbarUtilities />
        <AccountMenu compact side="bottom" align="end" />
      </div>
    </header>
  );
}

function ToolTopbarControls() {
  const l = useLoc();
  const pathname = usePathname();
  const tool = getFreeTool(pathname.split("/").filter(Boolean).at(-1) ?? "");
  const active = useUIStore((s) => s.toolReviewTab);
  const setTab = useUIStore((s) => s.setToolReviewTab);
  return <div className="flex h-16 min-w-0 items-center gap-3"><Link href="/creative" onClick={() => useUIStore.getState().setDiscoverSection("creative", "ai-tools")} aria-label={l({ zh: "返回 AI 工具", en: "Back to AI Tools" })} className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] text-slate hover:bg-page"><ChevronLeft className="h-3.5 w-3.5" /></Link><span className="h-4 w-px bg-border" />{tool?.slug === "ai-brief-reviewer" ? <TopbarTabs tabs={[{ id: "upload", label: l({ zh: "上传作品", en: "Upload content" }) }, { id: "results", label: l({ zh: "审核结果", en: "Review results" }) }]} activeId={active} onSelect={(id) => setTab(id as typeof active)} ariaLabel={l({ zh: "AI 审稿导航", en: "Content review navigation" })} /> : <span className="truncate text-[15px] font-medium text-ink">{tool ? l(tool.title) : l({ zh: "AI 工具", en: "AI Tools" })}</span>}</div>;
}

function BrandReportTopbarControls() {
  const l = useLoc();
  const active = useUIStore((state) => state.brandReportTab);
  const setBrandReportTab = useUIStore((state) => state.setBrandReportTab);
  const tabs = [
    { id: "overview", label: { zh: "总览", en: "Overview" } },
    { id: "marketing", label: { zh: "营销策略", en: "Marketing" } },
    { id: "signals", label: { zh: "市场动态", en: "Market signals" } },
    { id: "assets", label: { zh: "营销资产", en: "Marketing assets" } },
  ] as const;
  return <div className="flex h-16 min-w-0 items-center gap-3"><Link href="/brand-insights" aria-label={l({ zh: "返回品牌洞察", en: "Back to Brand insights" })} className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] text-slate transition-colors hover:bg-[#F7F7F8] hover:text-ink"><ChevronLeft className="h-3.5 w-3.5" /></Link><span className="h-4 w-px shrink-0 bg-border" /><TopbarTabs tabs={tabs.map(({ id, label }) => ({ id, label: l(label) }))} activeId={active} onSelect={(id) => setBrandReportTab(id as typeof active)} ariaLabel={l({ zh: "品牌洞察详情导航", en: "Brand insights detail navigation" })} /></div>;
}

function CreatorDirectoryTabs() {
  const l = useLoc();
  const active = useUIStore((state) => state.discoverSections.creators);
  const setDiscoverSection = useUIStore((state) => state.setDiscoverSection);
  const tabs = [{ id: "discovery", label: { zh: "达人广场", en: "Creator Marketplace" } }, { id: "private", label: { zh: "私域达人", en: "Private Creators" } }] as const;
  return <TopbarTabs tabs={tabs.map(({ id, label }) => ({ id, label: l(label) }))} activeId={active} onSelect={(id) => setDiscoverSection("creators", id as typeof active)} ariaLabel={l({ zh: "达人目录", en: "Creator directory" })} />;
}

function TrendTopbarTabs() {
  const l = useLoc();
  const active = useUIStore((state) => state.trendBoard);
  const setTrendBoard = useUIStore((state) => state.setTrendBoard);
  const tabs = [{ id: "topic", label: { zh: "话题榜", en: "Topic ranking" } }, { id: "product", label: { zh: "商品榜", en: "Product ranking" } }, { id: "content", label: { zh: "内容榜", en: "Content ranking" } }] as const;
  return <TopbarTabs tabs={tabs.map(({ id, label }) => ({ id, label: l(label) }))} activeId={active} onSelect={(id) => setTrendBoard(id as typeof active)} ariaLabel={l({ zh: "热门趋势榜单", en: "Trend rankings" })} />;
}

function CalendarTopbarControls() {
  const l = useLoc();
  const monthIndex = useUIStore((state) => state.calendarMonthIndex);
  const setMonthIndex = useUIStore((state) => state.setCalendarMonthIndex);
  const months = [{ zh: "2026 年 8 月", en: "August 2026" }, { zh: "2026 年 9 月", en: "September 2026" }, { zh: "2026 年 10 月", en: "October 2026" }];
  return <div className="flex h-16 items-center gap-3"><p className="text-[15px] font-semibold tracking-[-0.01em] text-ink">{l({ zh: "营销日历", en: "Calendar" })}</p><span className="h-4 w-px bg-border" /><button type="button" aria-label={l({ zh: "上一个月", en: "Previous month" })} onClick={() => setMonthIndex(monthIndex - 1)} disabled={monthIndex === 0} className="flex h-7 w-7 items-center justify-center rounded-[6px] text-slate hover:bg-[#F7F7F8] disabled:opacity-30"><ChevronLeft className="h-3.5 w-3.5" /></button><span className="min-w-[92px] text-center text-[11px] font-medium text-ink">{l(months[monthIndex])}</span><button type="button" aria-label={l({ zh: "下一个月", en: "Next month" })} onClick={() => setMonthIndex(monthIndex + 1)} disabled={monthIndex === months.length - 1} className="flex h-7 w-7 items-center justify-center rounded-[6px] text-slate hover:bg-[#F7F7F8] disabled:opacity-30"><ChevronRight className="h-3.5 w-3.5" /></button><button type="button" onClick={() => setMonthIndex(0)} className="h-7 rounded-[6px] px-2 text-[10px] font-medium text-slate hover:bg-[#F7F7F8] hover:text-ink">{l({ zh: "今天", en: "Today" })}</button></div>;
}

function TopbarUtilities() {
  const t = useT();
  const locale = useI18nStore((state) => state.locale);
  const setLocale = useI18nStore((state) => state.setLocale);
  const languageLabel = locale === "zh" ? "中文" : "English";
  const languageFlag = locale === "zh" ? "🇨🇳" : "🇺🇸";
  const messageLabel = locale === "zh" ? "消息" : "Messages";

  return (
    <div className="flex h-9 items-center rounded-full border border-border bg-white text-[12px] text-slate">
      <Popover>
        <PopoverTrigger asChild>
          <button type="button" aria-label={t("account.language")} className="flex h-8 items-center gap-1.5 rounded-full px-3 transition-colors hover:bg-[#F8F8FA] hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/15">
            <span className="text-[14px] leading-none" aria-hidden>{languageFlag}</span>
            <span className="hidden sm:inline">{languageLabel}</span>
          </button>
        </PopoverTrigger>
        <PopoverContent align="end" side="bottom" sideOffset={10} className="w-[150px] p-1.5">
          {(["en", "zh"] as const).map((option) => {
            const active = locale === option;
            return <button key={option} type="button" onClick={() => setLocale(option)} className={`flex w-full items-center gap-2 rounded-[8px] px-3 py-2 text-[12px] transition-colors ${active ? "bg-[#F4F4F5] text-ink" : "text-slate hover:bg-[#FAFAFA]"}`}><span className="text-[14px] leading-none" aria-hidden>{option === "en" ? "🇺🇸" : "🇨🇳"}</span><span className="flex-1 text-left">{option === "en" ? "English" : "中文"}</span>{active && <Check className="h-3.5 w-3.5 text-ink" />}</button>;
          })}
        </PopoverContent>
      </Popover>
      <span className="h-4 w-px bg-border" />
      <Popover>
        <PopoverTrigger asChild>
          <button type="button" aria-label={messageLabel} className="flex h-8 items-center gap-1.5 rounded-full px-3 transition-colors hover:bg-[#F8F8FA] hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/15">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">{messageLabel}</span>
          </button>
        </PopoverTrigger>
        <PopoverContent align="end" side="bottom" sideOffset={10} className="w-[300px] p-4">
          <p className="border-b border-border pb-3 text-[13px] font-medium text-ink">{messageLabel}</p>
          <div className="flex min-h-40 flex-col items-center justify-center text-center">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F4F4F5] text-slate"><Bell className="h-4 w-4" /></span>
            <p className="mt-3 text-[13px] font-medium text-ink">{locale === "zh" ? "暂无消息" : "No notifications"}</p>
            <p className="mt-1 text-[11px] text-muted">{locale === "zh" ? "任务进度和系统通知会显示在这里" : "Task progress and system notices appear here."}</p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function PlanSummary() {
  const t = useT();

  return (
    <div className="group relative">
      <Link
        href="/settings/plan"
        aria-label="View Plus plan details"
        className="flex h-9 items-center gap-2 rounded-full border border-border bg-white px-3.5 text-[12px] transition-colors hover:bg-[#F8F8FA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/15"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F4F4F5] text-brand"><Sparkles className="h-3 w-3" /></span>
        <span className="font-medium text-ink">Plus</span>
        <span className="border-l border-border pl-2 text-muted">240</span>
      </Link>
      <div className="invisible pointer-events-none absolute right-0 top-full z-50 w-[270px] pt-2 opacity-0 transition-[opacity,visibility] duration-150 group-hover:visible group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:visible group-focus-within:pointer-events-auto group-focus-within:opacity-100">
        <section className="rounded-[12px] border border-border bg-white p-4 shadow-floating">
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex h-7 items-center gap-1.5 rounded-full bg-white px-2.5 text-[11px] font-medium text-slate shadow-[0_1px_2px_rgba(23,22,43,0.04)]"><Sparkles className="h-3.5 w-3.5 text-brand" />Plus</span>
            <span className="text-[11px] text-muted">{t("account.trialDaysShort").replace("{days}", "14")}</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-5">
            <div><p className="text-[10px] text-muted">{t("account.credits")}</p><p className="mt-1 text-[22px] font-medium tracking-[-0.03em] text-ink">240</p></div>
            <div><p className="text-[10px] text-muted">{t("account.usage")}</p><p className="mt-1 flex items-center gap-1.5 text-[22px] font-medium tracking-[-0.03em] text-ink"><Gauge className="h-4 w-4 text-slate" />32%</p></div>
          </div>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white"><span className="block h-full w-[32%] rounded-full bg-ink" /></div>
          <Link href="/settings/plan" className="mt-4 inline-flex items-center gap-1 text-[11px] font-medium text-slate transition-colors hover:text-ink">{t("account.viewPlan")}<ArrowUpRight className="h-3.5 w-3.5" /></Link>
        </section>
      </div>
    </div>
  );
}

function getPageTitle(
  pathname: string,
  sections: ReturnType<typeof useUIStore.getState>["discoverSections"],
  t: (key: string) => string,
) {
  if (pathname.startsWith("/creators")) {
    return t({
      "ai-search": "nav.creatorAiSearch",
      "cover-search": "nav.creatorCoverSearch",
      discovery: "nav.creatorDiscovery",
      outreach: "nav.creatorOutreach",
      private: "nav.creatorPrivate",
    }[sections.creators]);
  }
  if (pathname.startsWith("/brand-insights")) {
    return t(sections.brandRadar === "competitors" ? "nav.brandCompetitors" : "nav.brandInsights");
  }
  if (pathname.startsWith("/creative")) {
    return t({ calendar: "nav.creativeCalendar", trends: "nav.creativeTrends", "ai-tools": "nav.creativeAiTools" }[sections.creative]);
  }

  if (pathname.startsWith("/campaigns/new")) return t("nav.campaigns");
  if (pathname.startsWith("/campaigns")) return t("nav.campaigns");
  if (pathname.startsWith("/creators")) return t("nav.creators");
  if (pathname.startsWith("/collaborations")) return t("nav.collaborations");
  if (pathname.startsWith("/insights")) return t("nav.insights");
  if (pathname.startsWith("/creative")) return t("nav.creative");
  if (pathname.startsWith("/brand-insights")) return t("nav.brandInsights");
  if (pathname.startsWith("/employees")) return t("nav.employees");
  if (pathname.startsWith("/messages")) return t("account.messageCenter");
  if (pathname.startsWith("/settings/plan")) return t("account.viewPlan");
  if (pathname.startsWith("/settings")) return t("account.accountSettings");
  if (pathname.startsWith("/tracking")) return t("nav.tracking");
  if (pathname.startsWith("/pool")) return t("nav.pool");
  if (pathname.startsWith("/onboarding")) return t("nav.onboarding");
  return t("nav.dashboard");
}
