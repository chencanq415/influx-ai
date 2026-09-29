"use client";

import { useLoc } from "@/lib/i18n/use-i18n";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Clapperboard, Download, FileCheck2, ImagePlus, ShieldCheck } from "lucide-react";
import Link from "next/link";

const tools = [
  { title: { zh: "AI 审稿", en: "AI review" }, description: { zh: "检查内容是否符合品牌要求，快速识别禁忌词、竞品露出与表达风险。", en: "Review content for brand fit, competitor mentions, and expression risks." }, icon: FileCheck2, href: "/context-lab?tool=ai-review" },
  { title: { zh: "商品转视频", en: "Product to video" }, description: { zh: "把商品图和卖点整理成适合社媒发布的短视频内容。", en: "Turn product imagery and claims into short-form social video." }, icon: Clapperboard, href: "/context-lab?tool=product-video" },
  { title: { zh: "商品图制作", en: "Product image maker" }, description: { zh: "快速制作适合活动 Brief、社媒与商品页使用的商品视觉。", en: "Create product visuals for briefs, social posts, and product pages." }, icon: ImagePlus, href: "/context-lab?tool=product-image" },
  { title: { zh: "假粉检测", en: "Fake follower check" }, description: { zh: "评估达人账号的粉丝质量、异常互动与受众真实性。", en: "Assess follower quality, unusual engagement, and audience authenticity." }, icon: ShieldCheck, href: "/context-lab?tool=audience-quality" },
  { title: { zh: "视频下载", en: "Video download" }, description: { zh: "保存公开内容作为案例、审稿素材或活动参考。", en: "Save public videos for references, review material, and campaign research." }, icon: Download, href: "/context-lab?tool=video-download" },
] as const;

export default function AIToolsPage() {
  return <main className="min-h-full bg-surface px-6 py-6 lg:px-8"><div className="w-full"><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{tools.map((tool) => <ToolCard key={tool.title.en} tool={tool} />)}</div></div></main>;
}

function ToolCard({ tool }: { tool: (typeof tools)[number] }) {
  const l = useLoc();
  const Icon = tool.icon;
  return <Link href={tool.href} className={cn("group flex min-h-[184px] flex-col rounded-[14px] border border-border bg-white p-5 transition-colors", "hover:border-border-strong hover:bg-[#FCFCFD]")}><span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-page text-slate transition-colors group-hover:text-brand"><Icon className="h-5 w-5" /></span><h2 className="mt-5 text-[15px] font-semibold text-ink">{l(tool.title)}</h2><p className="mt-2 max-w-[310px] text-[11.5px] leading-5 text-slate">{l(tool.description)}</p><span className="mt-auto flex items-center gap-1 pt-5 text-[11px] font-medium text-slate group-hover:text-ink">{l({ zh: "打开工具", en: "Open tool" })}<ArrowUpRight className="h-3.5 w-3.5" /></span></Link>;
}
