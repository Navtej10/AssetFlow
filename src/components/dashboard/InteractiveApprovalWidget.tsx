"use client";

import { useState } from "react";
import { Check, X, ArrowRight, Laptop, Wrench, RotateCcw, ShieldCheck } from "lucide-react";
import clsx from "clsx";

interface ApprovalItem {
  id: string;
  type: "TRANSFER" | "MAINTENANCE" | "RETURN";
  title: string;
  subtitle: string;
  details: string;
  time: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

export default function InteractiveApprovalWidget() {
  const [items, setItems] = useState<ApprovalItem[]>([
    {
      id: "tr-1",
      type: "TRANSFER",
      title: "Transfer Request",
      subtitle: "Raj → Priya",
      details: "AF-0021 (MacBook Pro M3 Max)",
      time: "10 mins ago",
      status: "PENDING",
    },
    {
      id: "mt-1",
      type: "MAINTENANCE",
      title: "Maintenance",
      subtitle: "Laptop Screen Flickering",
      details: "AF-0002 (Dell XPS 15) • Priority: High",
      time: "28 mins ago",
      status: "PENDING",
    },
    {
      id: "rt-1",
      type: "RETURN",
      title: "Return Request",
      subtitle: "Early Return by Sameer",
      details: "AF-0015 (Sony 4K Projector)",
      time: "1 hour ago",
      status: "PENDING",
    },
  ]);

  const [toast, setToast] = useState<string | null>(null);

  const handleAction = (id: string, newStatus: "APPROVED" | "REJECTED") => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    const item = items.find((i) => i.id === id);
    if (item) {
      setToast(
        `${item.title} (${item.subtitle}) has been ${newStatus.toLowerCase()}.`
      );
      setTimeout(() => setToast(null), 3500);
    }
  };

  const pendingCount = items.filter((i) => i.status === "PENDING").length;

  return (
    <div className="bg-white border border-slate-200/80 rounded-[16px] p-5 shadow-xs flex flex-col h-full relative">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#2563EB]" />
          <h2 className="text-base font-semibold text-slate-900 tracking-tight">
            Pending Approvals
          </h2>
          {pendingCount > 0 && (
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200">
              {pendingCount} Pending
            </span>
          )}
        </div>
        <span className="text-[11px] text-slate-400 font-medium">
          Quick Actions
        </span>
      </div>

      {toast && (
        <div className="mt-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center justify-between animate-fade-in">
          <span>{toast}</span>
          <button
            onClick={() => setToast(null)}
            className="text-emerald-600 hover:text-emerald-900 ml-2"
          >
            ✕
          </button>
        </div>
      )}

      <div className="divide-y divide-slate-100 my-2 flex-1">
        {items.map((item) => (
          <div key={item.id} className="py-4 first:pt-2 last:pb-1">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div
                  className={clsx(
                    "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5",
                    item.type === "TRANSFER"
                      ? "bg-blue-100 text-[#2563EB]"
                      : item.type === "MAINTENANCE"
                      ? "bg-amber-100 text-amber-600"
                      : "bg-purple-100 text-purple-600"
                  )}
                >
                  {item.type === "TRANSFER" && <ArrowRight className="w-4 h-4" />}
                  {item.type === "MAINTENANCE" && <Wrench className="w-4 h-4" />}
                  {item.type === "RETURN" && <RotateCcw className="w-4 h-4" />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-slate-900">
                      {item.title}
                    </span>
                    <span className="text-[11px] text-slate-400 font-normal">
                      • {item.time}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-800 mt-0.5">
                    {item.subtitle}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{item.details}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons or Status Badge */}
            <div className="mt-3 pl-12 flex items-center gap-2">
              {item.status === "PENDING" ? (
                <>
                  <button
                    onClick={() => handleAction(item.id, "APPROVED")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-xs font-semibold shadow-2xs transition-all active:scale-95"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => handleAction(item.id, "REJECTED")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all active:scale-95"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>
                </>
              ) : (
                <div
                  className={clsx(
                    "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border animate-fade-in",
                    item.status === "APPROVED"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-rose-50 text-rose-700 border-rose-200"
                  )}
                >
                  {item.status === "APPROVED" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Approved</span>
                    </>
                  ) : (
                    <>
                      <X className="w-3.5 h-3.5 text-rose-600" />
                      <span>Rejected</span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Manager review queue</span>
        {pendingCount === 0 && (
          <span className="text-emerald-600 font-semibold flex items-center gap-1">
            <Check className="w-3.5 h-3.5" /> All caught up!
          </span>
        )}
      </div>
    </div>
  );
}
