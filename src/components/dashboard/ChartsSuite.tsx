"use client";

import { useState } from "react";
import { BarChart3, TrendingUp, Grid, Building, Laptop, CalendarDays, Activity } from "lucide-react";
import clsx from "clsx";

export default function ChartsSuite() {
  const [activeTab, setActiveTab] = useState<"utilization" | "department" | "heatmap" | "maintenance">("utilization");

  return (
    <div className="bg-white border border-[#E2E6ED] rounded-[16px] p-5 shadow-xs flex flex-col justify-between">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base font-semibold text-[#111418] tracking-tight flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#2563EB]" />
            Operational & Utilization Analytics
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Deep dive into asset performance, booking heatmaps, and department distribution.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab("utilization")}
            className={clsx(
              "px-3 py-1.5 rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5",
              activeTab === "utilization"
                ? "bg-white text-[#2563EB] shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            )}
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>Asset Utilization</span>
          </button>
          <button
            onClick={() => setActiveTab("department")}
            className={clsx(
              "px-3 py-1.5 rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5",
              activeTab === "department"
                ? "bg-white text-[#2563EB] shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            )}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Dept Allocation</span>
          </button>
          <button
            onClick={() => setActiveTab("heatmap")}
            className={clsx(
              "px-3 py-1.5 rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5",
              activeTab === "heatmap"
                ? "bg-white text-[#2563EB] shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            )}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Booking Heatmap</span>
          </button>
          <button
            onClick={() => setActiveTab("maintenance")}
            className={clsx(
              "px-3 py-1.5 rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5",
              activeTab === "maintenance"
                ? "bg-white text-[#2563EB] shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            )}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Maintenance Trend</span>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="pt-6 pb-2 min-h-[300px] flex flex-col justify-center">
        {/* TAB 1: ASSET UTILIZATION */}
        {activeTab === "utilization" && (
          <div className="space-y-5 animate-fade-in">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
              <span>Category</span>
              <span>Active Allocation Rate</span>
            </div>

            {/* Electronics (88%) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm font-semibold text-slate-800">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" />
                  Electronics (Laptops, Displays, Tablets)
                </span>
                <span className="text-[#2563EB] font-bold">88% (450/512 active)</span>
              </div>
              <div className="h-4 w-full rounded-full bg-slate-100 overflow-hidden shadow-inner">
                <div style={{ width: "88%" }} className="h-full bg-gradient-to-r from-blue-500 to-[#2563EB] rounded-full transition-all duration-700" />
              </div>
            </div>

            {/* Vehicles (78%) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm font-semibold text-slate-800">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  Vehicles & Fleet
                </span>
                <span className="text-emerald-600 font-bold">78% (39/50 active)</span>
              </div>
              <div className="h-4 w-full rounded-full bg-slate-100 overflow-hidden shadow-inner">
                <div style={{ width: "78%" }} className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-700" />
              </div>
            </div>

            {/* Furniture (64%) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm font-semibold text-slate-800">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                  Furniture & Office Pods
                </span>
                <span className="text-purple-600 font-bold">64% (256/400 active)</span>
              </div>
              <div className="h-4 w-full rounded-full bg-slate-100 overflow-hidden shadow-inner">
                <div style={{ width: "64%" }} className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full transition-all duration-700" />
              </div>
            </div>

            {/* Printers (32%) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm font-semibold text-slate-800">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  Printers & Peripherals
                </span>
                <span className="text-amber-600 font-bold">32% (90/283 active)</span>
              </div>
              <div className="h-4 w-full rounded-full bg-slate-100 overflow-hidden shadow-inner">
                <div style={{ width: "32%" }} className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all duration-700" />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DEPARTMENT ALLOCATION */}
        {activeTab === "department" && (
          <div className="space-y-5 animate-fade-in">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
              <span>Department</span>
              <span>Assigned Asset Count</span>
            </div>

            {/* Engineering */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm font-semibold text-slate-800">
                <span>Engineering</span>
                <span className="text-[#2563EB] font-bold">420 Assets (45.4%)</span>
              </div>
              <div className="h-4 w-full rounded-full bg-slate-100 overflow-hidden shadow-inner flex items-center">
                <div style={{ width: "84%" }} className="h-full bg-[#2563EB] rounded-full transition-all duration-700" />
              </div>
            </div>

            {/* Finance */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm font-semibold text-slate-800">
                <span>Finance</span>
                <span className="text-purple-600 font-bold">210 Assets (22.7%)</span>
              </div>
              <div className="h-4 w-full rounded-full bg-slate-100 overflow-hidden shadow-inner flex items-center">
                <div style={{ width: "42%" }} className="h-full bg-purple-600 rounded-full transition-all duration-700" />
              </div>
            </div>

            {/* Sales */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm font-semibold text-slate-800">
                <span>Sales & Marketing</span>
                <span className="text-emerald-600 font-bold">180 Assets (19.5%)</span>
              </div>
              <div className="h-4 w-full rounded-full bg-slate-100 overflow-hidden shadow-inner flex items-center">
                <div style={{ width: "36%" }} className="h-full bg-emerald-600 rounded-full transition-all duration-700" />
              </div>
            </div>

            {/* HR */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm font-semibold text-slate-800">
                <span>People & HR</span>
                <span className="text-amber-600 font-bold">115 Assets (12.4%)</span>
              </div>
              <div className="h-4 w-full rounded-full bg-slate-100 overflow-hidden shadow-inner flex items-center">
                <div style={{ width: "23%" }} className="h-full bg-amber-500 rounded-full transition-all duration-700" />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BOOKING HEATMAP */}
        {activeTab === "heatmap" && (
          <div className="animate-fade-in space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Weekly Room & Resource Activity Matrix</span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-[11px]"><span className="w-3 h-3 rounded-xs bg-slate-100 border border-slate-200" /> Low</span>
                <span className="flex items-center gap-1 text-[11px]"><span className="w-3 h-3 rounded-xs bg-purple-200" /> Med</span>
                <span className="flex items-center gap-1 text-[11px]"><span className="w-3 h-3 rounded-xs bg-purple-600" /> Peak</span>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-3 pt-2">
              {/* Monday */}
              <div className="space-y-2 text-center">
                <span className="text-xs font-bold text-slate-700">Monday</span>
                <div className="grid grid-cols-2 gap-1 p-2 bg-slate-50 rounded-xl border border-slate-200/80">
                  <div className="h-6 bg-purple-600 rounded-md" title="9 AM - 11 AM: High" />
                  <div className="h-6 bg-purple-400 rounded-md" title="11 AM - 1 PM: Med" />
                  <div className="h-6 bg-purple-600 rounded-md" title="1 PM - 3 PM: High" />
                  <div className="h-6 bg-purple-200 rounded-md" title="3 PM - 5 PM: Low" />
                  <div className="h-6 bg-purple-500 rounded-md" title="5 PM - 7 PM: Med" />
                  <div className="h-6 bg-purple-600 rounded-md" title="7 PM+: Peak" />
                </div>
                <span className="text-[11px] font-semibold text-slate-500">■■■■■■</span>
              </div>

              {/* Tuesday (Busiest) */}
              <div className="space-y-2 text-center">
                <span className="text-xs font-bold text-purple-700 bg-purple-50 py-0.5 px-2 rounded-full border border-purple-200">
                  Tuesday ★
                </span>
                <div className="grid grid-cols-3 gap-1 p-2 bg-purple-50/50 rounded-xl border border-purple-200/80">
                  <div className="h-6 bg-purple-600 rounded-md" />
                  <div className="h-6 bg-purple-700 rounded-md" />
                  <div className="h-6 bg-purple-600 rounded-md" />
                  <div className="h-6 bg-purple-700 rounded-md" />
                  <div className="h-6 bg-purple-600 rounded-md" />
                  <div className="h-6 bg-purple-700 rounded-md" />
                  <div className="h-6 bg-purple-600 rounded-md" />
                  <div className="h-6 bg-purple-700 rounded-md" />
                  <div className="h-6 bg-purple-600 rounded-md" />
                </div>
                <span className="text-[11px] font-bold text-purple-600">■■■■■■■■■</span>
              </div>

              {/* Wednesday */}
              <div className="space-y-2 text-center">
                <span className="text-xs font-bold text-slate-700">Wednesday</span>
                <div className="grid grid-cols-2 gap-1 p-2 bg-slate-50 rounded-xl border border-slate-200/80">
                  <div className="h-6 bg-purple-200 rounded-md" />
                  <div className="h-6 bg-purple-600 rounded-md" />
                  <div className="h-6 bg-purple-400 rounded-md" />
                  <div className="h-6 bg-slate-200 rounded-md" />
                </div>
                <span className="text-[11px] font-semibold text-slate-500">■■■■</span>
              </div>

              {/* Thursday */}
              <div className="space-y-2 text-center">
                <span className="text-xs font-bold text-slate-700">Thursday</span>
                <div className="grid grid-cols-2 gap-1 p-2 bg-slate-50 rounded-xl border border-slate-200/80">
                  <div className="h-6 bg-purple-600 rounded-md" />
                  <div className="h-6 bg-purple-500 rounded-md" />
                  <div className="h-6 bg-purple-600 rounded-md" />
                  <div className="h-6 bg-purple-400 rounded-md" />
                  <div className="h-6 bg-purple-600 rounded-md" />
                  <div className="h-6 bg-purple-300 rounded-md" />
                </div>
                <span className="text-[11px] font-semibold text-slate-500">■■■■■■■</span>
              </div>

              {/* Friday */}
              <div className="space-y-2 text-center">
                <span className="text-xs font-bold text-slate-700">Friday</span>
                <div className="grid grid-cols-2 gap-1 p-2 bg-slate-50 rounded-xl border border-slate-200/80">
                  <div className="h-6 bg-purple-400 rounded-md" />
                  <div className="h-6 bg-purple-300 rounded-md" />
                  <div className="h-6 bg-slate-200 rounded-md" />
                  <div className="h-6 bg-slate-100 rounded-md" />
                </div>
                <span className="text-[11px] font-semibold text-slate-500">■■■</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: MAINTENANCE TREND */}
        {activeTab === "maintenance" && (
          <div className="animate-fade-in space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Monthly Repair Tickets Raised vs Resolved</span>
              <span className="font-bold text-amber-600">+18% vs last quarter</span>
            </div>

            {/* SVG Line / Area Chart */}
            <div className="w-full h-48 relative flex items-end pt-4 pb-6 px-4 bg-slate-50/70 rounded-xl border border-slate-200/60">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 400 120" preserveAspectRatio="none">
                {/* Horizontal Grid lines */}
                <line x1="0" y1="0" x2="400" y2="0" stroke="#e2e8f0" strokeDasharray="4 4" />
                <line x1="0" y1="40" x2="400" y2="40" stroke="#e2e8f0" strokeDasharray="4 4" />
                <line x1="0" y1="80" x2="400" y2="80" stroke="#e2e8f0" strokeDasharray="4 4" />
                <line x1="0" y1="120" x2="400" y2="120" stroke="#cbd5e1" strokeWidth="1" />

                {/* Area Fill under line */}
                <polygon
                  points="20,85 110,65 200,90 290,20 380,45 380,120 20,120"
                  fill="url(#maintenanceGradient)"
                  opacity="0.3"
                />

                <defs>
                  <linearGradient id="maintenanceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* The Line */}
                <polyline
                  points="20,85 110,65 200,90 290,20 380,45"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Data Points */}
                <circle cx="20" cy="85" r="5" fill="#F59E0B" stroke="#ffffff" strokeWidth="2" />
                <circle cx="110" cy="65" r="5" fill="#F59E0B" stroke="#ffffff" strokeWidth="2" />
                <circle cx="200" cy="90" r="5" fill="#F59E0B" stroke="#ffffff" strokeWidth="2" />
                <circle cx="290" cy="20" r="5" fill="#F59E0B" stroke="#ffffff" strokeWidth="2" />
                <circle cx="380" cy="45" r="5" fill="#F59E0B" stroke="#ffffff" strokeWidth="2" />
              </svg>

              {/* Month Labels along bottom */}
              <div className="absolute bottom-1 left-4 right-4 flex justify-between text-[11px] font-bold text-slate-600">
                <span>Jan (14)</span>
                <span>Feb (19)</span>
                <span>Mar (12)</span>
                <span className="text-amber-600 font-extrabold">Apr (28) ★</span>
                <span>May (23)</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Insight */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Analytics synced automatically</span>
        <button className="text-[#2563EB] font-semibold hover:underline">Download Report CSV →</button>
      </div>
    </div>
  );
}
