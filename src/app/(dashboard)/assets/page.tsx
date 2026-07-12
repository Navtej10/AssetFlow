import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, Search } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AssetsPage() {
  const assets = await prisma.asset.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assets</h1>
          <p className="text-muted-foreground mt-1">Manage all physical assets and resources.</p>
        </div>
        <Link
          href="/assets/new"
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Register Asset
        </Link>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by tag, name, or serial..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Asset Tag</th>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Condition</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => (
                <tr key={asset.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-primary">
                    <Link href={`/assets/${asset.id}`}>{asset.assetTag}</Link>
                  </td>
                  <td className="px-6 py-4">{asset.name}</td>
                  <td className="px-6 py-4">{asset.category.name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      asset.status === 'AVAILABLE' ? 'bg-success/10 text-success' :
                      asset.status === 'ALLOCATED' ? 'bg-primary/10 text-primary' :
                      asset.status === 'UNDER_MAINTENANCE' ? 'bg-warning/10 text-warning' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {asset.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">{asset.condition}</td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/assets/${asset.id}`} className="text-primary hover:underline font-medium">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
              {assets.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                    No assets found. Try seeding the database via /api/seed
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
