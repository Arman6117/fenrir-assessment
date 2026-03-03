"use client";

import { useState } from "react";
import Image from "next/image";
import {
  LayoutDashboard,
  FolderOpen,
  ScanLine,
  CalendarClock,
  Bell,
  Settings,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
import { NavItem } from "./nav-item";
import Logo from "@/components/logo";
import  cn  from "@/lib/utils";

const primaryNav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/projects",  label: "Projects",  icon: FolderOpen },
  { href: "/scans",     label: "Scans",     icon: ScanLine },
  { href: "/schedule",  label: "Schedule",  icon: CalendarClock },
];

const secondaryNav = [
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/settings",      label: "Settings",      icon: Settings },
  { href: "/support",       label: "Support",        icon: HelpCircle },
];

interface SidebarProps {
  /** Mobile: controlled open state from parent */
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/30 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={cn(
          // base
          "fixed top-0 left-0 z-30 h-full bg-white border-r border-gray-100 flex flex-col transition-all duration-200",
          // desktop width
          collapsed ? "w-[68px]" : "w-[220px]",
          // mobile: slide in/out
          "lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className={cn("flex items-center h-16 px-4 shrink-0", collapsed && "justify-center px-2")}>
          <Logo className="text-primary-accent"  />
        </div>

        <div className="flex flex-col flex-1 overflow-y-auto px-3 pb-4 gap-1">
          {/* Primary nav */}
          <nav className="flex flex-col gap-1 mt-2">
            {primaryNav.map((item) => (
              <NavItem key={item.href} {...item} collapsed={collapsed} />
            ))}
          </nav>

          {/* Divider */}
          <div className="my-3 border-t border-gray-100" />

          {/* Secondary nav */}
          <nav className="flex flex-col gap-1">
            {secondaryNav.map((item) => (
              <NavItem key={item.href} {...item} collapsed={collapsed} />
            ))}
          </nav>

          {/* Spacer */}
          <div className="flex-1" />

          {/* User profile */}
          <div
            className={cn(
              "flex items-center gap-3 px-2 py-3 rounded-xl hover:bg-gray-50 cursor-pointer transition",
              collapsed && "justify-center"
            )}
          >
            <div className="relative w-8 h-8 shrink-0">
              <Image
                src="/"
                alt="User avatar"
                fill
                className="rounded-full object-cover"
              />
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-800 truncate">admin@edu.com</p>
                <p className="text-xs text-gray-400 truncate">Security Lead</p>
              </div>
            )}
            {!collapsed && (
              <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
            )}
          </div>
        </div>

        {/* Collapse toggle — desktop only */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex items-center justify-center h-8 w-8 rounded-full bg-white border border-gray-200 shadow-sm absolute -right-4 top-[72px] hover:bg-gray-50 transition"
          aria-label="Toggle sidebar"
        >
          <ChevronRight
            className={cn("w-3.5 h-3.5 text-gray-500 transition-transform", collapsed && "rotate-180")}
          />
        </button>
      </aside>
    </>
  );
}
