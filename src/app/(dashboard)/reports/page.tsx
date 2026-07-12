"use client";

import { useState } from "react";
import { BarChart3, Download, Filter, Calendar, FileSpreadsheet, PieChart, TrendingUp } from "lucide-react";
import clsx from "clsx";

export default function ReportsPage() {
  const [reportType, setReportType] = useState("ALL");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Enterprise Reports & Analytics</h1>
          <p className="text-sm text-slate-600 mt-1">Export executive CSV summaries, depreciation schedules, and compliance audit logs.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200/80 rounded-[16px] p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold mb-3">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-base text-slate-900">Asset Valuation & Depreciation</h2>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Comprehensive financial report detailing acquisition costs, straight-line depreciation, and current book value of all active assets.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-600">Updated Today</span>
            <a href="/api/reports/valuation" className="text-xs font-bold text-[#2563EB] hover:underline flex items-center gap-1">
              Download Report (.CSV) →
            </a>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-[16px] p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold mb-3">
              <PieChart className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-base text-slate-900">Department Custody Audit</h2>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Department-by-department allocation breakdown verifying physical custody matching against HR active employee rosters.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-600">Updated Today</span>
            <a href="/api/reports/custody" className="text-xs font-bold text-[#2563EB] hover:underline flex items-center gap-1">
              Download Report (.CSV) →
            </a>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-[16px] p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold mb-3">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-base text-slate-900">Maintenance & Repair Logs</h2>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Historical repair ticket volume, mean time to resolution, and parts expenditure breakdown across hardware and vehicle fleet.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-600">Updated Today</span>
            <a href="/api/reports/maintenance" className="text-xs font-bold text-[#2563EB] hover:underline flex items-center gap-1">
              Download Report (.CSV) →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
