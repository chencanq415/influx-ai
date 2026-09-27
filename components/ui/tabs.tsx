"use client";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

export const Tabs = TabsPrimitive.Root;

export const TabsList = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) => (
  <TabsPrimitive.List
    className={cn(
      "inline-flex h-10 items-end gap-5 border-b border-border bg-transparent p-0 text-slate",
      className,
    )}
    {...props}
  />
);

export const TabsTrigger = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) => (
  <TabsPrimitive.Trigger
    className={cn(
      "relative inline-flex h-10 items-center justify-center whitespace-nowrap px-0 text-[14px] font-medium transition-colors hover:text-ink data-[state=active]:font-semibold data-[state=active]:text-ink after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:scale-x-0 after:bg-brand after:transition-transform data-[state=active]:after:scale-x-100",
      className,
    )}
    {...props}
  />
);

export const TabsContent = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) => (
  <TabsPrimitive.Content className={cn("mt-4 focus-visible:outline-none", className)} {...props} />
);
