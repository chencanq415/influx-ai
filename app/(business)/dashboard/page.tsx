"use client";

import { ArrowRight, CheckCircle2, ChevronRight, FileCheck2, Sparkles } from "lucide-react";
import Link from "next/link";
import { useLoc } from "@/lib/i18n/use-i18n";
import { useUIStore } from "@/lib/store/ui-store";

const L = {
  eyebrow: { zh: "今日待办", en: "TODAY" },
  title: { zh: "审核你的最新稿件", en: "Review your latest drafts" },
  subtitle: { zh: "有 3 条视频等待你的反馈。", en: "3 videos are ready for your feedback." },
  create: { zh: "创建活动", en: "Create" },
  campaign: { zh: "活动", en: "CAMPAIGN" },
  defaultCampaign: { zh: "夏日护肤上新", en: "Summer skincare launch" },
  campaignHint: { zh: "本周正在推进的内容协作", en: "Creator content in progress this week" },
  reviewDrafts: { zh: "审核 3 条稿件", en: "Review 3 drafts" },
  ready: { zh: "可审核", en: "Ready" },
  reviewing: { zh: "审核中", en: "In review" },
  scheduled: { zh: "待处理", en: "Queued" },
  suggestionTitle: { zh: "建议下一步", en: "Suggested next step" },
  suggestionCopy: { zh: "在首条视频里补充一个产品特写，有助于提升内容停留。", en: "Add a close-up product shot to the first video to improve hold time." },
  applySuggestion: { zh: "应用建议", en: "Apply suggestion" },
  active: { zh: "位达人正在合作", en: "creators active" },
  draftsReady: { zh: "条稿件待审核", en: "drafts ready" },
  campaignProgress: { zh: "当前活动", en: "Current campaign" },
} as const;

const drafts = [
  { name: "Lena Park", copy: { zh: "晨间护肤日常", en: "Morning routine for glowing skin" }, status: "ready" },
  { name: "Noah Kim", copy: { zh: "3 个夏日护肤技巧", en: "3 summer skincare tips" }, status: "reviewing" },
  { name: "Ava Chen", copy: { zh: "我的防晒必备清单", en: "My go-to SPF for sunny days" }, status: "scheduled" },
] as const;

export default function DashboardPage() {
  const l = useLoc();
  const campaigns = useUIStore((state) => state.campaigns);
  const currentCampaign = campaigns.find((campaign) => campaign.status === "active") ?? campaigns[0];
  const campaignName = currentCampaign ? l(currentCampaign.name) : l(L.defaultCampaign);

  const statusLabel = (status: (typeof drafts)[number]["status"]) => {
    if (status === "ready") return l(L.ready);
    if (status === "reviewing") return l(L.reviewing);
    return l(L.scheduled);
  };

  return (
    <main className="min-h-full bg-surface px-6 py-8 lg:px-10 lg:py-10">
      <div className="mx-auto w-full max-w-[1280px]">
        <header className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted">{l(L.eyebrow)}</p>
            <h1 className="mt-3 text-[38px] font-semibold tracking-[-0.045em] text-ink sm:text-[46px]">{l(L.title)}</h1>
            <p className="mt-2 text-[16px] font-normal text-muted">{l(L.subtitle)}</p>
          </div>
          <Link href="/campaigns" className="inline-flex h-11 items-center gap-2 rounded-full bg-brand px-5 text-[14px] font-medium text-white shadow-cta transition-colors hover:bg-brand-hover">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-[16px] leading-none">+</span>
            {l(L.create)}
          </Link>
        </header>

        <div className="mt-8 grid gap-4 xl:grid-cols-[minmax(0,1.8fr)_minmax(300px,0.8fr)]">
          <section className="rounded-[24px] border border-border bg-white p-5 shadow-card sm:p-7">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">{l(L.campaign)}</p>
                <h2 className="mt-2 text-[22px] font-medium tracking-[-0.025em] text-[#3A3A50]">{campaignName}</h2>
                <p className="mt-1.5 text-[14px] font-normal text-muted">{l(L.campaignHint)}</p>
              </div>
              <button type="button" aria-label="More options" className="rounded-full px-2 py-1 text-[20px] leading-none text-muted transition-colors hover:bg-surface-warm hover:text-slate">•••</button>
            </div>

            <Link href="/collaborations" className="mt-6 flex items-center gap-4 rounded-[18px] border border-transparent bg-surface-warm px-4 py-4 transition-colors hover:border-border hover:bg-soft-lavender/70">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-brand shadow-soft"><FileCheck2 className="h-4 w-4" /></span>
              <span className="flex-1 text-[18px] font-medium tracking-[-0.02em] text-[#3A3A50]">{l(L.reviewDrafts)}</span>
              <span className="hidden h-1.5 w-28 overflow-hidden rounded-full bg-border sm:block"><span className="block h-full w-1/3 rounded-full bg-brand" /></span>
              <span className="text-[13px] font-normal text-muted">1/3</span>
              <ChevronRight className="h-4 w-4 text-slate" />
            </Link>

            <div className="mt-4 divide-y divide-border-row">
              {drafts.map((draft, index) => (
                <Link key={draft.name} href="/collaborations" className="group flex items-center gap-4 py-3.5 first:pt-1 last:pb-0">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-surface-warm text-[13px] font-medium text-slate">
                    {draft.name.split(" ").map((part) => part[0]).join("")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[15px] font-normal text-slate">{draft.name}</span>
                    <span className="mt-0.5 block truncate text-[13px] font-normal text-muted">{l(draft.copy)}</span>
                  </span>
                  <span className="hidden items-center gap-2 text-[13px] font-normal text-muted sm:inline-flex">
                    <span className={`h-1.5 w-1.5 rounded-full ${index === 0 ? "bg-teal" : index === 1 ? "bg-amber" : "bg-muted"}`} />
                    {statusLabel(draft.status)}
                  </span>
                  <span className="text-muted opacity-0 transition-opacity group-hover:opacity-100"><ArrowRight className="h-4 w-4" /></span>
                </Link>
              ))}
            </div>
          </section>

          <aside className="rounded-[24px] border border-border bg-surface-warm/70 p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-brand shadow-soft"><Sparkles className="h-4 w-4" /></span>
              <h2 className="text-[18px] font-medium tracking-[-0.02em] text-[#3A3A50]">{l(L.suggestionTitle)}</h2>
            </div>
            <div className="mt-6 rounded-[18px] border border-white bg-white/85 p-4">
              <div className="h-28 rounded-[13px] bg-[linear-gradient(135deg,#F5F2FF,#FDFBFF_50%,#EEF3FF)] p-3">
                <div className="h-full rounded-[9px] border border-white/80 bg-white/45" />
              </div>
              <p className="mt-4 text-[15px] leading-6 text-slate">{l(L.suggestionCopy)}</p>
              <button type="button" className="mt-5 inline-flex items-center gap-2 text-[14px] font-medium text-brand transition-colors hover:text-brand-hover">
                <Sparkles className="h-3.5 w-3.5" />
                {l(L.applySuggestion)}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </aside>
        </div>

        <section className="mt-7 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-border-row pt-6">
          <div className="flex items-center gap-3 text-[14px] text-muted"><CheckCircle2 className="h-5 w-5 text-slate" /><span><strong className="font-medium text-slate">12</strong> {l(L.active)}</span></div>
          <div className="flex items-center gap-3 text-[14px] text-muted"><FileCheck2 className="h-5 w-5 text-slate" /><span><strong className="font-medium text-slate">3</strong> {l(L.draftsReady)}</span></div>
          <Link href="/campaigns" className="ml-auto text-[13px] font-medium text-slate transition-colors hover:text-brand">{l(L.campaignProgress)} <ArrowRight className="ml-1 inline h-3.5 w-3.5" /></Link>
        </section>
      </div>
    </main>
  );
}
