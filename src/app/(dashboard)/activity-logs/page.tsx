import prisma from "@/lib/prisma";
import { Activity, Search, Filter } from "lucide-react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ActivityLogsPage() {
  const session = await auth();
  const user = session?.user as any;
  if (!user) redirect("/login");

  // Admin and Asset Managers see org-wide. Others see their own.
  const isPrivileged = user.role === "ADMIN" || user.role === "ASSET_MANAGER";
  
  const logs = await prisma.activityLog.findMany({
    where: isPrivileged ? {} : { actorId: user.id },
    include: { actor: true },
    orderBy: { timestamp: "desc" },
    take: 100 // Limit for hackathon purposes
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Activity Logs</h1>
          <p className="text-sm text-slate-600 mt-1">
            {isPrivileged 
              ? "Org-wide audit trail of all state-changing actions." 
              : "Audit trail of your actions and assigned assets."}
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-[16px] shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center gap-4 bg-slate-50/50">
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search logs by actor or action..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-[#2563EB]"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/70">
                <th className="py-3.5 px-4 w-48">Timestamp</th>
                <th className="py-3.5 px-4">Actor</th>
                <th className="py-3.5 px-4">Action</th>
                <th className="py-3.5 px-4">Entity Type</th>
                <th className="py-3.5 px-4 font-mono">Entity ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-900">
                    {log.actor?.name || "System"}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    {log.entityType}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-mono text-xs">
                    {log.entityId || "N/A"}
                  </td>
                </tr>
              ))}
              
              {logs.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500">
                    No activity logs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
