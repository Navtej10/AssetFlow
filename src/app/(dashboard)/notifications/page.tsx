import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { Bell, AlertTriangle, CheckCircle2, Clock, ShieldAlert, MailOpen, Info } from "lucide-react";
import { markAllNotificationsRead } from "./actions";

export const dynamic = "force-dynamic";

export default async function NotificationsPage() {
  const session = await auth();
  const user = session?.user as any;

  // Real DB notifications
  const dbNotifications = await prisma.notification.findMany({
    where: { recipientId: user?.id },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Notifications & Alerts</h1>
          <p className="text-sm text-slate-600 mt-1">Review urgent asset overdues, transfer requests, and automated audit reminders.</p>
        </div>
        <form action={markAllNotificationsRead}>
          <button className="px-4 py-2 bg-white border border-slate-200/80 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2 shadow-2xs transition-colors">
            <MailOpen className="w-4 h-4 text-[#2563EB]" />
            <span>Mark all read</span>
          </button>
        </form>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-[16px] p-5 shadow-xs divide-y divide-slate-100">
        {dbNotifications.length === 0 ? (
          <div className="py-8 text-center text-slate-500 text-sm">
            You have no notifications. You&apos;re all caught up!
          </div>
        ) : (
          dbNotifications.map((notification) => {
            let Icon = Info;
            let iconColor = "bg-blue-100 text-blue-600";
            
            if (notification.type === "ALERT" || notification.type === "OVERDUE") {
              Icon = AlertTriangle;
              iconColor = "bg-rose-100 text-rose-600";
            } else if (notification.type === "SUCCESS" || notification.type === "APPROVED") {
              Icon = CheckCircle2;
              iconColor = "bg-emerald-100 text-emerald-600";
            } else if (notification.type === "REMINDER") {
              Icon = Clock;
              iconColor = "bg-purple-100 text-purple-600";
            } else if (notification.type === "SECURITY") {
              Icon = ShieldAlert;
              iconColor = "bg-amber-100 text-amber-600";
            } else if (notification.type === "TRANSFER") {
              Icon = Bell;
              iconColor = "bg-blue-100 text-[#2563EB]";
            }

            return (
              <div key={notification.id} className={`py-4 flex items-start gap-4 ${notification.isRead ? 'opacity-60' : ''}`}>
                <div className={`w-10 h-10 rounded-xl ${iconColor} flex items-center justify-center shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">{notification.type}</span>
                    {!notification.isRead && (
                      <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    {notification.message}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-2">
                    {notification.createdAt.toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
