"use client";

import { publicAsset } from "@/lib/public-asset";
import { useLoc } from "@/lib/i18n/use-i18n";
import { useUIStore } from "@/lib/store/ui-store";
import { cn } from "@/lib/utils";
import {
  Globe2,
  Sparkles,
  BarChart3,
  ArrowUpRight,
  ChevronDown,
  Info,
  UsersRound,
  FileImage,
} from "lucide-react";
import { useParams } from "next/navigation";
import { type ReactNode, useEffect, useMemo, useState } from "react";
import {
  distribution,
  engagement,
  filterReport,
  loadReportData,
  platforms,
  sumAvailable,
  tier,
  unavailableReport,
  type InsightContent,
  type AssociatedCreator,
  type ReportData,
} from "./report-data";

const brands: Record<
  string,
  {
    name: string;
    website: string;
    cover: string;
    logo?: string;
    category: { zh: string; en: string };
  }
> = {
  shein: {
    name: "SHEIN",
    website: "shein.com",
    cover: "/brand-reports/shein-cover.jpg",
    logo: "/brand-reports/shein-logo.png",
    category: { zh: "时尚生活", en: "Fashion & lifestyle" },
  },
  nike: {
    name: "Nike",
    website: "nike.com",
    cover: "/brand-reports/nike-cover.jpg",
    logo: "/brand-reports/nike-logo.svg",
    category: { zh: "健康运动", en: "Health & fitness" },
  },
  aesop: {
    name: "Aesop",
    website: "aesop.com",
    cover: "/brand-reports/aesop-cover.jpg",
    logo: "/brand-reports/aesop-logo.png",
    category: { zh: "美妆护肤", en: "Beauty & skincare" },
  },
  oatside: {
    name: "Oatside",
    website: "oatside.com",
    cover: "/brand-reports/oatside-cover.jpg",
    logo: "/brand-reports/oatside-logo.png",
    category: { zh: "食品饮料", en: "Food & beverage" },
  },
  glossier: {
    name: "Glossier",
    website: "glossier.com",
    cover: "/brand-reports/glossier-cover.jpg",
    category: { zh: "美妆护肤", en: "Beauty & skincare" },
  },
  allbirds: {
    name: "Allbirds",
    website: "allbirds.com",
    cover: "/brand-reports/allbirds-cover.jpg",
    category: { zh: "时尚生活", en: "Fashion & lifestyle" },
  },
};

type Text = { zh: string; en: string };
const labels = {
  contents: { zh: "品牌相关内容量", en: "Brand contents" },
  engagement: { zh: "总互动量", en: "Total engagement" },
  creators: { zh: "关联创作者数", en: "Associated creators" },
  views: { zh: "总观看量", en: "Total views" },
};
const format = (n: number | null) =>
  n === null
    ? "—"
    : new Intl.NumberFormat("en", {
        notation: n >= 10000 ? "compact" : "standard",
        maximumFractionDigits: 1,
      }).format(n);
const today = () =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
function startDate(end: string, days: number) {
  const d = new Date(end + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() - days + 1);
  return d.toISOString().slice(0, 10);
}

export default function BrandReportPage() {
  const { brand: brandId } = useParams<{ brand: string }>();
  const l = useLoc();
  const brand = brands[brandId?.toLowerCase()] ?? brands.shein;
  const tab = useUIStore((s) => s.brandReportTab);
  const [days, setDays] = useState("30");
  const [platform, setPlatform] = useState("all");
  const [region, setRegion] = useState("all");
  const [end, setEnd] = useState("");
  const [data, setData] = useState<ReportData>({ ...unavailableReport, status: "loading" });
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    setEnd(today());
  }, []);
  useEffect(() => {
    let cancelled = false;
    setData({ ...unavailableReport, status: "loading" });
    loadReportData(brandId)
      .then((next) => {
        if (!cancelled) setData(next);
      })
      .catch(() => {
        if (!cancelled) setData({ ...unavailableReport, status: "error" });
      });
    return () => {
      cancelled = true;
    };
  }, [brandId, retry]);
  const start = end ? startDate(end, Number(days)) : "";
  const filtered = useMemo(
    () => filterReport(data, start, end, platform, region),
    [data, start, end, platform, region],
  );
  const known =
    data.availablePlatforms !== null &&
    data.status !== "error" &&
    data.status !== "unsupported" &&
    data.status !== "loading" &&
    (platform === "all" ||
      data.availablePlatforms.includes(platform as (typeof platforms)[number]));
  const regions = [
    ...new Set(data.creators.map((c) => c.region).filter((r): r is string => !!r)),
  ].sort();
  const contents = filtered.contents;
  const creators = filtered.creators;
  const highPerformers = [...contents]
    .filter((c) => engagement(c) !== null)
    .sort((a, b) => (engagement(b) ?? 0) - (engagement(a) ?? 0))
    .slice(0, 6);
  return (
    <main className="min-h-full bg-surface">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-6 lg:px-8">
        <section className="relative overflow-hidden rounded-[16px] border border-border bg-white">
          <img
            src={publicAsset(brand.cover)}
            alt=""
            className="absolute inset-y-0 right-0 h-full w-[42%] object-cover opacity-75"
          />
          <div className="absolute inset-y-0 right-[38%] w-28 bg-gradient-to-r from-white via-white/90 to-transparent" />
          <div className="relative flex min-h-[150px] items-center p-6">
            <span className="mr-4 flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[14px] border border-border bg-white">
              {brand.logo ? (
                <img
                  src={publicAsset(brand.logo)}
                  alt={brand.name}
                  className="h-full w-full object-contain p-2.5"
                />
              ) : (
                <Globe2 className="h-5 w-5 text-slate" />
              )}
            </span>
            <div>
              <div className="flex items-center gap-2 text-[10px] text-muted">
                <span>{l({ zh: "品牌研究报告", en: "Brand research report" })}</span>
                <span>·</span>
                <span>{l(brand.category)}</span>
              </div>
              <h1 className="mt-1 text-[30px] font-semibold tracking-[-0.045em] text-ink">
                {brand.name}
              </h1>
              <a
                href={`https://${brand.website}`}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-flex items-center gap-1 text-[11px] text-slate hover:text-ink"
              >
                {brand.website}
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </section>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-3 border-b border-border pb-4">
          <div className="flex flex-wrap gap-3">
            <Filter
              label={{ zh: "统计周期", en: "Date range" }}
              value={days}
              onChange={setDays}
              options={["7", "30", "90"].map((d) => [
                d,
                l({ zh: `近 ${d} 天`, en: `Last ${d} days` }),
              ])}
            />
            <Filter
              label={{ zh: "平台", en: "Platform" }}
              value={platform}
              onChange={setPlatform}
              options={[
                ["all", l({ zh: "全部可用平台", en: "All available platforms" })],
                ...platforms.map((p) => [p, p]),
              ]}
            />
            <Filter
              label={{ zh: "地区", en: "Region" }}
              value={region}
              onChange={setRegion}
              disabled={!regions.length}
              options={[
                [
                  "all",
                  l(
                    regions.length
                      ? { zh: "全部已覆盖地区", en: "All covered regions" }
                      : { zh: "地区数据暂不可用", en: "Region data unavailable" },
                  ),
                ],
                ...regions.map((r) => [r, r]),
              ]}
            />
          </div>
          <p className="text-[10px] text-muted">
            {end ? `${start} — ${end}` : "—"} ·{" "}
            {l({ zh: "各分析维度共享统计口径", en: "Shared scope across all tabs" })}
          </p>
        </div>
        <div role="status" className="mt-3 flex items-start gap-2 text-[11px] leading-5 text-muted">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <p>
            {l(
              data.status === "unsupported"
                ? {
                    zh: "尚无已验证的品牌社媒数据。指标、分布与摘要将在数据接入后展示；「—」代表未知，并非零。",
                    en: "Verified brand social data is unavailable. Metrics, distributions, and summaries await data coverage; — means unknown, not zero.",
                  }
                : {
                    zh: "统计基于可用的品牌相关内容；品牌提及不代表付费合作，缺失字段不计入指标。",
                    en: "Metrics use available brand-associated content. Mentions do not imply paid partnerships; missing fields are excluded.",
                  },
            )}
            {data.availablePlatforms && ` · ${data.availablePlatforms.join(" / ")}`}
          </p>
        </div>
        {data.status === "loading" ? (
          <div
            aria-label={l({ zh: "正在载入", en: "Loading" })}
            className="mt-5 grid animate-pulse gap-4 md:grid-cols-2"
          >
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-32 rounded-[14px] bg-page" />
            ))}
          </div>
        ) : data.status === "error" ? (
          <div className="py-20 text-center">
            <Empty title={{ zh: "报告数据暂时无法载入", en: "Report data could not be loaded" }} />
            <button
              type="button"
              onClick={() => setRetry((n) => n + 1)}
              className="mt-4 text-[12px] text-slate underline"
            >
              {l({ zh: "重试", en: "Retry" })}
            </button>
          </div>
        ) : (
          <div className="mt-5 space-y-5">
            {tab === "overview" && (
              <>
                <Metrics
                  items={[
                    [labels.contents, known ? contents.length : null],
                    [labels.engagement, known ? sumAvailable(contents.map(engagement)) : null],
                    [labels.creators, known ? filtered.creatorCount : null],
                    [labels.views, known ? sumAvailable(contents.map((c) => c.views)) : null],
                  ]}
                />
                <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
                  <Panel title={{ zh: "社媒表现趋势", en: "Social performance trend" }}>
                    <Trend contents={contents} start={start} end={end} days={Number(days)} />
                  </Panel>
                  <Panel title={{ zh: "平台分布", en: "Platform distribution" }}>
                    <Bars rows={distribution(contents.map((c) => c.platform))} />
                  </Panel>
                </div>
                <Summary contents={contents} creators={creators} />
              </>
            )}
            {tab === "marketing" && (
              <>
                <Panel title={{ zh: "平台策略", en: "Platform strategy" }}>
                  <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                    <Bars rows={distribution(contents.map((c) => c.platform))} />
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-[11px]">
                        <thead className="bg-page text-muted">
                          <tr>
                            {[
                              l({ zh: "平台", en: "Platform" }),
                              l(labels.contents),
                              l(labels.creators),
                              l(labels.engagement),
                              l(labels.views),
                            ].map((label) => (
                              <th key={label} className="p-3 font-normal">
                                {label}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {platforms
                            .filter((p) => platform === "all" || p === platform)
                            .map((p) => {
                              const posts = contents.filter((c) => c.platform === p);
                              const available = known && !!data.availablePlatforms?.includes(p);
                              return (
                                <tr key={p} className="border-b border-border text-slate">
                                  <td className="p-3">{p}</td>
                                  <td className="p-3">{format(available ? posts.length : null)}</td>
                                  <td className="p-3">
                                    {format(
                                      available
                                        ? new Set(posts.map((c) => c.creatorId)).size
                                        : null,
                                    )}
                                  </td>
                                  <td className="p-3">
                                    {format(available ? sumAvailable(posts.map(engagement)) : null)}
                                  </td>
                                  <td className="p-3">
                                    {format(
                                      available ? sumAvailable(posts.map((c) => c.views)) : null,
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Panel>
                <Panel title={{ zh: "关联创作者结构", en: "Associated creator structure" }}>
                  <div className="grid gap-5 md:grid-cols-3">
                    <Distribution
                      title={{ zh: "粉丝量级", en: "Creator tiers" }}
                      rows={distribution(creators.map((c) => tier(c.followers)))}
                    />
                    <Distribution
                      title={{ zh: "创作者垂类", en: "Creator categories" }}
                      rows={distribution(creators.map((c) => c.category))}
                    />
                    <Distribution
                      title={{ zh: "创作者地区", en: "Creator geography" }}
                      rows={distribution(creators.map((c) => c.region))}
                    />
                  </div>
                  <p className="mt-3 text-[10px] text-muted">
                    Nano 1K–10K · Micro 10K–100K · Mid-tier 100K–500K · Macro 500K–1M · Mega 1M+
                  </p>
                  <h3 className="mt-5 text-[13px] font-medium text-slate">
                    {l({ zh: "高表现关联创作者", en: "Top associated creators" })}
                  </h3>
                  <CreatorAssets creators={creators} contents={contents} compact />
                </Panel>
                <Panel title={{ zh: "内容策略", en: "Content strategy" }}>
                  <div className="grid gap-5 md:grid-cols-2">
                    <Distribution
                      title={{ zh: "内容主题分布", en: "Content themes" }}
                      rows={distribution(contents.map((c) => c.theme))}
                    />
                    <Distribution
                      title={{ zh: "内容形式分布", en: "Content formats" }}
                      rows={distribution(contents.map((c) => c.format))}
                    />
                  </div>
                  <h3 className="mt-5 text-[13px] font-medium text-slate">
                    {l({ zh: "高表现内容", en: "Top performing content" })}
                  </h3>
                  <ContentAssets contents={highPerformers} creators={creators} compact />
                </Panel>
                <Panel title={{ zh: "营销节奏", en: "Marketing rhythm" }}>
                  <Trend contents={contents} start={start} end={end} days={Number(days)} />
                  <p className="mt-3 text-[11px] text-muted">
                    {l({
                      zh: "发布数量的高峰不等于已开展付费营销活动。",
                      en: "Posting peaks do not establish paid campaign activity.",
                    })}
                  </p>
                </Panel>
              </>
            )}
            {tab === "signals" && (
              <>
                <Metrics
                  items={[
                    [
                      { zh: "新增品牌相关内容", en: "New contents" },
                      known ? contents.length : null,
                    ],
                    [{ zh: "首次观察到的创作者", en: "Newly observed creators" }, null],
                    [{ zh: "热门内容", en: "Trending contents" }, null],
                  ]}
                />
                <Panel title={{ zh: "近期营销动态", en: "Recent activity timeline" }}>
                  {contents.length ? (
                    <ol className="space-y-5 border-l border-border pl-5">
                      {[...contents]
                        .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
                        .slice(0, 10)
                        .map((c) => (
                          <li key={`${c.platform}:${c.id}`}>
                            <span className="text-[10px] text-muted">
                              {c.publishedAt.slice(0, 10)} ·{" "}
                              {l({ zh: "新增内容", en: "New content" })} · {c.platform}
                            </span>
                            <p className="mt-1 text-[13px] text-slate">{c.title}</p>
                            <SafeLink href={c.url}>
                              {l({ zh: "查看来源内容", en: "View source content" })}
                            </SafeLink>
                          </li>
                        ))}
                    </ol>
                  ) : (
                    <Empty
                      title={{
                        zh: "暂无有来源支持的市场动态",
                        en: "No source-backed activities available",
                      }}
                    />
                  )}
                </Panel>
                <Panel title={{ zh: "近期高互动内容", en: "Recent high-engagement content" }}>
                  <p className="mb-3 text-[10px] text-muted">
                    {l({
                      zh: "按当前周期内可用互动量排序，不预测热度。",
                      en: "Ranked by available engagement in this period; no popularity prediction.",
                    })}
                  </p>
                  <ContentAssets contents={highPerformers} creators={creators} compact />
                </Panel>
              </>
            )}
            {tab === "assets" && <MarketingAssets creators={creators} contents={contents} />}
          </div>
        )}
      </div>
    </main>
  );
}

function Filter({
  label,
  value,
  onChange,
  options,
  disabled = false,
}: {
  label: Text;
  value: string;
  onChange: (v: string) => void;
  options: string[][];
  disabled?: boolean;
}) {
  const l = useLoc();
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] text-muted">{l(label)}</span>
      <span className="relative block">
        <select
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 max-w-[230px] appearance-none rounded-[8px] border border-border bg-white pl-3 pr-8 text-[11px] text-slate outline-none focus:border-ring disabled:cursor-not-allowed disabled:text-muted"
        >
          {options.map(([id, text]) => (
            <option key={id} value={id}>
              {text}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted"
        />
      </span>
    </label>
  );
}
function Panel({ title, children }: { title: Text; children: ReactNode }) {
  const l = useLoc();
  return (
    <section className="rounded-[14px] border border-border bg-white p-5">
      <h2 className="mb-4 text-[15px] font-medium text-slate">{l(title)}</h2>
      {children}
    </section>
  );
}
function Empty({
  title = { zh: "当前筛选范围内暂无可用数据", en: "No available data in this scope" },
}: { title?: Text }) {
  const l = useLoc();
  return (
    <div className="flex min-h-[130px] flex-col items-center justify-center text-center">
      <BarChart3 aria-hidden className="h-5 w-5 text-muted" />
      <p className="mt-3 text-[11px] text-muted">{l(title)}</p>
    </div>
  );
}
function Metrics({ items }: { items: [Text, number | null][] }) {
  const l = useLoc();
  return (
    <div
      className={cn(
        "grid gap-3 sm:grid-cols-2",
        items.length === 3 ? "xl:grid-cols-3" : "xl:grid-cols-4",
      )}
    >
      {items.map(([label, value]) => (
        <article key={label.en} className="rounded-[13px] border border-border bg-white p-4">
          <p className="text-[11px] text-muted">{l(label)}</p>
          <p className="mt-3 text-[25px] font-medium text-slate">{format(value)}</p>
        </article>
      ))}
    </div>
  );
}
function Bars({ rows }: { rows: [string, number][] }) {
  if (!rows.length) return <Empty />;
  const total = rows.reduce((sum, [, n]) => sum + n, 0);
  return (
    <div className="space-y-4">
      {rows.map(([label, n]) => (
        <div key={label}>
          <div className="mb-2 flex justify-between text-[11px] text-slate">
            <span>{label}</span>
            <span>
              {format(n)} · {((n / total) * 100).toFixed(1)}%
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-page">
            <div
              className="h-full rounded-full bg-slate"
              style={{ width: `${(n / total) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
function Distribution({ title, rows }: { title: Text; rows: [string, number][] }) {
  const l = useLoc();
  return (
    <div>
      <h3 className="mb-4 text-[12px] font-medium text-slate">{l(title)}</h3>
      <Bars rows={rows} />
    </div>
  );
}

function Trend({
  contents,
  start,
  end,
  days,
}: { contents: InsightContent[]; start: string; end: string; days: number }) {
  const l = useLoc();
  const [metric, setMetric] = useState("volume");
  const grouped = new Map<string, number>();
  for (const c of contents) {
    const date = c.publishedAt.slice(0, 10);
    const offset = Math.floor((Date.parse(date) - Date.parse(start)) / 86400000);
    const bucket = days === 90 ? Math.floor(offset / 7) : offset;
    const key = String(bucket);
    const n = metric === "volume" ? 1 : engagement(c);
    if (n !== null) grouped.set(key, (grouped.get(key) ?? 0) + n);
  }
  const rows = [...grouped].map(([key, value]) => [Number(key), value]).sort((a, b) => a[0] - b[0]);
  const maximum = Math.max(1, ...rows.map(([, v]) => v));
  const buckets = days === 90 ? Math.ceil(days / 7) : days;
  return (
    <>
      <div className="mb-3 flex gap-2">
        {[
          ["volume", l(labels.contents)],
          ["engagement", l(labels.engagement)],
        ].map(([id, label]) => (
          <button
            key={id}
            type="button"
            aria-pressed={metric === id}
            onClick={() => setMetric(id)}
            className={cn(
              "rounded-[7px] px-2.5 py-1.5 text-[10px]",
              metric === id ? "bg-page text-ink" : "text-muted",
            )}
          >
            {label}
          </button>
        ))}
      </div>
      {!rows.length ? (
        <Empty title={{ zh: "尚无可用的时间序列", en: "No time-series data available" }} />
      ) : (
        <>
          <svg
            viewBox="0 0 560 170"
            role="img"
            aria-label={l({ zh: "社媒表现趋势", en: "Social performance trend" })}
            className="h-[180px] w-full"
          >
            <path
              d="M 30 10 V 145 H 545"
              stroke="currentColor"
              fill="none"
              className="text-border"
            />
            <polyline
              points={rows
                .map(
                  ([key, value]) =>
                    `${30 + (key / Math.max(1, buckets - 1)) * 510},${145 - (value / maximum) * 125}`,
                )
                .join(" ")}
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-slate"
            />
            {rows.map(([key, value]) => (
              <circle
                key={key}
                cx={30 + (key / Math.max(1, buckets - 1)) * 510}
                cy={145 - (value / maximum) * 125}
                r="3"
                fill="currentColor"
                className="text-slate"
              >
                <title>{`${key + 1}: ${value}`}</title>
              </circle>
            ))}
          </svg>
          <details className="text-[10px] text-muted">
            <summary className="cursor-pointer">
              {l({ zh: "查看趋势数据", en: "View trend data" })}
            </summary>
            {rows.map(([key, value]) => (
              <p key={key}>
                {l({ zh: days === 90 ? "周" : "日", en: days === 90 ? "Week" : "Day" })} {key + 1} ·{" "}
                {format(value)}
              </p>
            ))}
          </details>
        </>
      )}
      <div className="mt-2 flex justify-between text-[9px] text-muted">
        <span>{start}</span>
        <span>
          {l(days === 90 ? { zh: "按周统计", en: "Weekly" } : { zh: "按日统计", en: "Daily" })}
        </span>
        <span>{end}</span>
      </div>
    </>
  );
}
function Summary({
  contents,
  creators,
}: { contents: InsightContent[]; creators: AssociatedCreator[] }) {
  const l = useLoc();
  const findings = [
    { label: { zh: "平台", en: "Platform" }, rows: distribution(contents.map((c) => c.platform)) },
    {
      label: { zh: "创作者", en: "Creators" },
      rows: distribution(creators.map((c) => tier(c.followers))),
    },
    { label: { zh: "内容", en: "Content" }, rows: distribution(contents.map((c) => c.theme)) },
  ];
  return (
    <Panel title={{ zh: "品牌营销摘要", en: "Brand marketing summary" }}>
      <p className="flex items-center gap-2 text-[11px] leading-6 text-muted">
        <Sparkles className="h-4 w-4 shrink-0 text-brand" />
        {l(
          contents.length
            ? {
                zh: "以下特征直接归纳自当前筛选范围内的已验证数据。",
                en: "The following characteristics summarize verified data in the current scope.",
              }
            : {
                zh: "有足够的来源数据后，将展示平台、创作者与内容特征摘要。",
                en: "Platform, creator, and content characteristics will appear when source data is available.",
              },
        )}
      </p>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {findings.map(({ label, rows }) => (
          <div key={label.en}>
            <h3 className="text-[11px] font-medium text-slate">{l(label)}</h3>
            <p className="mt-2 text-[12px] text-muted">
              {rows.length ? `${rows[0][0]} · ${format(rows[0][1])}` : "—"}
            </p>
            {rows.length > 0 && (
              <p className="mt-1 text-[10px] text-muted">
                {l({
                  zh: "依据：当前筛选范围的分类统计",
                  en: "Evidence: category counts in this scope",
                })}
              </p>
            )}
          </div>
        ))}
      </div>
    </Panel>
  );
}
function SafeLink({ href, children }: { href: string; children: ReactNode }) {
  if (!/^https?:\/\//i.test(href))
    return <span className="text-[11px] text-muted">{children}</span>;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="mt-2 inline-flex items-center gap-1 text-[11px] text-slate hover:text-ink"
    >
      {children}
      <ArrowUpRight className="h-3 w-3" />
    </a>
  );
}

function MarketingAssets({
  creators,
  contents,
}: { creators: AssociatedCreator[]; contents: InsightContent[] }) {
  const l = useLoc();
  const [active, setActive] = useState("creators");
  return (
    <section>
      <div className="mb-4 flex gap-2">
        {[
          ["creators", l({ zh: "关联创作者", en: "Creators" })],
          ["contents", l({ zh: "关联内容", en: "Contents" })],
        ].map(([id, label]) => (
          <button
            key={id}
            type="button"
            aria-pressed={active === id}
            onClick={() => setActive(id)}
            className={cn(
              "inline-flex items-center gap-2 rounded-[8px] px-3 py-2 text-[12px]",
              active === id ? "bg-page text-ink" : "text-muted",
            )}
          >
            {id === "creators" ? (
              <UsersRound className="h-4 w-4" />
            ) : (
              <FileImage className="h-4 w-4" />
            )}
            {label}
          </button>
        ))}
      </div>
      {active === "creators" ? (
        <CreatorAssets creators={creators} contents={contents} />
      ) : (
        <ContentAssets contents={contents} creators={creators} />
      )}
    </section>
  );
}
function CreatorAssets({
  creators,
  contents,
  compact = false,
}: { creators: AssociatedCreator[]; contents: InsightContent[]; compact?: boolean }) {
  const l = useLoc();
  const [category, setCategory] = useState("all");
  const [followers, setFollowers] = useState("all");
  const [sort, setSort] = useState("engagement");
  const count = (c: AssociatedCreator) =>
    contents.filter((p) => p.platform === c.platform && p.creatorId === c.id);
  const total = (c: AssociatedCreator) => sumAvailable(count(c).map(engagement));
  const rows = creators
    .filter(
      (c) =>
        (category === "all" || c.category === category) &&
        (followers === "all" || tier(c.followers) === followers),
    )
    .sort((a, b) =>
      sort === "followers"
        ? (b.followers ?? -1) - (a.followers ?? -1)
        : sort === "contents"
          ? count(b).length - count(a).length
          : (total(b) ?? -1) - (total(a) ?? -1),
    );
  return (
    <>
      <div className="my-3 flex flex-wrap gap-3">
        {!compact && (
          <>
            <Filter
              label={{ zh: "粉丝量级", en: "Followers" }}
              value={followers}
              onChange={setFollowers}
              options={[
                ["all", l({ zh: "全部量级", en: "All tiers" })],
                ...["Nano", "Micro", "Mid-tier", "Macro", "Mega"].map((n) => [n, n]),
              ]}
            />
            <Filter
              label={{ zh: "垂类", en: "Category" }}
              value={category}
              onChange={setCategory}
              options={[
                ["all", l({ zh: "全部垂类", en: "All categories" })],
                ...distribution(creators.map((c) => c.category)).map(([c]) => [c, c]),
              ]}
            />
          </>
        )}
        <Filter
          label={{ zh: "排序", en: "Sort" }}
          value={sort}
          onChange={setSort}
          options={[
            ["followers", l({ zh: "粉丝量", en: "Followers" })],
            ["contents", l(labels.contents)],
            ["engagement", l(labels.engagement)],
          ]}
        />
      </div>
      <div className="overflow-x-auto rounded-[12px] border border-border">
        <table className="w-full whitespace-nowrap text-left text-[11px]">
          <thead className="bg-page text-muted">
            <tr>
              {[
                l({ zh: "创作者", en: "Creator" }),
                l({ zh: "平台", en: "Platform" }),
                l({ zh: "粉丝量", en: "Followers" }),
                l({ zh: "垂类", en: "Category" }),
                l(labels.contents),
                l(labels.engagement),
              ].map((s) => (
                <th key={s} className="p-3 font-normal">
                  {s}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(compact ? rows.slice(0, 5) : rows).map((c) => (
              <tr key={`${c.platform}:${c.id}`} className="border-t border-border text-slate">
                <td className="p-3">
                  <SafeLink href={c.profileUrl}>{c.name}</SafeLink>
                </td>
                <td className="p-3">{c.platform}</td>
                <td className="p-3">{format(c.followers)}</td>
                <td className="p-3">{c.category ?? "—"}</td>
                <td className="p-3">{count(c).length}</td>
                <td className="p-3">{format(total(c))}</td>
              </tr>
            ))}
            {!rows.length && (
              <tr>
                <td colSpan={6}>
                  <Empty
                    title={{ zh: "暂无已验证的关联创作者", en: "No verified associated creators" }}
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
function ContentAssets({
  contents,
  creators,
  compact = false,
}: { contents: InsightContent[]; creators: AssociatedCreator[]; compact?: boolean }) {
  const l = useLoc();
  const [sort, setSort] = useState("latest");
  const [theme, setTheme] = useState("all");
  const [formatFilter, setFormatFilter] = useState("all");
  const rows = contents
    .filter(
      (c) =>
        (theme === "all" || c.theme === theme) &&
        (formatFilter === "all" || c.format === formatFilter),
    )
    .sort((a, b) =>
      sort === "views"
        ? (b.views ?? -1) - (a.views ?? -1)
        : sort === "engagement"
          ? (engagement(b) ?? -1) - (engagement(a) ?? -1)
          : b.publishedAt.localeCompare(a.publishedAt),
    );
  return (
    <>
      {!compact && (
        <div className="mb-4 flex flex-wrap gap-3">
          <Filter
            label={{ zh: "形式", en: "Format" }}
            value={formatFilter}
            onChange={setFormatFilter}
            options={[
              ["all", l({ zh: "全部形式", en: "All formats" })],
              ...distribution(contents.map((c) => c.format)).map(([s]) => [s, s]),
            ]}
          />
          <Filter
            label={{ zh: "主题", en: "Theme" }}
            value={theme}
            onChange={setTheme}
            options={[
              ["all", l({ zh: "全部主题", en: "All themes" })],
              ...distribution(contents.map((c) => c.theme)).map(([s]) => [s, s]),
            ]}
          />
          <Filter
            label={{ zh: "排序", en: "Sort" }}
            value={sort}
            onChange={setSort}
            options={[
              ["latest", l({ zh: "最新发布", en: "Latest" })],
              ["views", l({ zh: "观看最多", en: "Most viewed" })],
              ["engagement", l({ zh: "互动最多", en: "Most engaged" })],
            ]}
          />
        </div>
      )}
      {rows.length ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {rows.map((c) => (
            <article
              key={`${c.platform}:${c.id}`}
              className="overflow-hidden rounded-[12px] border border-border"
            >
              {c.cover ? (
                <img
                  src={publicAsset(c.cover)}
                  alt={c.title}
                  className="h-36 w-full object-cover"
                />
              ) : (
                <div className="flex h-36 items-center justify-center bg-page">
                  <FileImage className="h-5 w-5 text-muted" />
                </div>
              )}
              <div className="p-4">
                <p className="text-[10px] text-muted">
                  {c.platform} · {c.publishedAt.slice(0, 10)}
                </p>
                <SafeLink href={c.url}>{c.title}</SafeLink>
                <p className="mt-2 text-[11px] text-muted">
                  {creators.find((a) => a.id === c.creatorId && a.platform === c.platform)?.name ??
                    "—"}{" "}
                  · {c.theme ?? "—"}
                </p>
                <p className="mt-3 text-[11px] text-slate">
                  {l(labels.views)} {format(c.views)} · {l(labels.engagement)}{" "}
                  {format(engagement(c))}
                </p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <Empty
          title={{ zh: "暂无已验证的品牌相关内容", en: "No verified brand-associated content" }}
        />
      )}
    </>
  );
}
