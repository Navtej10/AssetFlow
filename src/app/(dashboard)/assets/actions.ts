"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export async function createAsset(formData: FormData) {
  const session = await auth();
  const role = (session?.user as any)?.role;
  if (role !== "ADMIN" && role !== "ASSET_MANAGER") {
    throw new Error("Unauthorized: Only Asset Managers can register assets.");
  }

  const name = formData.get("name") as string;
  const categoryId = formData.get("categoryId") as string;
  const serialNumber = formData.get("serialNumber") as string;
  const acquisitionDate = formData.get("acquisitionDate") as string;
  const acquisitionCost = formData.get("acquisitionCost") as string;
  const condition = formData.get("condition") as string;
  const location = formData.get("location") as string;
  const isBookable = formData.get("isBookable") === "true";

  // Auto-generate Asset Tag
  // Atomic transaction to generate tag safely
  const asset = await prisma.$transaction(async (tx) => {
    const count = await tx.asset.count();
    const assetTag = `AF-${String(count + 1).padStart(4, "0")}`;

    return tx.asset.create({
      data: {
        name,
        categoryId,
        assetTag,
        serialNumber: serialNumber || null,
        acquisitionDate: acquisitionDate ? new Date(acquisitionDate) : null,
        acquisitionCost: acquisitionCost ? parseFloat(acquisitionCost) : null,
        condition,
        location: location || null,
        isBookable,
        status: "AVAILABLE",
      },
    });
  });

  revalidatePath("/assets");
  redirect(`/assets/${asset.id}`);
}
