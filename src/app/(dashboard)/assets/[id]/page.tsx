import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, UserCircle, Calendar } from "lucide-react";
import { allocateAsset } from "@/actions/asset";

export const dynamic = "force-dynamic";

export default async function AssetDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const asset = await prisma.asset.findUnique({
    where: { id: resolvedParams.id },
    include: {
      category: true,
      allocations: {
        include: { receiverUser: true, allocatedBy: true },
        orderBy: { allocationDate: "desc" }
      }
    }
  });

  if (!asset) notFound();

  const users = await prisma.user.findMany({ orderBy: { name: "asc" } });

  const currentAllocation = asset.allocations.find(a => a.status === "ACTIVE");

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/assets" className="p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">{asset.name}</h1>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                asset.status === 'AVAILABLE' ? 'bg-success/10 text-success' :
                asset.status === 'ALLOCATED' ? 'bg-primary/10 text-primary' :
                'bg-muted text-muted-foreground'
              }`}>
                {asset.status}
              </span>
            </div>
            <p className="text-muted-foreground mt-1">{asset.assetTag} • {asset.category.name}</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Asset Details</h2>
            <div className="grid grid-cols-2 gap-y-4 text-sm">
              <div>
                <p className="text-muted-foreground">Serial Number</p>
                <p className="font-medium">{asset.serialNumber || "N/A"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Condition</p>
                <p className="font-medium">{asset.condition}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Location</p>
                <p className="font-medium">{asset.location || "N/A"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Bookable</p>
                <p className="font-medium">{asset.isBookable ? "Yes" : "No"}</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Allocation History</h2>
            {asset.allocations.length === 0 ? (
              <p className="text-sm text-muted-foreground">No allocation history.</p>
            ) : (
              <div className="space-y-4">
                {asset.allocations.map((alloc) => (
                  <div key={alloc.id} className="flex items-start gap-4 p-4 rounded-lg border border-border bg-muted/20">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex flex-shrink-0 items-center justify-center text-primary mt-1">
                      <UserCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {alloc.status === "ACTIVE" ? "Currently allocated to " : "Was allocated to "}
                        <span className="font-bold">{alloc.receiverUser?.name}</span>
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {alloc.allocationDate.toLocaleDateString()} 
                        {alloc.actualReturnDate ? ` - ${alloc.actualReturnDate.toLocaleDateString()}` : " (Ongoing)"}
                      </p>
                    </div>
                    <div className="ml-auto">
                      <span className={`text-xs px-2 py-1 rounded-md font-medium ${
                        alloc.status === 'ACTIVE' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                      }`}>
                        {alloc.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          {asset.status === "AVAILABLE" ? (
            <div className="bg-card border border-border rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Allocate Asset</h2>
              <form action={allocateAsset} className="space-y-4">
                <input type="hidden" name="assetId" value={asset.id} />
                
                <div>
                  <label htmlFor="allocatedToId" className="block text-sm font-medium text-foreground mb-1">Assign To (User)</label>
                  <select
                    id="allocatedToId"
                    name="allocatedToId"
                    required
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  >
                    <option value="">Select user...</option>
                    {users.map(u => (
                      <option key={u.id} value={u.id}>{u.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="expectedReturnDate" className="block text-sm font-medium text-foreground mb-1">Expected Return Date</label>
                  <input
                    type="date"
                    id="expectedReturnDate"
                    name="expectedReturnDate"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2 rounded-lg font-medium transition-colors"
                >
                  Allocate Asset
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-xl shadow-sm p-6 sticky top-24 text-center space-y-4">
              <h2 className="text-lg font-semibold">Currently Unavailable</h2>
              <p className="text-sm text-muted-foreground">This asset is currently in the <strong>{asset.status}</strong> state.</p>
              
              {currentAllocation && (
                <div className="p-4 bg-muted/50 rounded-lg text-left mt-4 border border-border">
                  <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider mb-1">Current Holder</p>
                  <p className="font-medium flex items-center gap-2">
                    <UserCircle className="w-5 h-5 text-primary" />
                    {currentAllocation.receiverUser?.name}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
