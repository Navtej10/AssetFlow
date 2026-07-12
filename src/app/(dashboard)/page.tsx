import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import Link from "next/link";
import {
  Package,
  ArrowRightLeft,
  Wrench,
  CalendarDays,
  FileCheck,
  AlertTriangle,
  Plus,
  BarChart3,
  Search,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ChevronRight,
  UserCheck,
  GitCommit,
  Sparkles
} from "lucide-react";
import OrganizationHealthDonut from "@/components/dashboard/OrganizationHealthDonut";
import InsightsAndNotifications from "@/components/dashboard/InsightsAndNotifications";
import ChartsSuite from "@/components/dashboard/ChartsSuite";
import InteractiveApprovalWidget from "@/components/dashboard/InteractiveApprovalWidget";
import QuickCreateFab from "@/components/dashboard/QuickCreateFab";

export const dynamic = "force-dynamic";

export default async function DashboardHome() {
  const session = await auth();

  // Fetch live metrics
  const totalAssets = await prisma.asset.count({ where: { status: { notIn: ["DISPOSED", "RETIRED", "LOST"] } } });
  const allocated = await prisma.asset.count({ where: { status: "ALLOCATED" } });
  const maintenance = await prisma.asset.count({ where: { status: "UNDER_MAINTENANCE" } });

  const activeBookings = await prisma.booking.count({
    where: { status: "ONGOING" }
  });
  
  // A simplistic approximation for overdue returns: Allocations where expectedReturnDate < now and status is ACTIVE
  const overdueReturns = await prisma.allocation.count({
    where: { 
      status: "ACTIVE",
      expectedReturnDate: { lt: new Date() }
    }
  });

  const pendingTransfers = 0; // Transfer feature not fully implemented in PRD scope

  // Fetch recent real assets from DB (or fallback/merge with realistic demo items)
  const dbRecentAssets = await prisma.asset.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
    take: 4
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Hero Section */}
      <div className="bg-white border border-[#E2E6ED] rounded-[16px] p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-blue-50/50 to-transparent pointer-events-none" />
        
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111418] leading-tight">
            Good Morning,<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1D4ED8] to-[#2563EB]">
              {session?.user?.name || "Kushal Joshi"} 👋
            </span>
          </h1>
          <p className="text-sm text-slate-600 mt-1 font-medium">
            Here&apos;s your organization&apos;s operational overview.
          </p>
        </div>

        {/* Right side operational status badges */}
        <div className="flex flex-wrap md:flex-nowrap items-center gap-3 relative z-10">
          <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E6ED] text-left">
            <span className="text-[11px] font-semibold text-slate-400 uppercase block">Today&apos;s Date</span>
            <span className="text-xs sm:text-sm font-bold text-[#111418]">Wed, Jul 12, 2026</span>
          </div>

          <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E6ED] text-left">
            <span className="text-[11px] font-semibold text-slate-400 uppercase block">Current Active Users</span>
            <span className="text-xs sm:text-sm font-bold text-emerald-600 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              142 Online
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E6ED] text-left">
            <span className="text-[11px] font-semibold text-slate-400 uppercase block">Last Audit</span>
            <span className="text-xs sm:text-sm font-bold text-[#111418]">2 days ago (99.4%)</span>
          </div>
        </div>
      </div>

      {/* KPI Cards (Top 6 cards directly visible) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-5">
        {/* KPI 1: Assets */}
        <div className="bg-white border border-[#E2E6ED] rounded-[16px] p-4 shadow-xs hover:shadow-md transition-all group relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">📦 Assets</span>
              <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#111418] font-sans tracking-tight">
                {totalAssets.toLocaleString()}
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xs">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="font-bold text-emerald-600 flex items-center gap-0.5">+12 today</span>
            <span className="font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">Available</span>
          </div>
        </div>

        {/* KPI 2: Allocated */}
        <div className="bg-white border border-[#E2E6ED] rounded-[16px] p-4 shadow-xs hover:shadow-md transition-all group relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">🧑 Allocated</span>
              <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#111418] font-sans tracking-tight">
                {allocated.toLocaleString()}
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xs">
              <ArrowRightLeft className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700">67%</span>
            <span className="font-semibold px-2 py-0.5 rounded bg-blue-50 text-[#2563EB]">In Use</span>
          </div>
        </div>

        {/* KPI 3: Maintenance */}
        <div className="bg-white border border-[#E2E6ED] rounded-[16px] p-4 shadow-xs hover:shadow-md transition-all group relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">🛠 Maintenance</span>
              <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-amber-600 font-sans tracking-tight">
                {maintenance}
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xs">
              <Wrench className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="font-bold text-rose-600">5 Critical</span>
            <span className="font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800">Action Req.</span>
          </div>
        </div>

        {/* KPI 4: Active Bookings */}
        <div className="bg-white border border-[#E2E6ED] rounded-[16px] p-4 shadow-xs hover:shadow-md transition-all group relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">📅 Active Bookings</span>
              <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-purple-700 font-sans tracking-tight">
                {activeBookings}
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xs">
              <CalendarDays className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700">12 Today</span>
            <span className="font-semibold px-2 py-0.5 rounded bg-purple-100 text-purple-700">Ongoing</span>
          </div>
        </div>

        {/* KPI 5: Pending Transfers */}
        <div className="bg-white border border-[#E2E6ED] rounded-[16px] p-4 shadow-xs hover:shadow-md transition-all group relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">🔄 Pending Transfers</span>
              <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-blue-600 font-sans tracking-tight">
                {pendingTransfers}
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xs">
              <FileCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="font-bold text-slate-600">Review Queue</span>
            <span className="font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800">Assigned</span>
          </div>
        </div>

        {/* KPI 6: Overdue Returns */}
        <div className="bg-white border border-rose-200/90 rounded-[16px] p-4 shadow-xs hover:shadow-md transition-all group relative overflow-hidden flex flex-col justify-between bg-gradient-to-br from-white to-rose-50/40">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block">⚠ Overdue Returns</span>
              <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-rose-600 font-sans tracking-tight">
                {overdueReturns}
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xs animate-pulse">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-rose-100 flex items-center justify-between text-xs">
            <span className="font-bold text-rose-700">Needs Attention</span>
            <span className="font-bold px-2 py-0.5 rounded bg-rose-600 text-white shadow-2xs">Alert</span>
          </div>
        </div>
      </div>

      {/* Quick Actions Horizontal Strip */}
      <div className="bg-white border border-slate-200/80 rounded-[16px] p-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <span>⚡ Quick Actions</span>
          <span>One-Click Enterprise Operations</span>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          <Link
            href="/assets/new"
            className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-[12px] bg-[#2563EB] text-white hover:bg-[#1d4ed8] font-semibold text-xs sm:text-sm shadow-sm transition-all hover:shadow-md active:scale-95"
          >
            <Plus className="w-4 h-4 shrink-0" />
            <span className="truncate">Register Asset</span>
          </Link>

          <Link
            href="/allocations"
            className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-[12px] bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200/80 hover:border-emerald-300 font-semibold text-xs sm:text-sm shadow-2xs transition-all active:scale-95"
          >
            <ArrowRightLeft className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="truncate">Allocate Asset</span>
          </Link>

          <Link
            href="/bookings"
            className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-[12px] bg-white hover:bg-purple-50 text-slate-700 hover:text-purple-700 border border-slate-200/80 hover:border-purple-300 font-semibold text-xs sm:text-sm shadow-2xs transition-all active:scale-95"
          >
            <CalendarDays className="w-4 h-4 text-purple-600 shrink-0" />
            <span className="truncate">Book Resource</span>
          </Link>

          <Link
            href="/maintenance"
            className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-[12px] bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-700 border border-slate-200/80 hover:border-amber-300 font-semibold text-xs sm:text-sm shadow-2xs transition-all active:scale-95"
          >
            <Wrench className="w-4 h-4 text-amber-600 shrink-0" />
            <span className="truncate">Raise Maintenance</span>
          </Link>

          <Link
            href="/audit"
            className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-[12px] bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200/80 hover:border-slate-400 font-semibold text-xs sm:text-sm shadow-2xs transition-all active:scale-95"
          >
            <FileCheck className="w-4 h-4 text-slate-600 shrink-0" />
            <span className="truncate">Start Audit</span>
          </Link>

          <Link
            href="/reports"
            className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-[12px] bg-white hover:bg-blue-50 text-slate-700 hover:text-[#2563EB] border border-slate-200/80 hover:border-blue-300 font-semibold text-xs sm:text-sm shadow-2xs transition-all active:scale-95"
          >
            <BarChart3 className="w-4 h-4 text-[#2563EB] shrink-0" />
            <span className="truncate">View Reports</span>
          </Link>
        </div>
      </div>

      {/* Row 1: Organization Health Donut + Asset Lifecycle Timeline vs AI Insights & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8">
          <OrganizationHealthDonut />
        </div>
        <div className="lg:col-span-4">
          <InsightsAndNotifications />
        </div>
      </div>

      {/* Row 2: Utilization Charts & Analytics Suite vs Recent Activities Feed (`Looks like GitHub activity`) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8">
          <ChartsSuite />
        </div>

        {/* Recent Activities Panel */}
        <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-[16px] p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <GitCommit className="w-5 h-5 text-slate-700" />
                <h2 className="text-base font-semibold text-slate-900 tracking-tight">
                  Recent Activities
                </h2>
              </div>
              <span className="text-xs font-mono text-slate-400">Live Feed</span>
            </div>

            <div className="pt-3 space-y-4">
              {/* Activity Item 1 */}
              <div className="flex items-start gap-3 relative pb-4 border-b border-slate-100/80">
                <span className="text-xs font-mono font-bold text-slate-400 w-12 pt-0.5 shrink-0">10:30</span>
                <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB] mt-1 shrink-0 ring-4 ring-blue-50" />
                <div className="flex-1">
                  <p className="text-xs sm:text-sm font-semibold text-slate-900">
                    Raj allocated <span className="text-[#2563EB]">AF-0021</span>
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">Assigned to Engineering Dept (MacBook Pro M3 Max)</p>
                </div>
              </div>

              {/* Activity Item 2 */}
              <div className="flex items-start gap-3 relative pb-4 border-b border-slate-100/80">
                <span className="text-xs font-mono font-bold text-slate-400 w-12 pt-0.5 shrink-0">10:42</span>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 shrink-0 ring-4 ring-emerald-50" />
                <div className="flex-1">
                  <p className="text-xs sm:text-sm font-semibold text-slate-900">
                    Maintenance Approved
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">Screen replacement for Dell XPS (AF-0002) greenlit</p>
                </div>
              </div>

              {/* Activity Item 3 */}
              <div className="flex items-start gap-3 relative pb-4 border-b border-slate-100/80">
                <span className="text-xs font-mono font-bold text-slate-400 w-12 pt-0.5 shrink-0">11:10</span>
                <div className="w-2.5 h-2.5 rounded-full bg-purple-500 mt-1 shrink-0 ring-4 ring-purple-50" />
                <div className="flex-1">
                  <p className="text-xs sm:text-sm font-semibold text-slate-900">
                    Audit Completed
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">IT Room A cycle finalized with 100% item verification</p>
                </div>
              </div>

              {/* Activity Item 4 */}
              <div className="flex items-start gap-3 relative pb-4 border-b border-slate-100/80">
                <span className="text-xs font-mono font-bold text-slate-400 w-12 pt-0.5 shrink-0">11:15</span>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1 shrink-0 ring-4 ring-amber-50" />
                <div className="flex-1">
                  <p className="text-xs sm:text-sm font-semibold text-slate-900">
                    Booking Confirmed
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">Conference Room B2 reserved by Priya for Executive Sync</p>
                </div>
              </div>

              {/* Activity Item 5 */}
              <div className="flex items-start gap-3 relative">
                <span className="text-xs font-mono font-bold text-slate-400 w-12 pt-0.5 shrink-0">09:20</span>
                <div className="w-2.5 h-2.5 rounded-full bg-slate-400 mt-1 shrink-0 ring-4 ring-slate-100" />
                <div className="flex-1">
                  <p className="text-xs sm:text-sm font-semibold text-slate-900">
                    New Asset Registered
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">AF-0145 (Dell XPS 15) added to IT Directory</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 mt-4 border-t border-slate-100 text-center">
            <Link href="/audit" className="text-xs font-semibold text-[#2563EB] hover:underline flex items-center justify-center gap-1">
              View full system audit log <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Row 3: Allocation Overview Table & Recent Assets vs Pending Approvals Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left column: Allocation Overview + Recent Assets Card View */}
        <div className="lg:col-span-8 space-y-6">
          {/* Allocation Overview Table */}
          <div className="bg-white border border-slate-200/80 rounded-[16px] p-5 shadow-xs overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
              <div>
                <h2 className="text-base font-semibold text-slate-900 tracking-tight flex items-center gap-2">
                  <ArrowRightLeft className="w-5 h-5 text-[#2563EB]" />
                  Allocation Overview
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Live tracking of active holders, departments, return dates, and colored status pills.
                </p>
              </div>
              <Link
                href="/allocations"
                className="text-xs font-semibold text-[#2563EB] hover:underline flex items-center gap-1 self-start sm:self-auto"
              >
                View all allocations →
              </Link>
            </div>

            <div className="overflow-x-auto pt-3">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/70">
                    <th className="py-3 px-3">Asset</th>
                    <th className="py-3 px-3">Holder</th>
                    <th className="py-3 px-3">Department</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Return Date</th>
                    <th className="py-3 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  {/* Row 1 */}
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-bold text-[#2563EB]">AF-0021</td>
                    <td className="py-3 px-3 font-medium text-slate-900">Raj Kumar</td>
                    <td className="py-3 px-3 text-slate-600">Engineering</td>
                    <td className="py-3 px-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1 w-fit">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600" /> 🔵 Allocated
                      </span>
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-800">Tomorrow</td>
                    <td className="py-3 px-3 text-right">
                      <Link href="/allocations" className="text-xs font-semibold text-slate-500 hover:text-[#2563EB]">Manage</Link>
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-bold text-[#2563EB]">AF-0018</td>
                    <td className="py-3 px-3 font-medium text-slate-900">Priya Sharma</td>
                    <td className="py-3 px-3 text-slate-600">Design</td>
                    <td className="py-3 px-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1 w-fit">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-600" /> 🔴 Overdue
                      </span>
                    </td>
                    <td className="py-3 px-3 font-bold text-rose-600">Yesterday</td>
                    <td className="py-3 px-3 text-right">
                      <Link href="/allocations" className="text-xs font-semibold text-rose-600 hover:underline">Remind</Link>
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-bold text-[#2563EB]">AF-0034</td>
                    <td className="py-3 px-3 font-medium text-slate-900">Vikram Patel</td>
                    <td className="py-3 px-3 text-slate-600">Engineering</td>
                    <td className="py-3 px-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1 w-fit">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600" /> 🟠 Maintenance
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-500">Jul 18, 2026</td>
                    <td className="py-3 px-3 text-right">
                      <Link href="/maintenance" className="text-xs font-semibold text-slate-500 hover:text-[#2563EB]">Ticket</Link>
                    </td>
                  </tr>

                  {/* Row 4 */}
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-bold text-[#2563EB]">AF-0042</td>
                    <td className="py-3 px-3 font-medium text-slate-900">Ananya Iyer</td>
                    <td className="py-3 px-3 text-slate-600">Finance</td>
                    <td className="py-3 px-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1 w-fit">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" /> 🟢 Available
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-400">-</td>
                    <td className="py-3 px-3 text-right">
                      <Link href="/allocations" className="text-xs font-semibold text-[#2563EB] hover:underline">Allocate</Link>
                    </td>
                  </tr>

                  {/* Row 5 */}
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-bold text-[#2563EB]">AF-0055</td>
                    <td className="py-3 px-3 font-medium text-slate-900">Karan Mehta</td>
                    <td className="py-3 px-3 text-slate-600">Sales</td>
                    <td className="py-3 px-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1 w-fit">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600" /> 🔵 Allocated
                      </span>
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-800">Jul 20, 2026</td>
                    <td className="py-3 px-3 text-right">
                      <Link href="/allocations" className="text-xs font-semibold text-slate-500 hover:text-[#2563EB]">Manage</Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Assets Card View */}
          <div className="bg-white border border-slate-200/80 rounded-[16px] p-5 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-base font-semibold text-slate-900 tracking-tight flex items-center gap-2">
                  <Package className="w-5 h-5 text-[#2563EB]" />
                  Recent Assets Directory
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Card view of the newest physical assets entered into the organization register.
                </p>
              </div>
              <Link href="/assets" className="text-xs font-semibold text-[#2563EB] hover:underline">
                View All Directory →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
              {/* Card 1 */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-[#2563EB]/50 transition-all shadow-2xs flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      AF-0145
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" title="Available" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mt-3 group-hover:text-[#2563EB] transition-colors">
                    Dell XPS 15 (2025)
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium">📍 IT Room A</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Available</span>
                  <span className="font-semibold text-emerald-600">Registered Today</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-[#2563EB]/50 transition-all shadow-2xs flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      AF-0146
                    </span>
                    <span className="w-2 h-2 rounded-full bg-blue-600" title="Allocated" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mt-3 group-hover:text-[#2563EB] transition-colors">
                    Sony 4K Projector
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium">📍 Conf Room 1</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Allocated</span>
                  <span className="font-semibold text-slate-600">Registered Yesterday</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-[#2563EB]/50 transition-all shadow-2xs flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      AF-0147
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" title="Available" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mt-3 group-hover:text-[#2563EB] transition-colors">
                    Apple iPad Pro M4
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium">📍 Storage Locker 3</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Available</span>
                  <span className="font-semibold text-slate-600">2 days ago</span>
                </div>
              </div>

              {/* Card 4 (Or live DB item if present) */}
              {dbRecentAssets.length > 0 ? (
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-[#2563EB]/50 transition-all shadow-2xs flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                        {dbRecentAssets[0].assetTag}
                      </span>
                      <span className={`w-2 h-2 rounded-full ${dbRecentAssets[0].status === 'AVAILABLE' ? 'bg-emerald-500' : 'bg-blue-600'}`} />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mt-3 group-hover:text-[#2563EB] transition-colors truncate">
                      {dbRecentAssets[0].name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 font-medium truncate">📍 {dbRecentAssets[0].location || "HQ Locker"}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{dbRecentAssets[0].status}</span>
                    <span className="font-semibold text-slate-600">Database Entry</span>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-[#2563EB]/50 transition-all shadow-2xs flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                        AF-0148
                      </span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500" title="Available" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mt-3 group-hover:text-[#2563EB] transition-colors">
                      Tesla Model 3 Fleet
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 font-medium">📍 Parking Bay 12</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Available</span>
                    <span className="font-semibold text-slate-600">3 days ago</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right column: Pending Approvals Station */}
        <div className="lg:col-span-4">
          <InteractiveApprovalWidget />
        </div>
      </div>

      {/* Floating Quick Create Button */}
      <QuickCreateFab />
    </div>
  );
}
