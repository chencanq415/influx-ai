"use client";

import { useEffect, useRef, useState } from "react";
import {
  FileCheck2,
  UploadCloud,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLoc } from "@/lib/i18n/use-i18n";
import { useUIStore } from "@/lib/store/ui-store";

const dimensions = [
  {
    title: { zh: "品牌安全与合规", en: "Brand safety & compliance" },
    score: 85,
    items: [
      { zh: "商业合作声明是否清晰", en: "Clear paid partnership disclosure" },
      { zh: "品牌及竞品露出检查", en: "Brand and competitor placement" },
      { zh: "宣传措辞与音乐授权", en: "Claims and music rights" },
    ],
  },
  {
    title: { zh: "合作要求匹配", en: "Campaign requirements" },
    score: 90,
    items: [
      { zh: "产品卖点与必要信息", en: "Product benefits and required information" },
      { zh: "商品展示与行动引导", en: "Product demonstration and CTA" },
      { zh: "必选话题与发布时间", en: "Required hashtags and publishing date" },
    ],
  },
  {
    title: { zh: "画面与技术质量", en: "Visual & technical quality" },
    score: 95,
    items: [
      { zh: "画面清晰度与构图", en: "Clarity and composition" },
      { zh: "光线、收音与字幕", en: "Lighting, audio, and subtitles" },
      { zh: "达人表达与剪辑节奏", en: "Creator delivery and pacing" },
    ],
  },
  {
    title: { zh: "内容吸引力", en: "Content engagement" },
    score: 82,
    items: [
      { zh: "前三秒吸引力", en: "Opening hook" },
      { zh: "真实体验与产品证据", en: "Authentic experience and product proof" },
      { zh: "互动引导与观看节奏", en: "Interaction prompts and retention" },
    ],
  },
];

export function ContentReviewWorkspace() {
  const l = useLoc();
  const tab = useUIStore((s) => s.toolReviewTab);
  const setTab = useUIStore((s) => s.setToolReviewTab);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [caption, setCaption] = useState("");
  const [brief, setBrief] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  const [feedback, setFeedback] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [submission, setSubmission] = useState<{
    file: File | null;
    caption: string;
    brief: string;
  } | null>(null);
  useEffect(() => {
    setTab("upload");
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [setTab]);
  const displayedFile = tab === "results" ? (submission?.file ?? null) : file;
  useEffect(() => {
    if (!displayedFile) {
      setPreview("");
      return;
    }
    const url = URL.createObjectURL(displayedFile);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [displayedFile]);

  const selectFile = (next: File | undefined) => {
    if (!next) return;
    if (!next.type.startsWith("image/") && !next.type.startsWith("video/")) {
      setError(l({ zh: "请上传图片或视频作品。", en: "Please upload an image or video." }));
      return;
    }
    if (next.size > 100 * 1024 * 1024) {
      setError(l({ zh: "文件不能超过 100 MB。", en: "Files must be under 100 MB." }));
      return;
    }
    setFile(next);
    setError("");
  };
  const submit = () => {
    if (!file && !caption.trim()) {
      setError(
        l({
          zh: "请上传作品或填写作品文案后提交。",
          en: "Upload content or add a caption before submitting.",
        }),
      );
      return;
    }
    setError("");
    setBusy(true);
    const next = { file, caption, brief };
    timer.current = setTimeout(() => {
      setSubmission(next);
      setBusy(false);
      setReady(true);
      setTab("results");
      setFeedback(
        l({
          zh: "请在开头补充清晰的商业合作标识，确认文案包含必选话题，并突出产品的真实使用场景。",
          en: "Add a clear partnership disclosure at the beginning, confirm required hashtags, and highlight authentic product use.",
        }),
      );
    }, 1000);
  };
  const media =
    preview && displayedFile ? (
      displayedFile.type.startsWith("video/") ? (
        <video
          src={preview}
          controls
          className="max-h-[560px] w-full rounded-[10px] bg-page object-contain"
        />
      ) : (
        <img
          src={preview}
          alt={l({ zh: "待审核作品", en: "Submitted content" })}
          className="max-h-[560px] w-full rounded-[10px] object-contain"
        />
      )
    ) : (
      <div className="flex min-h-[180px] items-center justify-center rounded-[10px] bg-page text-[12px] text-muted">
        {l({ zh: "文案作品", en: "Text submission" })}
      </div>
    );
  const panel = "rounded-[14px] border border-border bg-white p-5";
  return (
    <main className="min-h-full bg-surface px-6 py-5 lg:px-8">
      <div className="mx-auto max-w-[1400px]">
        {tab === "upload" ? (
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.8fr)]">
            <form
              className={panel}
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}
            >
              <div className="flex items-center gap-2">
                <FileCheck2 className="h-5 w-5 text-brand" />
                <h1 className="text-[22px] font-semibold text-ink">
                  {l({ zh: "AI 审稿", en: "AI Content Review" })}
                </h1>
              </div>
              <p className="mt-2 text-[12px] leading-6 text-muted">
                {l({
                  zh: "上传达人作品，补充文案与合作要求，查看多维度审核结果。",
                  en: "Upload creator content, add a caption and requirements, and review the results by dimension.",
                })}
              </p>
              <label
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (!busy) selectFile(e.dataTransfer.files[0]);
                }}
                className="mt-5 flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-[12px] border border-dashed border-border-strong p-5 text-center focus-within:ring-2 focus-within:ring-ring"
              >
                <UploadCloud className="h-7 w-7 text-slate" />
                <span className="mt-3 text-[13px] font-medium text-slate">
                  {file?.name ??
                    l({ zh: "点击上传或拖入作品", en: "Click to upload or drop content" })}
                </span>
                <span className="mt-2 text-[11px] text-muted">
                  {l({ zh: "图片 / 视频 · 最大 100 MB", en: "Image / video · Up to 100 MB" })}
                </span>
                <input
                  aria-label={l({ zh: "上传作品", en: "Upload content" })}
                  type="file"
                  accept="image/*,video/*"
                  disabled={busy}
                  onChange={(e) => selectFile(e.target.files?.[0])}
                  className="sr-only"
                />
              </label>
              {file && (
                <div className="mt-4">
                  {media}
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => setFile(null)}
                    className="mt-2 text-[11px] text-slate hover:text-ink"
                  >
                    {l({ zh: "移除作品", en: "Remove content" })}
                  </button>
                </div>
              )}
              <label className="mt-5 block text-[12px] font-medium text-slate">
                {l({ zh: "作品文案", en: "Submission caption" })}
                <textarea
                  disabled={busy}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder={l({
                    zh: "粘贴发布文案、话题标签或口播内容…",
                    en: "Paste the caption, hashtags, or spoken script…",
                  })}
                  className="mt-2 min-h-[120px] w-full rounded-[10px] border border-border p-3 text-[12px] font-normal outline-none focus:border-ring"
                />
              </label>
              <label className="mt-4 block text-[12px] font-medium text-slate">
                {l({
                  zh: "品牌与合作要求（可选）",
                  en: "Brand and campaign requirements (optional)",
                })}
                <textarea
                  disabled={busy}
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  placeholder={l({
                    zh: "品牌、产品卖点、必选话题、商业声明及交付要求…",
                    en: "Brand, key benefits, required hashtags, disclosure, and deliverables…",
                  })}
                  className="mt-2 min-h-[100px] w-full rounded-[10px] border border-border p-3 text-[12px] font-normal outline-none focus:border-ring"
                />
              </label>
              {error && (
                <p role="alert" className="mt-3 text-[12px] text-destructive">
                  {error}
                </p>
              )}
              <Button type="submit" disabled={busy} className="mt-5">
                {busy ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                {l(
                  busy
                    ? { zh: "正在生成审核预览…", en: "Preparing review preview…" }
                    : { zh: "提交审核", en: "Submit for review" },
                )}
              </Button>
            </form>
            <aside className="pt-3">
              <h2 className="text-[16px] font-medium text-slate">
                {l({ zh: "审核关注什么", en: "What the review covers" })}
              </h2>
              <div className="mt-5 space-y-5">
                {dimensions.map((d, i) => (
                  <div key={d.title.en} className="flex gap-3">
                    <span className="text-[12px] text-muted">0{i + 1}</span>
                    <div>
                      <p className="text-[13px] font-medium text-slate">{l(d.title)}</p>
                      <p className="mt-1 text-[11px] leading-5 text-muted">
                        {l(d.items[0])} · {l(d.items[1])}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-[11px] leading-5 text-muted">
                {l({
                  zh: "当前为 Demo：提交后展示示例评分与建议，尚未接入真实 AI 图片、视频审核。",
                  en: "Demo: submissions show illustrative scores and guidance. Live AI media review is not connected yet.",
                })}
              </p>
            </aside>
          </div>
        ) : !ready ? (
          <div className="py-24 text-center">
            <FileCheck2 className="mx-auto h-8 w-8 text-muted" />
            <p className="mt-4 text-[14px] text-slate">
              {l({
                zh: "提交作品后，审核结果会展示在这里。",
                en: "Submit content to see review results here.",
              })}
            </p>
            <Button className="mt-5" onClick={() => setTab("upload")}>
              {l({ zh: "上传作品", en: "Upload content" })}
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-[11px] text-muted">
                {l({
                  zh: "示例审核结果 · 以下评分仅用于演示，未对作品执行真实 AI 分析",
                  en: "Illustrative review · Scores are demo examples; no live AI analysis was performed",
                })}
              </p>
              <button
                onClick={() => setTab("upload")}
                type="button"
                className="text-[12px] text-slate hover:text-ink"
              >
                {l({ zh: "修改作品 / 重新审核", en: "Edit content / Review again" })}
              </button>
            </div>
            <div className="grid items-start gap-5 xl:grid-cols-[minmax(280px,0.85fr)_minmax(0,1.4fr)]">
              <section className={panel}>
                <h2 className="mb-4 text-[14px] font-medium text-slate">
                  {l({ zh: "提交的作品", en: "Submitted content" })}
                </h2>
                {media}
                <p className="mt-3 break-all text-[11px] text-muted">{submission?.file?.name}</p>
                <h3 className="mt-5 text-[12px] font-medium text-slate">
                  {l({ zh: "发布文案", en: "Caption" })}
                </h3>
                <p className="mt-2 whitespace-pre-wrap text-[12px] leading-6 text-muted">
                  {submission?.caption || l({ zh: "未填写", en: "Not provided" })}
                </p>
                {submission?.brief && (
                  <>
                    <h3 className="mt-5 text-[12px] font-medium text-slate">
                      {l({ zh: "合作要求", en: "Requirements" })}
                    </h3>
                    <p className="mt-2 whitespace-pre-wrap text-[12px] leading-6 text-muted">
                      {submission.brief}
                    </p>
                  </>
                )}
              </section>
              <div className="space-y-4">
                <section className={`${panel} flex items-center gap-5`}>
                  <div className="relative h-24 w-24 shrink-0">
                    <svg
                      viewBox="0 0 100 100"
                      className="h-full w-full -rotate-90"
                      aria-label={l({ zh: "示例综合评分 88 分", en: "Example overall score: 88" })}
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke="currentColor"
                        className="text-border"
                        strokeWidth="7"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke="currentColor"
                        className="text-brand"
                        strokeWidth="7"
                        strokeDasharray="264"
                        strokeDashoffset="32"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-[26px] font-semibold text-ink">88</span>
                      <span className="text-[10px] text-muted">/ 100</span>
                    </div>
                  </div>
                  <div>
                    <h1 className="text-[20px] font-semibold text-ink">
                      {l({ zh: "作品综合审核", en: "Overall content review" })}
                    </h1>
                    <p className="mt-2 flex items-center gap-1.5 text-[12px] text-slate">
                      <AlertCircle className="h-4 w-4 text-warning" />
                      {l({ zh: "示例结论：建议小幅修改", en: "Example verdict: minor revisions" })}
                    </p>
                    <p className="mt-2 text-[11px] text-muted">
                      {l({
                        zh: "发布前重点确认商业声明与合作要求。",
                        en: "Confirm disclosure and campaign requirements before publishing.",
                      })}
                    </p>
                  </div>
                </section>
                <div className="grid gap-4 md:grid-cols-2">
                  {dimensions.map((d) => (
                    <section key={d.title.en} className={panel}>
                      <div className="flex items-center justify-between gap-3">
                        <h2 className="text-[13px] font-medium text-slate">{l(d.title)}</h2>
                        <span className="text-[13px] text-slate">{d.score}%</span>
                      </div>
                      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-page">
                        <div
                          className="h-full rounded-full bg-slate"
                          style={{ width: `${d.score}%` }}
                        />
                      </div>
                      <ul className="mt-4 space-y-3">
                        {d.items.map((item, i) => (
                          <li
                            key={item.en}
                            className="flex items-center gap-2 text-[11px] text-muted"
                          >
                            {i === 2 ? (
                              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                            ) : (
                              <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                            )}
                            {l(item)}
                          </li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
                <section className={panel}>
                  <h2 className="flex items-center gap-2 text-[14px] font-medium text-slate">
                    <Sparkles className="h-4 w-4 text-brand" />
                    {l({ zh: "修改建议", en: "Recommended revisions" })}
                  </h2>
                  <ol className="mt-4 space-y-3 text-[12px] leading-6 text-muted">
                    <li>
                      {l({
                        zh: "1. 在作品开头和发布文案中清晰标注商业合作。",
                        en: "1. Clearly disclose the partnership in the opening and caption.",
                      })}
                    </li>
                    <li>
                      {l({
                        zh: "2. 对照 Brief 确认必选话题、产品卖点和 CTA。",
                        en: "2. Confirm required hashtags, key benefits, and CTA against the brief.",
                      })}
                    </li>
                    <li>
                      {l({
                        zh: "3. 补充真实使用场景，核实功效表述及音乐授权。",
                        en: "3. Add authentic usage context and verify claims and music rights.",
                      })}
                    </li>
                  </ol>
                  <label className="mt-5 block text-[12px] font-medium text-slate">
                    {l({ zh: "给达人的反馈（可编辑）", en: "Creator feedback (editable)" })}
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      className="mt-2 min-h-[100px] w-full rounded-[10px] border border-border p-3 text-[12px] font-normal leading-6 outline-none focus:border-ring"
                    />
                  </label>
                  <Button
                    variant="outline"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(feedback);
                        setError(l({ zh: "反馈已复制", en: "Feedback copied" }));
                      } catch {
                        setError(
                          l({
                            zh: "请选中反馈文字手动复制",
                            en: "Select the feedback text to copy manually",
                          }),
                        );
                      }
                    }}
                    className="mt-3"
                  >
                    {l({ zh: "复制反馈", en: "Copy feedback" })}
                  </Button>
                  <p role="status" className="mt-2 text-[11px] text-muted">
                    {error}
                  </p>
                </section>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
