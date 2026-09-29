"use client";

import { ArrowLeft, Check, CreditCard, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import { useAuthStore, type EmployeePlan } from "@/lib/account/auth-store";
import { useLoc } from "@/lib/i18n/use-i18n";
import { cn } from "@/lib/utils";

type Plan = {
  id: EmployeePlan;
  name: string;
  price: string;
  period: { zh: string; en: string };
  credits: number;
  description: { zh: string; en: string };
  features: Array<{ zh: string; en: string }>;
  featured?: boolean;
};

const plans: Plan[] = [
  { id: "free", name: "Free", price: "$0", period: { zh: "/ 月", en: "/ month" }, credits: 60, description: { zh: "适合探索 Influx 的个人用户", en: "For individuals exploring Influx" }, features: [{ zh: "60 积分 / 月", en: "60 credits / month" }, { zh: "基础达人搜索", en: "Creator discovery" }, { zh: "1 个工作区成员", en: "1 workspace member" }] },
  { id: "plus", name: "Plus", price: "$29", period: { zh: "/ 月", en: "/ month" }, credits: 360, description: { zh: "为日常达人发现与 AI 建联打造", en: "For everyday creator discovery and AI outreach" }, features: [{ zh: "360 积分 / 月", en: "360 credits / month" }, { zh: "AI 搜索与达人匹配", en: "AI search and matching" }, { zh: "AI 自动建联", en: "AI-powered outreach" }, { zh: "最多 5 个工作区成员", en: "Up to 5 workspace members" }], featured: true },
  { id: "pro", name: "Pro", price: "$79", period: { zh: "/ 月", en: "/ month" }, credits: 1200, description: { zh: "适合持续开展多 Campaign 的团队", en: "For teams running multiple campaigns" }, features: [{ zh: "1,200 积分 / 月", en: "1,200 credits / month" }, { zh: "批量达人筛选", en: "Bulk creator qualification" }, { zh: "高级趋势与品牌洞察", en: "Advanced trends and brand insights" }, { zh: "最多 15 个工作区成员", en: "Up to 15 workspace members" }] },
  { id: "enterprise", name: "Enterprise", price: "", period: { zh: "", en: "" }, credits: 0, description: { zh: "为企业级团队提供专属支持", en: "Dedicated support for enterprise teams" }, features: [{ zh: "定制积分与用量", en: "Custom credits and usage" }, { zh: "专属工作流与权限", en: "Custom workflows and access" }, { zh: "企业级支持", en: "Enterprise support" }] },
];

const currentPlanMeta: Record<EmployeePlan, { used: number; renews: { zh: string; en: string }; started: { zh: string; en: string }; status: { zh: string; en: string } }> = {
  free: { used: 18, renews: { zh: "2026 年 7 月 1 日", en: "Jul 1, 2026" }, started: { zh: "2026 年 6 月 1 日", en: "Jun 1, 2026" }, status: { zh: "免费套餐", en: "Free plan" } },
  plus: { used: 120, renews: { zh: "2026 年 6 月 18 日", en: "Jun 18, 2026" }, started: { zh: "2026 年 6 月 4 日", en: "Jun 4, 2026" }, status: { zh: "试用中 · 剩余 14 天", en: "Trial · 14 days remaining" } },
  pro: { used: 428, renews: { zh: "2026 年 7 月 1 日", en: "Jul 1, 2026" }, started: { zh: "2026 年 6 月 1 日", en: "Jun 1, 2026" }, status: { zh: "订阅有效", en: "Active subscription" } },
  enterprise: { used: 0, renews: { zh: "联系客户成功团队", en: "Contact customer success" }, started: { zh: "定制周期", en: "Custom cycle" }, status: { zh: "企业套餐", en: "Enterprise plan" } },
};

export default function PlanPage() {
  const l = useLoc();
  const activePlan = useAuthStore((state) => state.currentUser?.employeePlan ?? "plus");
  const setEmployeePlan = useAuthStore((state) => state.setEmployeePlan);
  const currentPlan = plans.find((plan) => plan.id === activePlan) ?? plans[1];
  const meta = currentPlanMeta[activePlan];
  const remaining = Math.max(currentPlan.credits - meta.used, 0);
  const usagePercent = currentPlan.credits ? Math.round((meta.used / currentPlan.credits) * 100) : 0;

  return <main className="min-h-full bg-surface px-6 py-7 lg:px-10"><div className="mx-auto w-full max-w-[1180px]">
    <Link href="/settings" className="inline-flex h-8 items-center gap-1.5 text-[11px] font-medium text-slate transition-colors hover:text-ink"><ArrowLeft className="h-3.5 w-3.5" />{l({ zh: "返回账户设置", en: "Back to settings" })}</Link>
    <header className="mt-5"><p className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted">{l({ zh: "套餐与用量", en: "Plan & usage" })}</p><h1 className="mt-2 text-[30px] font-semibold tracking-[-0.04em] text-ink">{l({ zh: "套餐与积分", en: "Plan & credits" })}</h1><p className="mt-1.5 text-[13px] text-slate">{l({ zh: "查看当前套餐的订阅与积分使用情况，并选择适合团队的方案。", en: "Review your subscription and credit usage, then choose a plan that fits your team." })}</p></header>

    <section className="mt-7 overflow-hidden rounded-[14px] border border-border bg-white">
      <div className="flex flex-wrap items-start justify-between gap-5 border-b border-border bg-surface-warm px-5 py-4 sm:px-6"><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-white text-brand"><Sparkles className="h-4 w-4" /></span><div><div className="flex items-center gap-2"><h2 className="text-[16px] font-medium text-ink">{currentPlan.name}</h2><span className="rounded-full bg-white px-2 py-0.5 text-[10px] text-slate">{l(meta.status)}</span></div><p className="mt-1 text-[11px] text-muted">{l({ zh: "当前套餐", en: "Current plan" })}</p></div></div><div className="text-left sm:text-right"><p className="text-[10px] text-muted">{l({ zh: "下次续订", en: "Next renewal" })}</p><p className="mt-1 text-[12px] font-medium text-ink">{l(meta.renews)}</p></div></div>
      <div className="grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0"><UsageMetric label={l({ zh: "本周期总积分", en: "Total credits" })} value={currentPlan.credits.toLocaleString()} hint={l({ zh: "每个订阅周期", en: "Per subscription cycle" })} /><UsageMetric label={l({ zh: "剩余积分", en: "Credits remaining" })} value={remaining.toLocaleString()} hint={l({ zh: `已使用 ${meta.used.toLocaleString()} 积分`, en: `${meta.used.toLocaleString()} credits used` })} /><UsageMetric label={l({ zh: "订阅开始时间", en: "Subscription started" })} value={l(meta.started)} hint={l({ zh: "自动续订", en: "Auto-renews" })} /></div>
      <div className="border-t border-border px-5 py-4 sm:px-6"><div className="flex items-center justify-between gap-4 text-[11px]"><span className="text-slate">{l({ zh: "本周期积分使用", en: "Credits used this cycle" })}</span><span className="font-medium text-ink">{meta.used.toLocaleString()} / {currentPlan.credits.toLocaleString()} · {usagePercent}%</span></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary"><span className="block h-full rounded-full bg-ink" style={{ width: `${usagePercent}%` }} /></div></div>
    </section>

    <section className="mt-10"><div><p className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted">{l({ zh: "可选套餐", en: "Available plans" })}</p><h2 className="mt-2 text-[20px] font-medium tracking-[-0.025em] text-ink">{l({ zh: "选择适合团队的套餐", en: "Choose a plan for your team" })}</h2></div><div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{plans.map((plan) => { const isCurrent = plan.id === activePlan; const isEnterprise = plan.id === "enterprise"; return <article key={plan.id} className={cn("relative flex min-h-[356px] flex-col rounded-[14px] border bg-white p-5", isCurrent ? "border-brand" : "border-border")}>{plan.featured && <span className="absolute right-4 top-4 rounded-full bg-soft-pink px-2 py-0.5 text-[9px] font-medium text-brand">{l({ zh: "当前推荐", en: "Recommended" })}</span>}<div><h3 className="text-[16px] font-medium text-ink">{plan.name}</h3><p className="mt-2 min-h-10 text-[11px] leading-5 text-slate">{l(plan.description)}</p><div className="mt-5 flex items-end gap-1"><span className="text-[28px] font-semibold tracking-[-0.04em] text-ink">{isEnterprise ? l({ zh: "定制", en: "Custom" }) : plan.price}</span>{!isEnterprise && <span className="mb-1 text-[11px] text-muted">{l(plan.period)}</span>}</div><p className="mt-2 text-[11px] font-medium text-slate">{plan.credits ? `${plan.credits.toLocaleString()} ${l({ zh: "积分 / 月", en: "credits / month" })}` : l({ zh: "按团队需求配置", en: "Tailored to your team" })}</p></div><ul className="mt-5 space-y-2.5 border-t border-border pt-5">{plan.features.map((feature) => <li key={feature.en} className="flex gap-2 text-[10.5px] leading-4 text-slate"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink" />{l(feature)}</li>)}</ul><button type="button" disabled={isCurrent} onClick={() => !isEnterprise && setEmployeePlan(plan.id)} className={cn("mt-auto flex h-9 w-full items-center justify-center gap-1.5 rounded-[8px] text-[11px] font-medium transition-colors", isCurrent ? "cursor-default bg-secondary text-slate" : plan.featured ? "bg-brand text-white hover:bg-brand-hover" : "border border-border text-ink hover:bg-secondary")}>{isCurrent ? l({ zh: "当前套餐", en: "Current plan" }) : isEnterprise ? l({ zh: "联系销售", en: "Contact sales" }) : <><Zap className="h-3.5 w-3.5" />{l({ zh: "选择此套餐", en: "Choose plan" })}</>}</button></article>; })}</div></section>
    <p className="mt-5 flex items-center gap-1.5 text-[10.5px] text-muted"><CreditCard className="h-3.5 w-3.5" />{l({ zh: "这是产品演示环境，切换套餐不会产生实际扣费。", en: "This is a product demo. Changing plans does not create a charge." })}</p>
  </div></main>;
}

function UsageMetric({ label, value, hint }: { label: string; value: string; hint: string }) { return <div className="px-5 py-5 sm:px-6"><p className="text-[10px] text-muted">{label}</p><p className="mt-2 text-[24px] font-medium tracking-[-0.035em] text-ink">{value}</p><p className="mt-1 text-[10px] text-slate">{hint}</p></div>; }
