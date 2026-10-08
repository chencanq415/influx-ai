"use client";

import { Button } from "@/components/ui/button";
import { ContentReviewWorkspace } from "./content-review-workspace";
import type { FreeTool, ToolIconId } from "@/lib/free-tools";
import { useLoc } from "@/lib/i18n/use-i18n";
import { cn } from "@/lib/utils";
import {
  AtSign,
  BarChart3,
  Calculator,
  Check,
  CheckCircle2,
  ChevronDown,
  Copy,
  FileCheck2,
  FileText,
  Hash,
  ImagePlay,
  Lightbulb,
  Mail,
  MessageSquareText,
  Sparkles,
  Target,
  TrendingUp,
  UploadCloud,
  UserRound,
  UsersRound,
  WalletCards,
  Youtube,
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

const icons: Record<ToolIconId, React.ElementType> = {
  profile: UserRound,
  caption: MessageSquareText,
  hashtag: Hash,
  calculator: Calculator,
  money: WalletCards,
  youtube: Youtube,
  script: FileText,
  video: ImagePlay,
  copy: AtSign,
  review: FileCheck2,
  ideas: Lightbulb,
  hook: TrendingUp,
  mail: Mail,
  audience: UsersRound,
  strategy: Target,
  roi: BarChart3,
  rights: FileCheck2,
};

function num(values: Record<string, string>, key: string) {
  return Number(values[key] || 0);
}

function calculate(tool: FreeTool, values: Record<string, string>, l: ReturnType<typeof useLoc>) {
  if (tool.slug === "instagram-engagement-rate-calculator") {
    const followers = Math.max(1, num(values, "followers"));
    const rate = ((num(values, "likes") + num(values, "comments")) / followers) * 100;
    return l({
      zh: `平均互动率 ${rate.toFixed(2)}% · ${rate >= 4 ? "评级：优秀" : rate >= 2 ? "评级：良好" : "评级：待提升"}`,
      en: `Average engagement ${rate.toFixed(2)}% · ${rate >= 4 ? "Rating: Excellent" : rate >= 2 ? "Rating: Good" : "Rating: Needs improvement"}`,
    });
  }
  if (tool.slug === "tiktok-engagement-rate-calculator") {
    const views = Math.max(1, num(values, "views"));
    const rate =
      ((num(values, "likes") + num(values, "comments") + num(values, "shares")) / views) * 100;
    return l({
      zh: `播放量互动率 ${rate.toFixed(2)}% · ${rate >= 7 ? "评级：优秀" : rate >= 4 ? "评级：良好" : "评级：待提升"}`,
      en: `View-based engagement ${rate.toFixed(2)}% · ${rate >= 7 ? "Rating: Excellent" : rate >= 4 ? "Rating: Good" : "Rating: Needs improvement"}`,
    });
  }
  if (tool.slug === "instagram-money-calculator") {
    const quote = num(values, "followers") * 0.0075 * Math.max(0.7, num(values, "engagement") / 4);
    return l({
      zh: `建议报价 USD ${Math.round(quote).toLocaleString()} · 合理区间 USD ${Math.round(quote * 0.75).toLocaleString()}–${Math.round(quote * 1.35).toLocaleString()}`,
      en: `Suggested quote USD ${Math.round(quote).toLocaleString()} · Fair range USD ${Math.round(quote * 0.75).toLocaleString()}–${Math.round(quote * 1.35).toLocaleString()}`,
    });
  }
  if (tool.slug === "tiktok-money-calculator") {
    const deal = num(values, "followers") * 0.004 + num(values, "views") * 0.004;
    return l({
      zh: `单条品牌合作预估 USD ${Math.round(deal * 0.75).toLocaleString()}–${Math.round(deal * 1.4).toLocaleString()} · 建议根据授权范围调整`,
      en: `Estimated brand deal USD ${Math.round(deal * 0.75).toLocaleString()}–${Math.round(deal * 1.4).toLocaleString()} · Adjust for usage rights`,
    });
  }
  if (tool.slug === "campaign-roi-calculator") {
    const cost = Math.max(1, num(values, "cost"));
    const revenue = num(values, "revenue");
    const roi = ((revenue - cost) / cost) * 100;
    const cpm = (cost / Math.max(1, num(values, "impressions"))) * 1000;
    const cpe = cost / Math.max(1, num(values, "engagements"));
    return l({
      zh: `ROI ${roi.toFixed(0)}% · CPM USD ${cpm.toFixed(2)} · CPE USD ${cpe.toFixed(2)}`,
      en: `ROI ${roi.toFixed(0)}% · CPM USD ${cpm.toFixed(2)} · CPE USD ${cpe.toFixed(2)}`,
    });
  }
  return l(tool.examples[0]);
}

export function FreeToolWorkspace({ tool }: { tool: FreeTool }) {
  const l = useLoc();
  const [values, setValues] = useState<Record<string, string>>({});
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);
  const Icon = icons[tool.icon] ?? Sparkles;
  const results = useMemo(
    () => (generated ? [calculate(tool, values, l), ...tool.examples.slice(1).map(l)] : []),
    [generated, l, tool, values],
  );

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setGenerated(true);
  };

  const copy = async (value: string, index: number) => {
    await navigator.clipboard?.writeText(value);
    setCopied(index);
    window.setTimeout(() => setCopied(null), 1200);
  };

  if (tool.slug === "ai-brief-reviewer") return <ContentReviewWorkspace />;

  return (
    <main className="min-h-full bg-surface">
      <div className="mx-auto w-full max-w-[1380px] px-6 py-5 lg:px-8">

        <div className="mt-4 flex flex-col gap-3 border-b border-border pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-page text-brand">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-[22px] font-semibold tracking-[-0.035em] text-navy">
                  {l(tool.title)}
                </h1>
                <span className="rounded-full bg-soft-pink px-2 py-1 text-[8.5px] font-semibold text-brand">
                  {tool.priority}
                </span>
              </div>
              <p className="mt-1 max-w-[720px] text-[11.5px] leading-5 text-slate">
                {l(tool.description)}
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[10px] text-teal-text">
            <CheckCircle2 className="h-3.5 w-3.5" />
            {l({ zh: "无需登录即可体验", en: "Try without signing in" })}
          </span>
        </div>

        <div className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,.85fr)]">
          <form onSubmit={submit} className="rounded-[15px] border border-border bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-[14px] font-semibold text-navy">
                  {l({ zh: "填写信息", en: "Add your inputs" })}
                </h2>
                <p className="mt-1 text-[10px] text-muted">
                  {l({
                    zh: "填写核心信息，AI 会按工具规则整理结果。",
                    en: "Add the essentials and AI will structure the result for this tool.",
                  })}
                </p>
              </div>
              <Sparkles className="h-4 w-4 text-brand" />
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {tool.fields.map((field) => (
                <label
                  key={field.id}
                  htmlFor={`tool-field-${field.id}`}
                  className={cn(
                    "block",
                    (field.type === "textarea" || field.type === "file") && "sm:col-span-2",
                  )}
                >
                  <span className="mb-1.5 block text-[10.5px] font-medium text-ink">
                    {l(field.label)}
                  </span>
                  {field.type === "textarea" ? (
                    <textarea
                      id={`tool-field-${field.id}`}
                      value={values[field.id] ?? ""}
                      onChange={(event) =>
                        setValues((current) => ({ ...current, [field.id]: event.target.value }))
                      }
                      placeholder={field.placeholder ? l(field.placeholder) : ""}
                      className="min-h-[112px] w-full resize-none rounded-[10px] border border-border bg-white px-3 py-2.5 text-[11px] leading-5 text-ink outline-none placeholder:text-muted focus:border-ring"
                    />
                  ) : field.type === "select" ? (
                    <span className="relative block">
                      <select
                        id={`tool-field-${field.id}`}
                        value={values[field.id] ?? ""}
                        onChange={(event) =>
                          setValues((current) => ({ ...current, [field.id]: event.target.value }))
                        }
                        className="h-10 w-full appearance-none rounded-[10px] border border-border bg-white px-3 pr-8 text-[11px] text-ink outline-none focus:border-ring"
                      >
                        <option value="">{l({ zh: "请选择", en: "Select" })}</option>
                        {field.options?.map((option) => (
                          <option key={option.en} value={option.en}>
                            {l(option)}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
                    </span>
                  ) : field.type === "file" ? (
                    <span className="flex min-h-[88px] cursor-pointer flex-col items-center justify-center rounded-[11px] border border-dashed border-border-strong bg-page px-4 text-center hover:border-ring">
                      <UploadCloud className="h-5 w-5 text-slate" />
                      <span className="mt-2 text-[10px] font-medium text-slate">
                        {l(field.label)}
                      </span>
                      <span className="mt-1 text-[8.5px] text-muted">PDF, DOCX, JPG, PNG</span>
                      <input
                        id={`tool-field-${field.id}`}
                        type="file"
                        multiple
                        className="sr-only"
                        onChange={(event) =>
                          setValues((current) => ({
                            ...current,
                            [field.id]: event.target.files?.[0]?.name ?? "",
                          }))
                        }
                      />
                      {values[field.id] && (
                        <span className="mt-1 text-[9px] text-brand">{values[field.id]}</span>
                      )}
                    </span>
                  ) : (
                    <input
                      id={`tool-field-${field.id}`}
                      type={field.type}
                      value={values[field.id] ?? ""}
                      onChange={(event) =>
                        setValues((current) => ({ ...current, [field.id]: event.target.value }))
                      }
                      placeholder={field.placeholder ? l(field.placeholder) : ""}
                      className="h-10 w-full rounded-[10px] border border-border bg-white px-3 text-[11px] text-ink outline-none placeholder:text-muted focus:border-ring"
                    />
                  )}
                </label>
              ))}
            </div>
            <Button type="submit" className="mt-5 h-10 px-5">
              <Sparkles className="h-3.5 w-3.5" />
              {generated
                ? l({ zh: "重新生成", en: "Generate again" })
                : l({ zh: "生成结果", en: "Generate result" })}
            </Button>
          </form>

          <aside className="rounded-[15px] border border-border bg-white p-5">
            <h2 className="text-[14px] font-semibold text-navy">
              {l({ zh: "工具能力", en: "What this tool includes" })}
            </h2>
            <div className="mt-4 space-y-3">
              {tool.features.map((feature) => (
                <div key={feature.en} className="flex gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-soft-teal text-teal-text">
                    <Check className="h-3 w-3" />
                  </span>
                  <p className="text-[10.5px] leading-5 text-slate">{l(feature)}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-[11px] bg-page p-3">
              <p className="text-[9px] font-semibold uppercase tracking-[.1em] text-muted">
                {l({ zh: "使用提示", en: "Tip" })}
              </p>
              <p className="mt-1.5 text-[10px] leading-5 text-slate">
                {l({
                  zh: "信息越具体，结果越接近真实使用场景。生成后仍可调整输入并重新生成。",
                  en: "Specific inputs produce more useful results. Refine any field and generate again.",
                })}
              </p>
            </div>
          </aside>
        </div>

        <section className="mt-4 rounded-[15px] border border-border bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[14px] font-semibold text-navy">
                {l({ zh: "生成结果", en: "Generated result" })}
              </h2>
              <p className="mt-1 text-[10px] text-muted">
                {l({
                  zh: "结果可直接复制，后续可继续编辑。",
                  en: "Copy the result or refine it further.",
                })}
              </p>
            </div>
            {generated && (
              <span className="rounded-full bg-soft-teal px-2.5 py-1 text-[9px] font-medium text-teal-text">
                {l({ zh: "已完成", en: "Ready" })}
              </span>
            )}
          </div>
          {!generated ? (
            <div className="flex min-h-[170px] flex-col items-center justify-center text-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-page text-muted">
                <Sparkles className="h-4 w-4" />
              </span>
              <p className="mt-3 text-[10.5px] text-muted">
                {l({
                  zh: "填写信息并点击生成，结果会显示在这里。",
                  en: "Complete the inputs and generate to see your result here.",
                })}
              </p>
            </div>
          ) : (
            <div className="mt-4 grid gap-3 lg:grid-cols-2">
              {results.map((result, index) => (
                <article
                  key={`${result}-${index}`}
                  className="relative min-h-[130px] rounded-[11px] border border-border bg-page p-4 pr-11"
                >
                  <pre className="whitespace-pre-wrap font-sans text-[11px] leading-6 text-ink">
                    {result}
                  </pre>
                  <button
                    type="button"
                    onClick={() => copy(result, index)}
                    aria-label={l({ zh: "复制结果", en: "Copy result" })}
                    className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-[7px] bg-white text-slate hover:text-brand"
                  >
                    {copied === index ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
