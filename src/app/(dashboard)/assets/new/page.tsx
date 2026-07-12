import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AssetRegistrationForm from "./AssetRegistrationForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function NewAssetPage() {
  const session = await auth();
  const role = (session?.user as any)?.role;
  
  if (role !== "ADMIN" && role !== "ASSET_MANAGER") {
    redirect("/assets");
  }

  const categories = await prisma.assetCategory.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <div className="space-y-6">
      <div>
        <Link href="/assets" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Assets
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Register Asset</h1>
        <p className="text-muted-foreground mt-1">Enter details to add a new asset to the registry.</p>
      </div>
      
      <AssetRegistrationForm categories={categories} />
    </div>
  );
}
