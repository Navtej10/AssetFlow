import prisma from "@/lib/prisma";
import { Bell, AlertTriangle, CheckCircle2, Clock, ShieldAlert, MailOpen } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function NotificationsPage() {
  const notifications = await prisma.notification.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Notifications & Alerts</h1>
          <p className="text-sm text-slate-600 mt-1">Review urgent asset overdues, transfer requests, and automated audit reminders.</p>
        </div>
        <button className="px-4 py-2 bg-white border border-slate-200/80 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2 shadow-2xs">
          <MailOpen className="w-4 h-4 text-[#2563EB]" />
          <span>Mark all read</span>
        </button>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-[16px] p-5 shadow-xs divide-y divide-slate-100">
        {/* Urgent Item */}
        <div className="py-4 first:pt-1 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-slate-900">⚠ Laptop Overdue Alert</span>
              <span className="text-xs text-rose-600 font-semibold bg-rose-50 px-2 py-0.5 rounded border border-rose-100">Action Required</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Asset <strong className="text-slate-900">AF-0018 (MacBook Pro 16&quot;)</strong> allocated to Priya Sharma is now 2 days overdue. Please trigger a check-in reminder or re-schedule allocation.
            </p>
            <p className="text-[11px] text-slate-400 mt-2">Received 10 minutes ago • System Auto-Trigger</p>
          </div>
        </div>

        {/* Meeting Room Reminder */}
        <div className="py-4 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-slate-900">Meeting Room B2 Booking Reminder</span>
              <span className="text-xs text-purple-600 font-semibold bg-purple-50 px-2 py-0.5 rounded border border-purple-100">15m to Start</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Executive Sync booking starts at 2:00 PM. Projector and room audio have been verified by Facilities.
            </p>
            <p className="text-[11px] text-slate-400 mt-2">Received 45 minutes ago • Resource Scheduler</p>
          </div>
        </div>

        {/* Maintenance Approved */}
        <div className="py-4 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-slate-900">Maintenance Request Approved</span>
              <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">Resolved</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Screen repair ticket for <strong className="text-slate-900">AF-0002 (Dell XPS 15)</strong> has been approved by Kushal Joshi. Technician Dave Miller assigned.
            </p>
            <p className="text-[11px] text-slate-400 mt-2">Received 2 hours ago • Maintenance Workflow</p>
          </div>
        </div>

        {/* Transfer Request */}
        <div className="py-4 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#2563EB] flex items-center justify-center shrink-0">
            <Bell className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-slate-900">Transfer Request Submitted</span>
              <span className="text-xs text-slate-500 font-medium">Pending Review</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Raj Kumar requested peer-to-peer transfer of <strong className="text-slate-900">AF-0021 (MacBook Pro M3 Max)</strong> to Priya Sharma.
            </p>
            <p className="text-[11px] text-slate-400 mt-2">Received 3 hours ago • Transfer Queue</p>
          </div>
        </div>
      </div>
    </div>
  );
}
