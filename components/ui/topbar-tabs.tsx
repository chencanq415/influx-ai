"use client";

import { cn } from "@/lib/utils";

type TopbarTab = {
  id: string;
  label: string;
};

export function TopbarTabs({
  tabs,
  activeId,
  onSelect,
  ariaLabel,
}: {
  tabs: TopbarTab[];
  activeId: string;
  onSelect: (id: string) => void;
  ariaLabel: string;
}) {
  return (
    <nav className="flex h-16 min-w-0 items-center gap-6" aria-label={ariaLabel}>
      {tabs.map((tab) => {
        const active = tab.id === activeId;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelect(tab.id)}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex h-9 items-center rounded-[8px] text-[15px] tracking-[-0.01em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/15",
              active
                ? "font-semibold text-ink"
                : "font-medium text-muted hover:text-slate",
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}
