"use client";

import { useLoc } from "@/lib/i18n/use-i18n";
import {
  ArrowRight,
  BarChart3,
  FileCheck2,
  ImagePlay,
  Mail,
  ShieldCheck,
  WalletCards,
} from "lucide-react";
import Link from "next/link";

const brandTools = [
  {
    slug: "ai-brief-reviewer",
    icon: FileCheck2,
    title: { zh: "AI 审稿", en: "AI Brief Review" },
    description: {
      zh: "检查达人合作 Brief 的交付要求、品牌表达与风险，获得具体修改建议。",
      en: "Review creator briefs for deliverables, brand messaging, and risks, with actionable edits.",
    },
  },
  {
    slug: "fake-follower-checker",
    icon: ShieldCheck,
    title: { zh: "假粉检测", en: "Fake Follower Check" },
    description: {
      zh: "评估达人粉丝真实性与异常互动，帮助品牌筛选更可靠的合作对象。",
      en: "Assess audience authenticity and unusual engagement to shortlist reliable creator partners.",
    },
  },
  {
    slug: "instagram-money-calculator",
    icon: WalletCards,
    title: { zh: "达人报价估算", en: "Creator Rate Estimator" },
    description: {
      zh: "结合粉丝规模与互动率估算合作报价区间，为预算分配和议价提供参考。",
      en: "Estimate creator rates from audience size and engagement to support budgeting and negotiation.",
    },
  },
  {
    slug: "product-image-to-video",
    icon: ImagePlay,
    title: { zh: "商品转视频", en: "Product to Video" },
    description: {
      zh: "上传商品图片，准备适合社媒投放的短视频素材与展示方向。",
      en: "Prepare short-form social video concepts using your product images.",
    },
  },
  {
    slug: "influencer-outreach-email-generator",
    icon: Mail,
    title: { zh: "合作邀约邮件", en: "Creator Outreach Email" },
    description: {
      zh: "根据品牌、合作目标和达人信息，起草清晰、有针对性的合作邀约。",
      en: "Draft a focused partnership invitation using your brand, goals, and creator details.",
    },
  },
  {
    slug: "campaign-roi-calculator",
    icon: BarChart3,
    title: { zh: "营销 ROI 计算", en: "Campaign ROI Calculator" },
    description: {
      zh: "输入投入、收入与互动数据，计算 ROI、CPM 和 CPE，复盘营销效果。",
      en: "Calculate ROI, CPM, and CPE from campaign spend, revenue, and engagement.",
    },
  },
];

export function FreeToolsCatalog() {
  const l = useLoc();
  return (
    <section aria-label={l({ zh: "品牌营销工具", en: "Brand marketing tools" })}>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {brandTools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.slug}
              href={`/creative/tools/${tool.slug}`}
              className="group flex min-h-[190px] flex-col rounded-[14px] border border-border bg-white p-5 transition-colors hover:border-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Icon aria-hidden="true" className="h-6 w-6 text-slate" />
              <h2 className="mt-5 text-[15px] font-medium text-slate">{l(tool.title)}</h2>
              <p className="mt-2 text-[11.5px] leading-5 text-muted">{l(tool.description)}</p>
              <span className="mt-auto flex items-center gap-1.5 pt-5 text-[11px] font-medium text-slate group-hover:text-ink">
                {l({ zh: "打开工具", en: "Open tool" })}
                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
