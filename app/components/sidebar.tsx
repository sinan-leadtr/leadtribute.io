"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  ImageIcon,
  LayoutDashboard,
  Megaphone,
  PanelLeftClose,
  PanelLeftOpen,
  Plug,
  Settings,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/integrations", label: "Data Sources", icon: Plug },
  { href: "/dashboard", label: "Campaigns", icon: Megaphone },
  { href: "/dashboard", label: "Creative Analysis", icon: ImageIcon },
  { href: "/dashboard", label: "Reporting", icon: FileText },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar({ planLabel }: { planLabel?: string } = {}) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`hidden h-screen shrink-0 flex-col border-r border-zinc-200 bg-white transition-all duration-300 ease-in-out sm:flex ${
        isCollapsed ? "w-20 px-3" : "w-64 px-4"
      }`}
    >
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto py-6">
        <Link href="/dashboard" className="mb-8 flex items-center gap-2 px-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-black text-white">
            <span className="text-lg font-semibold">LT</span>
          </div>
          {!isCollapsed && (
            <div className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold tracking-wide text-zinc-900">
                Leadtribute
              </span>
              <span className="block truncate text-xs text-zinc-500">
                {planLabel ?? "Performance Suite"}
              </span>
            </div>
          )}
        </Link>

        <nav className="flex-1 space-y-1 text-sm font-medium">
          {navItems.map((item) => {
            const pathOnly = item.href.split("#")[0];
            const isActive =
              item.label === "Dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(pathOnly);

            const baseClasses =
              "group flex w-full items-center gap-3 rounded-full px-3.5 py-2.5 transition";

            const activeClasses =
              "border border-zinc-900 bg-black text-white shadow-sm";

            const idleClasses =
              "border border-transparent text-zinc-600 hover:border-zinc-200 hover:bg-zinc-50 hover:text-zinc-900";

            const Icon = item.icon;

            return (
              <Link
                key={item.href + item.label}
                href={item.href}
                className={`${baseClasses} ${isCollapsed ? "justify-center px-0" : ""} ${
                  isActive ? activeClasses : idleClasses
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <span
                  className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl transition ${
                    isActive
                      ? "bg-white/15 text-white"
                      : "bg-zinc-100 text-zinc-700 group-hover:bg-zinc-200 group-hover:text-zinc-900"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </span>
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {!isCollapsed && (
          <div className="mt-4 rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900/95 to-black px-3 py-3 text-xs text-white/80 shadow-[0_12px_32px_rgba(0,0,0,0.75)]">
            <p className="font-medium text-white">Today&apos;s Pulse</p>
            <p className="mt-1 text-white/60">
              +18.3% ROAS vs. last 7 days. Keep scaling your top ad sets.
            </p>
          </div>
        )}
      </div>

      <div className="shrink-0 border-t border-zinc-200 px-2 py-3">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setIsCollapsed((c) => !c)}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-zinc-200 text-zinc-600 transition hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <PanelLeftOpen className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}
