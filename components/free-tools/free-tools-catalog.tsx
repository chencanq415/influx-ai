"use client";

import { type ToolCategoryId, type ToolIconId, freeTools, toolCategories } from "@/lib/free-tools";
import { useLoc } from "@/lib/i18n/use-i18n";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  AtSign,
  BarChart3,
  Calculator,
  FileCheck2,
  FileText,
  Hash,
  ImagePlay,
  Lightbulb,
  Mail,
  MessageSquareText,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  UserRound,
  UsersRound,
  WalletCards,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

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

export function FreeToolsCatalog() {
  const l = useLoc();
  const [category, setCategory] = useState<ToolCategoryId>("creator");
  const [query, setQuery] = useState("");
  const current = toolCategories.find((item) => item.id === category) ?? toolCategories[0];
  const tools = useMemo(
    () =>
      freeTools.filter(
        (tool) =>
          tool.category === category &&
          `${tool.title.zh} ${tool.title.en} ${tool.description.zh} ${tool.description.en}`
            .toLowerCase()
            .includes(query.toLowerCase().trim()),
      ),
    [category, query],
  );

  return (
    <section>
      <div className="flex flex-col gap-4 border-b border-border pb-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div
            className="flex flex-wrap gap-1.5"
            role="tablist"
            aria-label={l({ zh: "工具分类", en: "Tool categories" })}
          >
            {toolCategories.map((item) => {
              const active = category === item.id;
              const count = freeTools.filter((tool) => tool.category === item.id).length;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCategory(item.id)}
                  className={cn(
                    "inline-flex h-10 items-center gap-2 rounded-[10px] px-3.5 text-[12px] font-medium transition-colors",
                    active ? "bg-navy text-white" : "bg-page text-slate hover:text-ink",
                  )}
                >
                  <span>{l(item.label)}</span>
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.5 text-[9px]",
                      active ? "bg-white/15 text-white" : "bg-white text-muted",
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-[11px] text-muted">{l(current.description)}</p>
        </div>
        <label className="relative block w-full lg:w-[280px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={l({ zh: "搜索工具…", en: "Search tools…" })}
            className="h-10 w-full rounded-[10px] border border-border bg-white pl-9 pr-3 text-[11px] text-ink outline-none placeholder:text-muted focus:border-ring"
          />
        </label>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {tools.map((tool) => {
          const Icon = icons[tool.icon] ?? Sparkles;
          return (
            <Link
              key={tool.slug}
              href={`/creative/tools/${tool.slug}`}
              className="group flex min-h-[190px] flex-col rounded-[14px] border border-border bg-white p-5 transition-colors hover:border-border-strong hover:bg-[#FCFCFD]"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-page text-slate transition-colors group-hover:text-brand">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="flex items-center gap-1.5">
                  {tool.platform && (
                    <span className="rounded-full bg-page px-2 py-1 text-[8.5px] font-medium text-slate">
                      {tool.platform}
                    </span>
                  )}
                  <span className="rounded-full bg-soft-pink px-2 py-1 text-[8.5px] font-medium text-brand">
                    {tool.priority}
                  </span>
                </div>
              </div>
              <h2 className="mt-4 text-[14px] font-semibold tracking-[-0.01em] text-ink">
                {l(tool.title)}
              </h2>
              <p className="mt-2 line-clamp-2 text-[10.5px] leading-5 text-slate">
                {l(tool.description)}
              </p>
              <span className="mt-auto flex items-center gap-1 pt-4 text-[10.5px] font-medium text-slate group-hover:text-ink">
                {l({ zh: "打开工具", en: "Open tool" })}
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          );
        })}
      </div>
      {tools.length === 0 && (
        <div className="py-20 text-center text-[11px] text-muted">
          {l({ zh: "没有匹配的工具", en: "No matching tools" })}
        </div>
      )}
    </section>
  );
}
