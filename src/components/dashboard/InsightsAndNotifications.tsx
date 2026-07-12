"use client";

import { useState } from "react";
import { Sparkles, Bell, Calendar, AlertTriangle, CheckCircle2, RefreshCw, ArrowRight, Clock, ShieldAlert, FileText } from "lucide-react";
import clsx from "clsx";

export default function InsightsAndNotifications() {
  const [isRefreshingAI, setIsRefreshingAI] = useState(false);
  const [activeCalendarTab, setActiveCalendarTab] = useState<"bookings" | "maintenance" | "audits">("bookings");

  const handleRefresh = () => {
    setIsRefreshingAI(true);
    setTimeout(() => setIsRefreshingAI(false), 800);
  };

  return (
    <div className="space-y-6">
      {/* AI Operational Summary */}
      <div className="bg-gradient-to-br from-blue-50/90 via-white to-purple-50/50 border border-blue-200/80 rounded-[16px] p-5 shadow-xs relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#2563EB]/5 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />
        
        <div className="flex items-center justify-between pb-3 border-b border-blue-100/80">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#2563EB] flex items-center justify-center text-white shadow-2xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              📈 Operational Summary
            </h2>
          </div>
          
          <button
            onClick={handleRefresh}
            disabled={isRefreshingAI}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/80 hover:bg-white text-xs font-semibold text-[#2563EB] border border-blue-200/80 shadow-2xs transition-all active:scale-95 disabled:opacity-50"
            title="Refresh AI Summary"
          >
            <RefreshCw className={clsx("w-3.5 h-3.5", isRefreshingAI && "animate-spin")} />
            <span>{isRefreshingAI ? "Synthesizing..." : "AI Sync"}</span>
          </button>
        </div>

        <div className="pt-4 space-y-2.5 text-xs sm:text-sm font-medium text-slate-800">
          <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/70 border border-white/80 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0 mt-1.5" />
            <p className="flex-1 leading-snug">
              <strong className="font-bold text-rose-600">14 assets</strong> are overdue for return across Engineering and Design.
            </p>
          </div>

          <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/70 border border-white/80 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1.5" />
            <p className="flex-1 leading-snug">
              <strong className="font-bold text-amber-600">3 maintenance requests</strong> require immediate manager approval.
            </p>
          </div>

          <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/70 border border-white/80 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#2563EB] shrink-0 mt-1.5" />
            <p className="flex-1 leading-snug">
              <strong className="font-bold text-[#2563EB]">Engineering</strong> has the highest asset utilization this week (88%).
            </p>
          </div>

          <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/70 border border-white/80 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0 mt-1.5" />
            <p className="flex-1 leading-snug">
              <strong className="font-bold text-purple-600">Meeting Room B2</strong> is fully booked today with 8 scheduled executive syncs.
            </p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-blue-100/60 flex items-center justify-between text-[11px] text-slate-500 font-medium">
          <span>Synthesized from 1,245 active assets</span>
          <span className="text-[#2563EB] font-semibold hover:underline cursor-pointer">View AI Diagnostics →</span>
        </div>
      </div>

      {/* Notifications Panel */}
      <div className="bg-white border border-slate-200/80 rounded-[16px] p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-slate-700" />
            <h2 className="text-base font-semibold text-slate-900 tracking-tight">
              Notifications
            </h2>
          </div>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-600 border border-rose-200">
            3 Unread
          </span>
        </div>

        <div className="divide-y divide-slate-100 pt-2 space-y-1">
          {/* Item 1: Unread */}
          <div className="p-3 bg-blue-50/40 hover:bg-blue-50 border-l-4 border-l-[#2563EB] rounded-r-xl transition-colors cursor-pointer">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                <span className="text-xs font-bold text-slate-900">⚠ Laptop overdue</span>
              </div>
              <span className="text-[10px] font-semibold text-[#2563EB] bg-blue-100 px-1.5 py-0.5 rounded">NEW</span>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              MacBook Pro (AF-0018) assigned to Priya Sharma was due yesterday.
            </p>
          </div>

          {/* Item 2: Unread */}
          <div className="p-3 bg-blue-50/40 hover:bg-blue-50 border-l-4 border-l-[#2563EB] rounded-r-xl transition-colors cursor-pointer">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-600 shrink-0" />
                <span className="text-xs font-bold text-slate-900">Meeting Room reminder</span>
              </div>
              <span className="text-[10px] font-semibold text-[#2563EB] bg-blue-100 px-1.5 py-0.5 rounded">NEW</span>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Room B2 booking begins in 15 minutes. Projector verified ready.
            </p>
          </div>

          {/* Item 3: Unread */}
          <div className="p-3 bg-blue-50/40 hover:bg-blue-50 border-l-4 border-l-[#2563EB] rounded-r-xl transition-colors cursor-pointer">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-bold text-slate-900">Maintenance approved</span>
              </div>
              <span className="text-[10px] font-semibold text-[#2563EB] bg-blue-100 px-1.5 py-0.5 rounded">NEW</span>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Screen replacement for AF-0002 approved by Asset Manager.
            </p>
          </div>

          {/* Item 4: Read */}
          <div className="p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer border-l-4 border-l-transparent">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-700">Transfer request</span>
              <span className="text-[10px] text-slate-400">2h ago</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Raj Kumar requested transfer of Dell 27&quot; Monitor to Priya.
            </p>
          </div>

          {/* Item 5: Read */}
          <div className="p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer border-l-4 border-l-transparent">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-700">Audit discrepancy</span>
              <span className="text-[10px] text-slate-400">Yesterday</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              IT Server Room B count discrepancy flagged during routine check.
            </p>
          </div>
        </div>
      </div>

      {/* Calendar Widget & Schedule */}
      <div className="bg-white border border-slate-200/80 rounded-[16px] p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            <h2 className="text-base font-semibold text-slate-900 tracking-tight">
              Calendar & Schedule
            </h2>
          </div>
          <span className="text-xs font-medium text-slate-500">Jul 12, 2026</span>
        </div>

        {/* Tab Filters */}
        <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl my-3 text-xs font-semibold">
          <button
            onClick={() => setActiveCalendarTab("bookings")}
            className={clsx(
              "py-1.5 rounded-lg transition-all",
              activeCalendarTab === "bookings"
                ? "bg-white text-[#2563EB] shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            )}
          >
            Bookings (4)
          </button>
          <button
            onClick={() => setActiveCalendarTab("maintenance")}
            className={clsx(
              "py-1.5 rounded-lg transition-all",
              activeCalendarTab === "maintenance"
                ? "bg-white text-amber-600 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            )}
          >
            Repairs (2)
          </button>
          <button
            onClick={() => setActiveCalendarTab("audits")}
            className={clsx(
              "py-1.5 rounded-lg transition-all",
              activeCalendarTab === "audits"
                ? "bg-white text-emerald-600 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            )}
          >
            Deadlines (3)
          </button>
        </div>

        {/* Dynamic List based on active tab */}
        <div className="space-y-2.5 pt-1">
          {activeCalendarTab === "bookings" && (
            <>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-purple-50/50 border border-purple-100">
                <div>
                  <p className="text-xs font-bold text-slate-900">Room B2 - Executive Sync</p>
                  <p className="text-[11px] text-slate-500">Booked by Raj Kumar • 8 Attendees</p>
                </div>
                <span className="text-xs font-semibold px-2 py-1 bg-purple-100 text-purple-700 rounded-lg">
                  2:00 PM
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-purple-50/30 border border-purple-100">
                <div>
                  <p className="text-xs font-bold text-slate-900">Honda Civic - Client Visit</p>
                  <p className="text-[11px] text-slate-500">Booked by Sales Dept • Vehicle AF-0003</p>
                </div>
                <span className="text-xs font-semibold px-2 py-1 bg-purple-100 text-purple-700 rounded-lg">
                  4:30 PM
                </span>
              </div>
            </>
          )}

          {activeCalendarTab === "maintenance" && (
            <>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50/60 border border-amber-100">
                <div>
                  <p className="text-xs font-bold text-slate-900">AC Unit 3 Filter Check</p>
                  <p className="text-[11px] text-slate-500">Scheduled by Facility Mgmt • HQ 2nd Floor</p>
                </div>
                <span className="text-xs font-semibold px-2 py-1 bg-amber-100 text-amber-700 rounded-lg">
                  Tomorrow
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50/30 border border-amber-100">
                <div>
                  <p className="text-xs font-bold text-slate-900">Server Battery Backup Test</p>
                  <p className="text-[11px] text-slate-500">Technician: Dave Miller • IT Room A</p>
                </div>
                <span className="text-xs font-semibold px-2 py-1 bg-amber-100 text-amber-700 rounded-lg">
                  Jul 15
                </span>
              </div>
            </>
          )}

          {activeCalendarTab === "audits" && (
            <>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-rose-50/60 border border-rose-100">
                <div>
                  <p className="text-xs font-bold text-slate-900">Return Deadline: AF-0018</p>
                  <p className="text-[11px] text-slate-500">Holder: Priya Sharma • Design Dept</p>
                </div>
                <span className="text-xs font-bold px-2 py-1 bg-rose-100 text-rose-700 rounded-lg">
                  OVERDUE
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100">
                <div>
                  <p className="text-xs font-bold text-slate-900">Q3 Physical Audit Cycle</p>
                  <p className="text-[11px] text-slate-500">Scope: All High-Value Laptops & Servers</p>
                </div>
                <span className="text-xs font-semibold px-2 py-1 bg-emerald-100 text-emerald-700 rounded-lg">
                  Jul 18
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
