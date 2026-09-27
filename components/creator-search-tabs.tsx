"use client";

import { useLoc } from "@/lib/i18n/use-i18n";
import { type CreatorSearchTab, useUIStore } from "@/lib/store/ui-store";
import { TopbarTabs } from "@/components/ui/topbar-tabs";

const tabs: { id: CreatorSearchTab; label: { zh: string; en: string } }[] = [
  { id: "ai", label: { zh: "AI 搜索", en: "AI Search" } },
  { id: "cover", label: { zh: "封面搜索", en: "Cover Search" } },
  { id: "skill", label: { zh: "Skill", en: "Skill" } },
  { id: "chrome", label: { zh: "插件", en: "Extension" } },
];

export function CreatorSearchTabs() {
  const l = useLoc();
  const activeTab = useUIStore((state) => state.creatorSearchTab);
  const setActiveTab = useUIStore((state) => state.setCreatorSearchTab);

  return <TopbarTabs tabs={tabs.map(({ id, label }) => ({ id, label: l(label) }))} activeId={activeTab} onSelect={(id) => setActiveTab(id as CreatorSearchTab)} ariaLabel={l({ zh: "AI 搜索功能", en: "AI search tools" })} />;
}
