"use client";
import { useT } from "@/lib/i18n/use-i18n";
import { type DiscoverSections, useUIStore } from "@/lib/store/ui-store";
import { cn } from "@/lib/utils";
import {
  CalendarDays,
  ChartNoAxesCombined,
  FileText,
  Handshake,
  PanelLeftClose,
  PanelLeftOpen,
  Radar,
  Search,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  labelKey: string;
  icon: typeof Search;
  employee?: boolean;
};

type DiscoverArea = keyof DiscoverSections;
type DiscoverSectionId = DiscoverSections[DiscoverArea];
type UnifiedNavItem = NavItem & {
  area?: DiscoverArea;
  section?: DiscoverSectionId;
};

const unifiedNavItems: UnifiedNavItem[] = [
  { href: "/creators", labelKey: "nav.creatorAiSearch", icon: Sparkles, area: "creators", section: "ai-search" },
  { href: "/creators", labelKey: "nav.creatorDiscovery", icon: Search, area: "creators", section: "discovery" },
  { href: "/creators", labelKey: "nav.creatorOutreach", icon: Handshake, area: "creators", section: "outreach" },
  { href: "/campaigns", labelKey: "nav.campaigns", icon: FileText },
  { href: "/collaborations", labelKey: "nav.collaborations", icon: Handshake },
  { href: "/brand-insights", labelKey: "nav.brandInsights", icon: Radar, area: "brandRadar", section: "explore" },
  { href: "/brand-insights", labelKey: "nav.brandCompetitors", icon: ChartNoAxesCombined, area: "brandRadar", section: "competitors" },
  { href: "/creative", labelKey: "nav.creativeCalendar", icon: CalendarDays, area: "creative", section: "calendar" },
  { href: "/creative", labelKey: "nav.creativeTrends", icon: ChartNoAxesCombined, area: "creative", section: "trends" },
  { href: "/creative", labelKey: "nav.creativeAiTools", icon: Sparkles, area: "creative", section: "ai-tools" },
];

export function BusinessSidebar() {
  const pathname = usePathname();
  const t = useT();
  const discoverSections = useUIStore((s) => s.discoverSections);
  const setDiscoverSection = useUIStore((s) => s.setDiscoverSection);
  const setCreatorSearchTab = useUIStore((s) => s.setCreatorSearchTab);
  const collapsed = useUIStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const expanded = !collapsed;
  const selectDiscoverSection = (area: DiscoverArea, section: DiscoverSectionId) => {
    if (area === "creators") {
      setDiscoverSection("creators", section as DiscoverSections["creators"]);
      if (section === "ai-search") setCreatorSearchTab("ai");
      if (section === "cover-search") setCreatorSearchTab("cover");
    } else if (area === "brandRadar") {
      setDiscoverSection("brandRadar", section as DiscoverSections["brandRadar"]);
    } else {
      setDiscoverSection("creative", section as DiscoverSections["creative"]);
    }
  };

  return (
    <aside
      className={cn(
        "relative z-30 flex h-full flex-shrink-0 flex-col border-r border-border/35 bg-white transition-[width] duration-250 ease-out",
        collapsed ? "w-[64px]" : "w-[232px]",
      )}
    >
      {/* Brand */}
      <div
        className={cn(
          "flex h-16 flex-shrink-0 items-center",
          expanded ? "px-3" : "justify-center px-2",
        )}
      >
        <Link href="/creators" aria-label="Influx AI home" className={cn("flex min-w-0 items-center rounded-[8px] text-left transition-colors hover:bg-surface-warm", expanded ? "w-full gap-3 px-2 py-2" : "justify-center p-1")}>
          <span className={cn("flex shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#5A22FF,#D94EE8_52%,#4777FF)] text-white", expanded ? "h-8 w-8" : "h-7 w-7")}><Sparkles className="h-4 w-4" /></span>
          {expanded && <span className="min-w-0 flex-1 truncate text-[16px] font-semibold tracking-[-0.03em] text-navy">Influx AI</span>}
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-1.5 px-3 py-2">
        {unifiedNavItems.map((item) => {
          const active = item.area ? (item.href === "/creators"
            ? pathname.startsWith("/creators") || pathname.startsWith("/pool")
            : pathname === item.href || pathname.startsWith(`${item.href}/`))
            && discoverSections[item.area] === item.section : pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <NavLink
              key={item.area ? `${item.area}-${item.section}` : item.href}
              href={item.href}
              icon={<Icon className="h-[18px] w-[18px] flex-shrink-0" />}
              label={t(item.labelKey)}
              active={active}
              expanded={expanded}
              onClick={item.area && item.section ? () => selectDiscoverSection(item.area!, item.section!) : undefined}
            />
          );
        })}
      </nav>

      {/* Collapse / expand */}
      <div className="px-3 pb-3">
        <Tooltip label={t(collapsed ? "nav.expandSidebar" : "nav.collapseSidebar")} disabled={expanded}>
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label={t(collapsed ? "nav.expandSidebar" : "nav.collapseSidebar")}
            className={cn(
              "flex h-10 w-full items-center rounded-[8px] text-[12px] font-medium text-muted transition-colors hover:bg-surface-warm hover:text-ink",
              expanded ? "gap-2.5 px-3" : "justify-center",
            )}
          >
            {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
            {expanded && <span>{t("nav.collapseSidebar")}</span>}
          </button>
        </Tooltip>
      </div>

    </aside>
  );
}

function NavLink({
  href,
  icon,
  label,
  active,
  expanded,
  onClick,
  badge,
  dot,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  expanded: boolean;
  onClick?: () => void;
  badge?: number;
  dot?: boolean;
}) {
  return (
    <Tooltip label={label} disabled={expanded}>
      <Link
        href={href}
        onClick={onClick}
        className={cn(
          "relative flex h-10 items-center rounded-[8px] text-[14px] font-medium transition-colors",
          expanded ? "gap-3 px-3" : "justify-center",
          active ? "bg-soft-pink text-brand" : "text-slate hover:bg-[#F8F8FA] hover:text-ink",
        )}
      >
        {icon}
        {expanded && (
          <>
            <span className="flex-1 whitespace-nowrap">{label}</span>
            {badge ? (
              <span className="tabular rounded-full bg-brand px-1.5 text-[10px] font-semibold text-white">
                {badge}
              </span>
            ) : null}
            {dot && <span className="h-2 w-2 rounded-full bg-teal" />}
          </>
        )}
      </Link>
    </Tooltip>
  );
}

function Tooltip({
  label,
  disabled,
  children,
}: {
  label: string;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  if (disabled) return <>{children}</>;
  return (
    <div className="group/tt relative">
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2 whitespace-nowrap rounded-md bg-navy px-2.5 py-1.5 text-[12px] font-medium text-white opacity-0 shadow-elev transition-opacity duration-150 group-hover/tt:opacity-100"
      >
        {label}
      </span>
    </div>
  );
}
