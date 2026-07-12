import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const maintenanceRequests = await prisma.maintenanceRequest.findMany({
    include: {
      asset: true,
      raisedBy: true,
      approvedBy: true
    }
  });

  const header = "Request ID,Asset Tag,Asset Name,Priority,Status,Issue,Raised By,Approved By,Resolved At\n";
  const rows = maintenanceRequests.map(m => 
    `"${m.id}","${m.asset.assetTag}","${m.asset.name}","${m.priority}","${m.status}","${m.issueDescription.replace(/"/g, '""')}","${m.raisedBy.name}","${m.approvedBy?.name || ""}","${m.resolvedAt?.toISOString() || ""}"`
  ).join("\n");

  return new Response(header + rows, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": 'attachment; filename="maintenance_costs.csv"'
    }
  });
}
