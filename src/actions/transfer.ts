"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function requestTransfer(formData: FormData) {
  const assetId = formData.get("assetId") as string;
  const toHolderId = formData.get("toHolderId") as string; // Target User ID

  const session = await auth();
  const user = session?.user as any;
  if (!user || !user.id) throw new Error("Unauthorized");

  const asset = await prisma.asset.findUnique({
    where: { id: assetId },
    include: { allocations: { where: { status: "ACTIVE" } } }
  });

  if (!asset || asset.status !== "ALLOCATED" || asset.allocations.length === 0) {
    throw new Error("Asset is not currently allocated.");
  }

  const currentAllocation = asset.allocations[0];
  const fromHolderId = currentAllocation.allocatedToUserId;

  if (!fromHolderId) {
    throw new Error("Asset is allocated to a department, not an individual. Transfer request not supported in this version.");
  }

  await prisma.transferRequest.create({
    data: {
      assetId,
      fromHolderId,
      toHolderId,
      requestedById: user.id,
      status: "REQUESTED"
    }
  });

  // Create a notification for the Asset Manager
  const assetManagers = await prisma.user.findMany({ where: { role: "ASSET_MANAGER" } });
  if (assetManagers.length > 0) {
    await prisma.notification.create({
      data: {
        recipientId: assetManagers[0].id,
        type: "TRANSFER",
        message: `${user.name} requested a transfer of ${asset.assetTag} to another user.`,
        relatedEntityType: "ASSET",
        relatedEntityId: asset.id
      }
    });
  }

  revalidatePath(`/assets/${assetId}`);
}
