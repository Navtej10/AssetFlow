"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export async function createAsset(formData: FormData) {
  const name = formData.get("name") as string;
  const categoryId = formData.get("categoryId") as string;
  const serialNumber = formData.get("serialNumber") as string;
  const condition = formData.get("condition") as string;
  const location = formData.get("location") as string;
  const isBookable = formData.get("isBookable") === "on";

  // Generate Asset Tag (e.g., AF-0001)
  const count = await prisma.asset.count();
  const assetTag = `AF-${(count + 1).toString().padStart(4, "0")}`;

  await prisma.asset.create({
    data: {
      name,
      categoryId,
      assetTag,
      serialNumber,
      condition,
      location,
      isBookable,
      status: "AVAILABLE",
    },
  });

  revalidatePath("/assets");
  redirect("/assets");
}

export async function allocateAsset(formData: FormData) {
  const assetId = formData.get("assetId") as string;
  const allocatedToId = formData.get("allocatedToId") as string;
  const expectedReturnDate = formData.get("expectedReturnDate") as string;

  const session = await auth();
  const user = session?.user as any;
  if (!user || !user.id) {
    throw new Error("Unauthorized");
  }

  const asset = await prisma.asset.findUnique({ where: { id: assetId } });
  if (!asset || asset.status !== "AVAILABLE") {
    throw new Error("Asset is not available for allocation.");
  }

  await prisma.$transaction([
    prisma.asset.update({
      where: { id: assetId },
      data: { status: "ALLOCATED" },
    }),
    prisma.allocation.create({
      data: {
        assetId,
        allocatedToType: "EMPLOYEE",
        allocatedToUserId: allocatedToId,
        allocatedById: user.id,
        expectedReturnDate: expectedReturnDate ? new Date(expectedReturnDate) : null,
      }
    }),
    prisma.activityLog.create({
      data: {
        actorId: user.id,
        action: "ALLOCATED_ASSET",
        entityType: "ASSET",
        entityId: assetId,
      }
    })
  ]);

  revalidatePath("/assets");
  revalidatePath(`/assets/${assetId}`);
}
