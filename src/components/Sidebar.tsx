"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ArrowRightLeft,
  CalendarDays,
  Wrench,
  ClipboardCheck,
  BarChart3,
  Bell,
  Activity,
  Building2,
  Users,
  Settings,
  ChevronRight,
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen,
  PlusCircle,
  ListFilter
} from "lucide-react";
import clsx from "clsx";

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAssetsExpanded, setIsAssetsExpanded] = useState(true);

  const isAssetsActive = pathname.startsWith("/assets");

  return (
    <aside
      className={clsx(
        "border-r border-slate-200/80 bg-white flex flex-col hidden md:flex transition-all duration-300 ease-in-out relative select-none z-20",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-5 border-b border-slate-200/80 bg-slate-50/50">
        {!isCollapsed ? (
          <Link href="/" className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-xl bg-[#2563EB] flex items-center justify-center text-white shadow-sm font-bold text-sm tracking-tight shrink-0">
              AF
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-base text-slate-900 tracking-tight leading-none font-sans">
                AssetFlow
              </span>
              <span className="text-[10px] font-medium text-[#2563EB] tracking-wider uppercase mt-1">
                Enterprise ERP
              </span>
            </div>
          </Link>
        ) : (
          <Link href="/" className="mx-auto flex items-center justify-center">
            <div className="w-9 h-9 rounded-xl bg-[#2563EB] flex items-center justify-center text-white shadow-sm font-bold text-sm tracking-tight">
              AF
            </div>
          </Link>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? (
            <PanelLeftOpen className="w-4 h-4" />
          ) : (
            <PanelLeftClose className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {/* Dashboard */}
        <NavItem
          href="/"
          icon={LayoutDashboard}
          label="Dashboard"
          isActive={pathname === "/"}
          isCollapsed={isCollapsed}
        />

        {/* Assets Group */}
        <div className="space-y-1 pt-1">
          <button
            onClick={() => {
              if (isCollapsed) {
                setIsCollapsed(false);
                setIsAssetsExpanded(true);
              } else {
                setIsAssetsExpanded(!isAssetsExpanded);
              }
            }}
            className={clsx(
              "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
              isAssetsActive
                ? "bg-[#2563EB]/10 text-[#2563EB]"
                : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
            )}
            title="Assets"
          >
            <div className="flex items-center gap-3">
              <Package
                className={clsx(
                  "w-5 h-5 shrink-0 transition-colors",
                  isAssetsActive ? "text-[#2563EB]" : "text-slate-400 group-hover:text-slate-700"
                )}
              />
              {!isCollapsed && <span>Assets</span>}
            </div>
            {!isCollapsed && (
              <div className="text-slate-400">
                {isAssetsExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </div>
            )}
          </button>

          {/* Submenu for Assets */}
          {!isCollapsed && isAssetsExpanded && (
            <div className="pl-9 pr-2 py-1 space-y-1 border-l-2 border-slate-200 ml-5">
              <Link
                href="/assets"
                className={clsx(
                  "flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                  pathname === "/assets"
                    ? "bg-[#2563EB] text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/60"
                )}
              >
                <ListFilter className="w-3.5 h-3.5 opacity-80" />
                <span>Asset Directory</span>
              </Link>
              <Link
                href="/assets/new"
                className={clsx(
                  "flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                  pathname === "/assets/new"
                    ? "bg-[#2563EB] text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/60"
                )}
              >
                <PlusCircle className="w-3.5 h-3.5 opacity-80" />
                <span>Register Asset</span>
              </Link>
            </div>
          )}
        </div>

        {/* Allocations */}
        <NavItem
          href="/allocations"
          icon={ArrowRightLeft}
          label="Allocations"
          isActive={pathname.startsWith("/allocations")}
          isCollapsed={isCollapsed}
        />

        {/* Resource Booking */}
        <NavItem
          href="/bookings"
          icon={CalendarDays}
          label="Resource Booking"
          isActive={pathname.startsWith("/bookings")}
          isCollapsed={isCollapsed}
        />

        {/* Maintenance */}
        <NavItem
          href="/maintenance"
          icon={Wrench}
          label="Maintenance"
          isActive={pathname.startsWith("/maintenance")}
          isCollapsed={isCollapsed}
        />

        {/* Audit */}
        <NavItem
          href="/audit"
          icon={ClipboardCheck}
          label="Audit"
          isActive={pathname.startsWith("/audit")}
          isCollapsed={isCollapsed}
        />

        {/* Reports */}
        <NavItem
          href="/reports"
          icon={BarChart3}
          label="Reports"
          isActive={pathname.startsWith("/reports")}
          isCollapsed={isCollapsed}
        />

        {/* Notifications */}
        <NavItem
          href="/notifications"
          icon={Bell}
          label="Notifications"
          isActive={pathname.startsWith("/notifications")}
          isCollapsed={isCollapsed}
          badgeCount={5}
        />

        {/* Activity Logs */}
        <NavItem
          href="/activity-logs"
          icon={Activity}
          label="Activity Logs"
          isActive={pathname.startsWith("/activity-logs")}
          isCollapsed={isCollapsed}
        />

        {/* Divider */}
        <div className="pt-3 pb-2 px-3">
          {!isCollapsed ? (
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Administration
            </div>
          ) : (
            <div className="h-px bg-slate-200 my-1" />
          )}
        </div>

        {/* Organization Setup */}
        <NavItem
          href="/organization"
          icon={Building2}
          label="Organization Setup"
          isActive={pathname.startsWith("/organization")}
          isCollapsed={isCollapsed}
        />

        {/* Employees */}
        <NavItem
          href="/employees"
          icon={Users}
          label="Employees"
          isActive={pathname.startsWith("/employees")}
          isCollapsed={isCollapsed}
        />
      </nav>

      {/* Footer Settings & User Status */}
      <div className="p-3 border-t border-[#E2E6ED] bg-[#F8FAFC]/80 space-y-3">
        <NavItem
          href="/settings"
          icon={Settings}
          label="Settings"
          isActive={pathname.startsWith("/settings")}
          isCollapsed={isCollapsed}
        />
      </div>
    </aside>
  );
}

function NavItem({
  href,
  icon: Icon,
  label,
  isActive,
  isCollapsed,
  badgeCount,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  isCollapsed: boolean;
  badgeCount?: number;
}) {
  return (
    <Link
      href={href}
      title={isCollapsed ? label : undefined}
      className={clsx(
        "flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative",
        isActive
          ? "bg-[#2563EB] text-white shadow-md shadow-[#2563EB]/20"
          : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
      )}
    >
      <div className="flex items-center gap-3">
        <Icon
          className={clsx(
            "w-5 h-5 shrink-0 transition-colors",
            isActive ? "text-white" : "text-slate-400 group-hover:text-slate-700"
          )}
        />
        {!isCollapsed && <span className="truncate">{label}</span>}
      </div>
      {!isCollapsed && badgeCount && badgeCount > 0 && (
        <span
          className={clsx(
            "text-[11px] font-bold px-2 py-0.5 rounded-full",
            isActive
              ? "bg-white/20 text-white"
              : "bg-rose-100 text-rose-600 border border-rose-200"
          )}
        >
          {badgeCount}
        </span>
      )}
      {isCollapsed && badgeCount && badgeCount > 0 && (
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
      )}
    </Link>
  );
}
