"use client";

import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { CreditCard, LogOut, Settings, User } from "lucide-react";

export function UserNav() {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 rounded-full border border-white/10 bg-black/80 px-2 py-1.5 text-left text-xs shadow-sm shadow-black/30 transition hover:border-orange-500 hover:bg-orange-500/10 hover:text-orange-400"
          aria-label="Open user menu"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-400 text-xs font-semibold text-black">
            S
          </div>
          <div className="hidden flex-col leading-tight sm:flex">
            <span className="text-[11px] font-medium text-white">Sinan</span>
            <span className="text-[10px] text-white/60">
              Growth Lead · Leadtribute
            </span>
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent
          align="end"
          sideOffset={8}
          className="min-w-[220px] rounded-3xl border border-zinc-800 bg-zinc-950 py-1 shadow-xl shadow-black/50"
        >
          <DropdownMenuLabel className="px-3 py-2">
            <p className="text-sm font-medium text-white">Sinan O.</p>
            <p className="text-xs text-white/50">sinan@leadtribute.com</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="my-1 h-px bg-zinc-800" />
          <DropdownMenuItem
            className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm text-white/90 outline-none hover:bg-zinc-900 focus:bg-zinc-900 data-[highlighted]:bg-zinc-900 data-[highlighted]:text-orange-400"
            onSelect={() => router.push("/settings")}
          >
            <User className="h-4 w-4 shrink-0" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm text-white/90 outline-none hover:bg-zinc-900 focus:bg-zinc-900 data-[highlighted]:bg-zinc-900 data-[highlighted]:text-orange-400"
            onSelect={() => router.push("/settings?tab=billing")}
          >
            <CreditCard className="h-4 w-4 shrink-0" />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm text-white/90 outline-none hover:bg-zinc-900 focus:bg-zinc-900 data-[highlighted]:bg-zinc-900 data-[highlighted]:text-orange-400"
            onSelect={() => router.push("/settings")}
          >
            <Settings className="h-4 w-4 shrink-0" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator className="my-1 h-px bg-zinc-800" />
          <DropdownMenuItem
            className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm text-white/90 outline-none hover:bg-orange-500/10 hover:text-orange-400 focus:bg-orange-500/10 data-[highlighted]:bg-orange-500/10 data-[highlighted]:text-orange-400"
            onSelect={() => router.push("/login")}
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}
