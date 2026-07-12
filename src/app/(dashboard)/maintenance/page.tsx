import prisma from "@/lib/prisma";
import { raiseMaintenanceRequest, approveMaintenance, resolveMaintenance } from "@/actions/maintenance";
import { Wrench, CheckCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function MaintenancePage() {
  const assets = await prisma.asset.findMany({ orderBy: { name: "asc" }});
  
  const maintenanceRequests = await prisma.maintenanceRequest.findMany({
    include: { asset: true, raisedBy: true },
    orderBy: { id: "desc" }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Maintenance</h1>
        <p className="text-muted-foreground mt-1">Manage asset repairs and maintenance requests.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-border bg-muted/30">
              <h2 className="font-semibold text-lg">Active & Recent Requests</h2>
            </div>
            
            {maintenanceRequests.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                No maintenance requests found.
              </div>
            ) : (
              <div className="divide-y divide-border">
                {maintenanceRequests.map(req => (
                  <div key={req.id} className="p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-3">
                        <div className="bg-warning/10 text-warning p-2 rounded-md h-fit">
                          <Wrench className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{req.asset.name} <span className="text-muted-foreground font-normal">({req.asset.assetTag})</span></h3>
                          <p className="text-sm text-muted-foreground mt-1">{req.issueDescription}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${
                              req.priority === 'CRITICAL' ? 'bg-error/10 text-error' :
                              req.priority === 'HIGH' ? 'bg-warning/10 text-warning' :
                              'bg-primary/10 text-primary'
                            }`}>
                              {req.priority} Priority
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${
                              req.status === 'PENDING' ? 'bg-muted text-muted-foreground' :
                              req.status === 'APPROVED' ? 'bg-primary/10 text-primary' :
                              req.status === 'RESOLVED' ? 'bg-success/10 text-success' :
                              'bg-muted text-muted-foreground'
                            }`}>
                              {req.status}
                            </span>
                            <span className="text-xs text-muted-foreground border-l border-border pl-2">
                              Reported by {req.raisedBy.name}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        {req.status === 'PENDING' && (
                          <form action={approveMaintenance}>
                            <input type="hidden" name="requestId" value={req.id} />
                            <button className="text-sm bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-1.5 rounded-lg transition-colors">
                              Approve
                            </button>
                          </form>
                        )}
                        {req.status === 'APPROVED' && (
                          <form action={resolveMaintenance}>
                            <input type="hidden" name="requestId" value={req.id} />
                            <button className="text-sm border border-success text-success hover:bg-success/10 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                              <CheckCircle className="w-4 h-4" /> Resolve
                            </button>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="bg-card border border-border rounded-xl shadow-sm p-6 sticky top-24">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-primary" />
              Raise Request
            </h2>
            <form action={raiseMaintenanceRequest} className="space-y-4">
              <div>
                <label htmlFor="assetId" className="block text-sm font-medium text-foreground mb-1">Asset</label>
                <select
                  id="assetId"
                  name="assetId"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                >
                  <option value="">Select asset...</option>
                  {assets.map(a => (
                    <option key={a.id} value={a.id}>{a.name} ({a.assetTag})</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="issueDescription" className="block text-sm font-medium text-foreground mb-1">Issue Description</label>
                <textarea
                  id="issueDescription"
                  name="issueDescription"
                  required
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm resize-none"
                  placeholder="Describe the issue..."
                />
              </div>

              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-foreground mb-1">Priority</label>
                <select
                  id="priority"
                  name="priority"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                  <option value="CRITICAL">Critical</option>
                </select>
              </div>
              
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2 rounded-lg font-medium transition-colors mt-2"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
