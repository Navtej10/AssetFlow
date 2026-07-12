import prisma from "@/lib/prisma";
import { createAsset } from "@/actions/asset";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function NewAssetPage() {
  const categories = await prisma.assetCategory.findMany({
    orderBy: { name: "asc" }
  });

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/assets" className="p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Register Asset</h1>
          <p className="text-muted-foreground mt-1">Add a new physical asset or resource to the system.</p>
        </div>
      </div>

      <form action={createAsset} className="bg-card border border-border rounded-xl shadow-sm p-6 space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">Asset Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="e.g., MacBook Pro 16-inch"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="categoryId" className="block text-sm font-medium text-foreground mb-1">Category</label>
              <select
                id="categoryId"
                name="categoryId"
                required
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              >
                <option value="">Select a category</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="serialNumber" className="block text-sm font-medium text-foreground mb-1">Serial Number (Optional)</label>
              <input
                type="text"
                id="serialNumber"
                name="serialNumber"
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="e.g., C02XXXXXXX"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="condition" className="block text-sm font-medium text-foreground mb-1">Condition</label>
              <select
                id="condition"
                name="condition"
                required
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              >
                <option value="NEW">New</option>
                <option value="GOOD">Good</option>
                <option value="FAIR">Fair</option>
                <option value="POOR">Poor</option>
                <option value="DAMAGED">Damaged</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-foreground mb-1">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="e.g., IT Storage Room 2"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg border border-border">
            <input
              type="checkbox"
              id="isBookable"
              name="isBookable"
              className="w-5 h-5 rounded border-border text-primary focus:ring-primary/50"
            />
            <div>
              <label htmlFor="isBookable" className="font-medium text-foreground">Is Bookable Resource?</label>
              <p className="text-sm text-muted-foreground">Check this if the asset is shared and should be bookable via calendar (e.g. conference room, shared vehicle).</p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border flex justify-end gap-3">
          <Link
            href="/assets"
            className="px-4 py-2 rounded-lg font-medium text-muted-foreground hover:bg-muted transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm"
          >
            <Save className="w-4 h-4" />
            Save Asset
          </button>
        </div>
      </form>
    </div>
  );
}
