"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, PackagePlus, ArrowRightLeft, CalendarPlus, Wrench, ClipboardCheck, X } from "lucide-react";

export default function QuickCreateFab() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 select-none">
      {isOpen && (
        <div className="flex flex-col gap-2.5 items-end animate-fade-in mb-1">
          <Link
            href="/assets/new"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white border border-slate-200/80 shadow-lg hover:shadow-xl text-slate-800 hover:text-[#2563EB] transition-all group active:scale-95"
          >
            <span className="text-xs sm:text-sm font-semibold">Register Asset</span>
            <div className="w-8 h-8 rounded-xl bg-[#2563EB]/10 group-hover:bg-[#2563EB] text-[#2563EB] group-hover:text-white flex items-center justify-center transition-colors shadow-2xs">
              <PackagePlus className="w-4 h-4" />
            </div>
          </Link>

          <Link
            href="/allocations"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white border border-slate-200/80 shadow-lg hover:shadow-xl text-slate-800 hover:text-emerald-600 transition-all group active:scale-95"
          >
            <span className="text-xs sm:text-sm font-semibold">Allocate Asset</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-100 group-hover:bg-emerald-600 text-emerald-700 group-hover:text-white flex items-center justify-center transition-colors shadow-2xs">
              <ArrowRightLeft className="w-4 h-4" />
            </div>
          </Link>

          <Link
            href="/bookings"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white border border-slate-200/80 shadow-lg hover:shadow-xl text-slate-800 hover:text-purple-600 transition-all group active:scale-95"
          >
            <span className="text-xs sm:text-sm font-semibold">Book Room / Resource</span>
            <div className="w-8 h-8 rounded-xl bg-purple-100 group-hover:bg-purple-600 text-purple-700 group-hover:text-white flex items-center justify-center transition-colors shadow-2xs">
              <CalendarPlus className="w-4 h-4" />
            </div>
          </Link>

          <Link
            href="/maintenance"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white border border-slate-200/80 shadow-lg hover:shadow-xl text-slate-800 hover:text-amber-600 transition-all group active:scale-95"
          >
            <span className="text-xs sm:text-sm font-semibold">Raise Maintenance</span>
            <div className="w-8 h-8 rounded-xl bg-amber-100 group-hover:bg-amber-600 text-amber-700 group-hover:text-white flex items-center justify-center transition-colors shadow-2xs">
              <Wrench className="w-4 h-4" />
            </div>
          </Link>

          <Link
            href="/audit"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white border border-slate-200/80 shadow-lg hover:shadow-xl text-slate-800 hover:text-slate-900 transition-all group active:scale-95"
          >
            <span className="text-xs sm:text-sm font-semibold">Start Audit</span>
            <div className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-slate-900 text-slate-700 group-hover:text-white flex items-center justify-center transition-colors shadow-2xs">
              <ClipboardCheck className="w-4 h-4" />
            </div>
          </Link>
        </div>
      )}

      {/* Main FAB Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-2xl bg-[#2563EB] hover:bg-[#1d4ed8] text-white flex items-center justify-center shadow-xl hover:shadow-2xl shadow-[#2563EB]/30 transition-all duration-300 hover:scale-105 active:scale-95"
        title="Quick Create Menu"
      >
        {isOpen ? (
          <X className="w-6 h-6 rotate-90 transition-transform duration-300" />
        ) : (
          <Plus className="w-6 h-6 transition-transform duration-300" />
        )}
      </button>
    </div>
  );
}
