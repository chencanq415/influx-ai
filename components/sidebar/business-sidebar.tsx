"use client";
import { useT } from "@/lib/i18n/use-i18n";
import { type DiscoverSections, useUIStore } from "@/lib/store/ui-store";
import { cn } from "@/lib/utils";
import {
  CalendarDays,
  ChartNoAxesCombined,
  Check,
  ChevronDown,
  FileText,
  Handshake,
  LayoutDashboard,
  PanelLeftClose,
  PanelLeftOpen,
  Palette,
  Radar,
  Rocket,
  Search,
  Smile,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";

type NavItem = {
  href: string;
  labelKey: string;
  icon: typeof Search;
  employee?: boolean;
};

type DiscoverArea = keyof DiscoverSections;
type DiscoverSectionId = DiscoverSections[DiscoverArea];
type DiscoverNavItem = NavItem & {
  area: DiscoverArea;
  section: DiscoverSectionId;
};

const campaignNavItems: NavItem[] = [
  { href: "/dashboard", labelKey: "nav.dashboard", icon: LayoutDashboard },
  { href: "/campaigns", labelKey: "nav.campaigns", icon: FileText },
  { href: "/creators", labelKey: "nav.creators", icon: Search },
  { href: "/collaborations", labelKey: "nav.collaborations", icon: Handshake },
  { href: "/insights", labelKey: "nav.insights", icon: ChartNoAxesCombined },
  { href: "/creative", labelKey: "nav.creative", icon: Palette },
  { href: "/brand-insights", labelKey: "nav.brandInsights", icon: Radar },
  {
    href: "/employees",
    labelKey: "nav.employees",
    icon: Smile,
    employee: true,
  },
];

const discoverNavItems: DiscoverNavItem[] = [
  { href: "/creators", labelKey: "nav.creatorAiSearch", icon: Sparkles, area: "creators", section: "ai-search" },
  { href: "/creators", labelKey: "nav.creatorDiscovery", icon: Search, area: "creators", section: "discovery" },
  { href: "/creators", labelKey: "nav.creatorOutreach", icon: Handshake, area: "creators", section: "outreach" },
  { href: "/brand-insights", labelKey: "nav.brandInsights", icon: Radar, area: "brandRadar", section: "explore" },
  { href: "/brand-insights", labelKey: "nav.brandCompetitors", icon: ChartNoAxesCombined, area: "brandRadar", section: "competitors" },
  { href: "/creative", labelKey: "nav.creativeCalendar", icon: CalendarDays, area: "creative", section: "calendar" },
  { href: "/creative", labelKey: "nav.creativeTrends", icon: ChartNoAxesCombined, area: "creative", section: "trends" },
  { href: "/creative", labelKey: "nav.creativeAiTools", icon: Sparkles, area: "creative", section: "ai-tools" },
];

export function BusinessSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useT();
  const productMode = useUIStore((s) => s.productMode);
  const setProductMode = useUIStore((s) => s.setProductMode);
  const discoverSections = useUIStore((s) => s.discoverSections);
  const setDiscoverSection = useUIStore((s) => s.setDiscoverSection);
  const setCreatorSearchTab = useUIStore((s) => s.setCreatorSearchTab);
  const collapsed = useUIStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const expanded = !collapsed;

  useEffect(() => {
    const savedMode = window.localStorage.getItem("creatiscout-product-mode");
    if (savedMode === "discover" || savedMode === "campaign") {
      setProductMode(savedMode);
    }
  }, [setProductMode]);

  const changeProductMode = (mode: "discover" | "campaign") => {
    if (mode === productMode) return;
    setProductMode(mode);
    window.localStorage.setItem("creatiscout-product-mode", mode);
    if (mode === "discover") {
      setDiscoverSection("creators", "ai-search");
    }
    router.push(mode === "discover" ? "/creators" : "/dashboard");
  };

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
      {/* Brand and product switcher */}
      <div
        className={cn(
          "flex h-16 flex-shrink-0 items-center",
          expanded ? "px-3" : "justify-center px-2",
        )}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              aria-label="Switch CreatiScout mode"
              className={cn(
                "flex min-w-0 items-center rounded-[8px] text-left transition-colors hover:bg-surface-warm",
                expanded ? "w-full gap-3 px-2 py-2" : "justify-center p-1",
              )}
            >
              <span className={cn("flex shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#5A22FF,#D94EE8_52%,#4777FF)] text-white", expanded ? "h-8 w-8" : "h-7 w-7")}><Sparkles className="h-4 w-4" /></span>
              {expanded && (
                <>
                  <span className="min-w-0 flex-1 truncate text-[16px] font-semibold tracking-[-0.03em] text-navy">
                    Infux AI
                  </span>
                  <ChevronDown className="h-3.5 w-3.5 flex-shrink-0 text-muted" />
                </>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side={expanded ? "bottom" : "right"}
            align="start"
            className="w-[244px] p-1.5"
          >
            {(["discover", "campaign"] as const).map((mode) => {
              const selected = productMode === mode;
              return (
                <DropdownMenuItem
                  key={mode}
                  onSelect={() => changeProductMode(mode)}
                  className={cn(
                    "items-start px-2.5 py-2.5",
                    mode === "campaign" &&
                      "hover:bg-[#F2F3F5] data-[highlighted]:bg-[#F2F3F5]",
                  )}
                >
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1.5 text-[12px] font-semibold text-ink">
                      <span>{mode === "discover" ? "Discover" : "Campaign"}</span>
                      {mode === "campaign" && (
                        <>
                          <Sparkles className="h-3 w-3 text-brand" />
                          <span className="rounded-[4px] bg-soft-pink px-1.5 py-0.5 text-[7.5px] font-semibold uppercase tracking-[0.08em] text-brand">
                            Beta
                          </span>
                        </>
                      )}
                    </span>
                    <span className="mt-0.5 block text-[9.5px] leading-4 text-muted">
                      {t(mode === "discover" ? "nav.discoverDescription" : "nav.campaignDescription")}
                    </span>
                  </span>
                  {selected && <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-slate" />}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-1.5 px-3 py-2">
        {productMode === "discover" ? discoverNavItems.map((item) => {
          const active = (item.href === "/creators"
            ? pathname.startsWith("/creators") || pathname.startsWith("/pool")
            : pathname === item.href || pathname.startsWith(`${item.href}/`))
            && discoverSections[item.area] === item.section;
          const Icon = item.icon;
          return (
            <NavLink
              key={`${item.area}-${item.section}`}
              href={item.href}
              icon={<Icon className="h-[18px] w-[18px] flex-shrink-0" />}
              label={t(item.labelKey)}
              active={active}
              expanded={expanded}
              onClick={() => selectDiscoverSection(item.area, item.section)}
            />
          );
        }) : campaignNavItems.map((item) => {
          const active = item.employee
            ? pathname.startsWith("/employees") || pathname.startsWith("/employee")
            : item.href === "/creators"
              ? pathname.startsWith("/creators") || pathname.startsWith("/pool")
              : item.href === "/ai-tools"
                ? pathname.startsWith("/ai-tools") ||
                  pathname.startsWith("/tracking") ||
                  pathname.startsWith("/context-lab")
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <NavLink
              key={item.href}
              href={item.href}
              icon={<Icon className="h-[18px] w-[18px] flex-shrink-0" />}
              label={t(item.labelKey)}
              active={active}
              expanded={expanded}
              dot={item.employee}
            />
          );
        })}
      </nav>

      {/* Onboarding — separate from the main navigation */}
      {productMode === "campaign" && <div className={cn("border-t border-border/45", expanded ? "px-3 py-3" : "px-2 py-2.5")}>
        <Tooltip label={t("nav.onboarding")} disabled={expanded}>
          <Link
            href="/onboarding"
            className={cn(
              "group flex min-h-10 w-full items-center rounded-[8px] border transition-colors",
              expanded ? "gap-2.5 px-2.5 py-2" : "h-10 justify-center px-0",
              pathname.startsWith("/onboarding")
                ? "border-[#BCAEFF] bg-soft-pink text-brand"
                : "border-border bg-surface text-slate hover:border-border-strong hover:text-ink",
            )}
          >
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-[7px] bg-[#F2F3F5] text-ink">
              <Rocket className="h-3.5 w-3.5" />
            </span>
            {expanded && (
              <span className="min-w-0 flex-1 text-left">
                <span className="block truncate text-[11.5px] font-semibold">
                  {t("nav.onboarding")}
                </span>
                <span className="mt-0.5 block text-[8.5px] text-muted">
                  {t("nav.onboardingHint")}
                </span>
              </span>
            )}
          </Link>
        </Tooltip>
      </div>}

      {/* Collapse / expand */}
      <div className={cn("px-3 pb-3", productMode === "campaign" && "pt-1")}>
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
