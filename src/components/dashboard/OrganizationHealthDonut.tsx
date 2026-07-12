"use client";

import { PieChart, ArrowRight, CheckCircle2, Package, Wrench, RotateCcw, ShieldAlert, Trash2 } from "lucide-react";
import clsx from "clsx";

export default function OrganizationHealthDonut() {
  const segments = [
    { label: "Available", percentage: 62, count: 772, color: "#10B981", bgClass: "bg-emerald-500", textClass: "text-emerald-700" },
    { label: "Allocated", percentage: 28, count: 348, color: "#2563EB", bgClass: "bg-[#2563EB]", textClass: "text-[#2563EB]" },
    { label: "Maintenance", percentage: 5, count: 62, color: "#F59E0B", bgClass: "bg-amber-500", textClass: "text-amber-700" },
    { label: "Lost", percentage: 2, count: 25, color: "#EF4444", bgClass: "bg-rose-500", textClass: "text-rose-700" },
    { label: "Retired", percentage: 3, count: 38, color: "#64748B", bgClass: "bg-slate-500", textClass: "text-slate-600" },
  ];

  const lifecycleStages = [
    { title: "Registered", count: "+12 today", icon: Package, active: true },
    { title: "Available", count: "772 items", icon: CheckCircle2, active: true },
    { title: "Allocated", count: "834 active", icon: ArrowRight, active: true },
    { title: "Maintenance", count: "23 under repair", icon: Wrench, active: true },
    { title: "Returned", count: "14 due/rec.", icon: RotateCcw, active: true },
    { title: "Disposed", count: "38 retired", icon: Trash2, active: false },
  ];

  return (
    <div className="space-y-6">
      {/* Top Split: Donut Chart + Legend */}
      <div className="bg-white border border-[#E2E6ED] rounded-[16px] p-5 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-semibold text-[#111418] tracking-tight flex items-center gap-2">
              <PieChart className="w-5 h-5 text-[#2563EB]" />
              Organization Health & Distribution
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Real-time breakdown of asset allocation across all departments and lockers.
            </p>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
            1,245 Total Assets
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-5">
          {/* SVG Donut Ring */}
          <div className="md:col-span-5 flex items-center justify-center relative py-2">
            <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
              {/* Background Circle */}
              <circle cx="50" cy="50" r="40" stroke="#f1f5f9" strokeWidth="16" fill="transparent" />

              {/* Segment 1: Available (62%) */}
              <circle
                cx="50" cy="50" r="40"
                stroke="#10B981" strokeWidth="16" fill="transparent"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 * (1 - 0.62)}
                strokeLinecap="round"
              />

              {/* Segment 2: Allocated (28%) */}
              <circle
                cx="50" cy="50" r="40"
                stroke="#2563EB" strokeWidth="16" fill="transparent"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 * (1 - 0.28)}
                strokeDashoffset-offset="251.2"
                style={{ strokeDashoffset: 251.2 * (1 - 0.28), transformOrigin: '50% 50%', transform: 'rotate(223.2deg)' }}
              />

              {/* Segment 3: Maintenance (5%) */}
              <circle
                cx="50" cy="50" r="40"
                stroke="#F59E0B" strokeWidth="16" fill="transparent"
                strokeDasharray="251.2"
                style={{ strokeDashoffset: 251.2 * (1 - 0.05), transformOrigin: '50% 50%', transform: 'rotate(324deg)' }}
              />

              {/* Segment 4 & 5: Lost/Retired (5%) */}
              <circle
                cx="50" cy="50" r="40"
                stroke="#64748B" strokeWidth="16" fill="transparent"
                strokeDasharray="251.2"
                style={{ strokeDashoffset: 251.2 * (1 - 0.05), transformOrigin: '50% 50%', transform: 'rotate(342deg)' }}
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-slate-900 leading-none">90%</span>
              <span className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider mt-1">
                Operational
              </span>
            </div>
          </div>

          {/* Legend Grid */}
          <div className="md:col-span-7 space-y-3">
            {segments.map((seg) => (
              <div key={seg.label} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/70 hover:bg-slate-100/80 transition-colors border border-slate-100">
                <div className="flex items-center gap-3">
                  <span className={`w-3.5 h-3.5 rounded-md ${seg.bgClass}`} />
                  <span className="text-sm font-semibold text-slate-800">{seg.label}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-medium text-slate-500">{seg.count} assets</span>
                  <span className="text-sm font-bold text-slate-900 w-12 text-right">{seg.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Multi-color Horizontal Distribution Bar */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          <div className="h-3 w-full rounded-full bg-slate-100 flex overflow-hidden gap-0.5 shadow-inner">
            <div style={{ width: "62%" }} className="bg-emerald-500 h-full transition-all duration-500" title="Available (62%)" />
            <div style={{ width: "28%" }} className="bg-[#2563EB] h-full transition-all duration-500" title="Allocated (28%)" />
            <div style={{ width: "5%" }} className="bg-amber-500 h-full transition-all duration-500" title="Maintenance (5%)" />
            <div style={{ width: "2%" }} className="bg-rose-500 h-full transition-all duration-500" title="Lost (2%)" />
            <div style={{ width: "3%" }} className="bg-slate-400 h-full transition-all duration-500" title="Retired (3%)" />
          </div>
        </div>
      </div>

      {/* Asset Lifecycle Timeline */}
      <div className="bg-white border border-slate-200/80 rounded-[16px] p-5 shadow-xs">
        <div className="pb-4 border-b border-slate-100">
          <h3 className="text-base font-semibold text-slate-900 tracking-tight">
            Asset Lifecycle Timeline
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            End-to-end status flow from intake registration to retirement disposal.
          </p>
        </div>

        {/* Horizontal Steps */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-5">
          {lifecycleStages.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.title}
                className={clsx(
                  "p-3 rounded-xl border relative flex flex-col items-center text-center transition-all",
                  stage.active
                    ? "bg-blue-50/30 border-blue-200/80 shadow-2xs hover:border-[#2563EB]/50"
                    : "bg-slate-50 border-slate-200/60 opacity-70"
                )}
              >
                {idx < lifecycleStages.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-300">
                    →
                  </div>
                )}
                <div className={clsx(
                  "w-8 h-8 rounded-lg flex items-center justify-center mb-2",
                  stage.active ? "bg-[#2563EB]/10 text-[#2563EB]" : "bg-slate-200 text-slate-600"
                )}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-900">{stage.title}</span>
                <span className="text-[11px] text-slate-500 mt-0.5 font-medium">{stage.count}</span>
              </div>
            );
          })}
        </div>

        {/* Today's Movement Counter Strip */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/60">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-900">Today&apos;s Real-time Movement:</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs font-semibold">
            <span className="px-2.5 py-1 rounded-md bg-blue-100 text-[#2563EB] border border-blue-200">
              15 Assets Allocated
            </span>
            <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-700 border border-emerald-200">
              3 Returned
            </span>
            <span className="px-2.5 py-1 rounded-md bg-amber-100 text-amber-700 border border-amber-200">
              2 Under Repair
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
