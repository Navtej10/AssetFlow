import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const assets = await prisma.asset.findMany({
    include: { category: true }
  });

  const header = "Asset Tag,Name,Category,Status,Acquisition Date,Acquisition Cost,Condition\n";
  const rows = assets.map(a => 
    `"${a.assetTag}","${a.name}","${a.category.name}","${a.status}","${a.acquisitionDate?.toISOString() || ""}","${a.acquisitionCost || ""}","${a.condition}"`
  ).join("\n");

  return new Response(header + rows, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": 'attachment; filename="asset_valuation.csv"'
    }
  });
}
