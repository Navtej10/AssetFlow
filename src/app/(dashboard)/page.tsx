import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { Package, Wrench, FileCheck, ArrowRightLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardHome() {
  const session = await auth();

  // Fetch real KPI data
  const totalAssets = await prisma.asset.count({ where: { status: { notIn: ["DISPOSED", "RETIRED"] } } });
  const allocated = await prisma.asset.count({ where: { status: "ALLOCATED" } });
  const inMaintenance = await prisma.asset.count({ where: { status: "UNDER_MAINTENANCE" } });
  const pendingAudits = await prisma.auditCycle.count({ where: { status: "ACTIVE" } });

  const stats = [
    { title: "Total Active Assets", value: totalAssets, trend: "Overall", icon: Package },
    { title: "Allocated", value: allocated, trend: "Currently in use", icon: ArrowRightLeft },
    { title: "In Maintenance", value: inMaintenance, trend: "Requires attention", icon: Wrench, color: "text-warning" },
    { title: "Active Audits", value: pendingAudits, trend: "Ongoing cycles", icon: FileCheck, color: "text-primary" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome, {session?.user?.name || "User"}</h1>
        <p className="text-muted-foreground mt-1">
          Here is the overview of your organization's assets and resources.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={i} className="p-6 rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-md relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110`} />
            <div className="flex justify-between items-start relative z-10">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">{stat.title}</h3>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-foreground">{stat.value}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{stat.trend}</p>
              </div>
              <div className={`p-3 rounded-xl bg-muted/50 ${stat.color || "text-muted-foreground"}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="p-6 rounded-xl border border-border bg-card shadow-sm h-96 flex flex-col">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-border rounded-lg bg-muted/20">
            <p className="text-muted-foreground text-sm">Activity feed will appear here</p>
          </div>
        </div>
        <div className="p-6 rounded-xl border border-border bg-card shadow-sm h-96 flex flex-col">
          <h2 className="text-lg font-semibold mb-4">Upcoming Returns</h2>
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-border rounded-lg bg-muted/20">
            <p className="text-muted-foreground text-sm">Overdue and upcoming returns will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
}
