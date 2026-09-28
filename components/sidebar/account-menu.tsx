"use client";
import {
  ChevronsUpDown,
  LogOut,
  ScrollText,
  Settings,
  WandSparkles,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAuthStore } from "@/lib/account/auth-store";
import { useT } from "@/lib/i18n/use-i18n";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface AccountMenuProps {
  collapsed?: boolean;
  compact?: boolean;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}

export function AccountMenu({ collapsed = false, compact = false, side = "top", align = "start" }: AccountMenuProps) {
  const t = useT();
  const router = useRouter();
  const currentUser = useAuthStore((state) => state.currentUser);
  const logout = useAuthStore((state) => state.logout);
  const workspaceName = currentUser?.workspaceName ?? "Demo Workspace";
  const email = currentUser?.email ?? "demo@influx-ai.app";
  const initials = (currentUser?.name ?? "Influx AI")
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex w-full items-center gap-2.5 rounded-[10px] border border-transparent bg-white px-2.5 py-2 text-left transition-colors hover:bg-[#FAFAFA]",
            compact && "h-9 w-9 justify-center rounded-full p-0 hover:bg-[#FAFAFA]",
            collapsed && "h-full justify-center px-0 py-0",
          )}
        >
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#5B3A24] text-[12px] font-bold text-white">
            {initials}
          </div>
          {!collapsed && !compact && (
            <>
              <div className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-medium text-ink">{workspaceName}</span>
                <div className="truncate text-[10.5px] text-muted">{email}</div>
              </div>
              <ChevronsUpDown className="h-3.5 w-3.5 flex-shrink-0 text-muted" />
            </>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent side={side} align={align} sideOffset={10} className="w-[280px] p-2">
        {/* Identity row */}
        <div className="flex items-center gap-2.5 px-2 py-2">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#5B3A24] text-[13px] font-bold text-white">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <span className="block truncate text-[14px] font-medium text-ink">{workspaceName}</span>
            <div className="truncate text-[11px] text-muted">{email}</div>
          </div>
        </div>

        <div className="my-1 h-px bg-border" />

        <MenuItem
          icon={<Settings className="h-3.5 w-3.5" />}
          label={t("account.accountSettings")}
          onClick={() => router.push("/settings")}
        />
        <MenuItem icon={<WandSparkles className="h-3.5 w-3.5" />} label={t("account.productUpdates")} onClick={() => router.push("/settings?tab=updates")} />
        <MenuItem icon={<ScrollText className="h-3.5 w-3.5" />} label={t("account.userAgreement")} onClick={() => router.push("/settings?tab=agreement")} />

        <div className="my-1 h-px bg-border" />

        <MenuItem
          icon={<LogOut className="h-3.5 w-3.5" />}
          label={t("account.logout")}
          onClick={() => {
            logout();
            router.replace("/login");
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

function MenuItem({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-2 rounded-[8px] px-3 py-2.5 text-[13px] text-ink outline-none transition-colors hover:bg-[#FAFAFA] focus-visible:bg-[#FAFAFA]"
    >
      <span className="text-slate">{icon}</span>
      <span className="flex-1 text-left">{label}</span>
    </button>
  );
}
