import prisma from "@/lib/prisma";
import { createAuditCycle, verifyAuditItem, closeAuditCycle } from "@/actions/audit";
import { ClipboardCheck, ShieldAlert, CheckCircle, Search } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AuditPage() {
  const auditCycles = await prisma.auditCycle.findMany({
    include: {
      auditItems: {
        include: { asset: true }
      }
    },
    orderBy: { startDate: "desc" }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Audits</h1>
        <p className="text-muted-foreground mt-1">Conduct physical verifications and track missing assets.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {auditCycles.length === 0 ? (
            <div className="bg-card border border-border rounded-xl p-8 text-center text-muted-foreground shadow-sm">
              No audit cycles found. Create one to begin auditing.
            </div>
          ) : (
            auditCycles.map(cycle => (
              <div key={cycle.id} className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold text-lg">{cycle.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      {cycle.startDate.toLocaleDateString()} - {cycle.endDate.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold uppercase tracking-wide ${
                      cycle.status === 'ACTIVE' ? 'bg-primary/10 text-primary' :
                      cycle.status === 'CLOSED' ? 'bg-muted text-muted-foreground' :
                      'bg-warning/10 text-warning'
                    }`}>
                      {cycle.status}
                    </span>
                    {cycle.status === 'ACTIVE' && (
                      <form action={closeAuditCycle}>
                        <input type="hidden" name="cycleId" value={cycle.id} />
                        <button className="text-sm bg-muted hover:bg-muted/80 text-foreground px-3 py-1.5 rounded-lg transition-colors border border-border">
                          Close Cycle
                        </button>
                      </form>
                    )}
                  </div>
                </div>
                
                <div className="p-0">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
                      <tr>
                        <th className="px-4 py-3 font-medium">Asset</th>
                        <th className="px-4 py-3 font-medium">Result</th>
                        <th className="px-4 py-3 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cycle.auditItems.map((item) => (
                        <tr key={item.id} className="border-b border-border last:border-0 hover:bg-muted/10 transition-colors">
                          <td className="px-4 py-3">
                            <span className="font-medium">{item.asset.name}</span>
                            <span className="text-muted-foreground ml-2 text-xs">({item.asset.assetTag})</span>
                          </td>
                          <td className="px-4 py-3">
                            {item.result ? (
                              <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${
                                item.result === 'VERIFIED' ? 'bg-success/10 text-success' :
                                item.result === 'MISSING' ? 'bg-error/10 text-error' :
                                'bg-warning/10 text-warning'
                              }`}>
                                {item.result}
                              </span>
                            ) : (
                              <span className="text-muted-foreground text-xs italic">Pending...</span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            {cycle.status === 'ACTIVE' && (
                              <form action={verifyAuditItem} className="flex items-center gap-2">
                                <input type="hidden" name="itemId" value={item.id} />
                                <select 
                                  name="result" 
                                  className="text-xs px-2 py-1 rounded border border-border bg-background"
                                  defaultValue={item.result || ""}
                                >
                                  <option value="" disabled>Mark as...</option>
                                  <option value="VERIFIED">Verified</option>
                                  <option value="MISSING">Missing</option>
                                  <option value="DAMAGED">Damaged</option>
                                </select>
                                <button className="bg-primary text-primary-foreground p-1 rounded hover:bg-primary/90">
                                  <CheckCircle className="w-3.5 h-3.5" />
                                </button>
                              </form>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))
          )}
        </div>

        <div>
          <div className="bg-card border border-border rounded-xl shadow-sm p-6 sticky top-24">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ClipboardCheck className="w-5 h-5 text-primary" />
              New Audit Cycle
            </h2>
            <form action={createAuditCycle} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">Cycle Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="e.g. Q3 Organization Audit"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-foreground mb-1">Start Date</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                />
              </div>

              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-foreground mb-1">End Date</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2 rounded-lg font-medium transition-colors mt-2"
              >
                Create Cycle
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
