"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function raiseMaintenanceRequest(formData: FormData) {
  const assetId = formData.get("assetId") as string;
  const issueDescription = formData.get("issueDescription") as string;
  const priority = formData.get("priority") as string;

  const session = await auth();
  const user = session?.user as any;
  if (!user || !user.id) throw new Error("Unauthorized");

  await prisma.maintenanceRequest.create({
    data: {
      assetId,
      raisedById: user.id,
      issueDescription,
      priority,
      status: "PENDING"
    }
  });

  revalidatePath("/maintenance");
  revalidatePath(`/assets/${assetId}`);
}

export async function approveMaintenance(formData: FormData) {
  const requestId = formData.get("requestId") as string;
  
  const session = await auth();
  const admin = session?.user as any;
  if (!admin || !admin.id || admin.role !== "ASSET_MANAGER" && admin.role !== "ADMIN") {
    throw new Error("Unauthorized: Only Admins or Asset Managers can approve maintenance.");
  }

  const request = await prisma.maintenanceRequest.findUnique({ where: { id: requestId }});
  if (!request) throw new Error("Request not found");

  await prisma.$transaction([
    prisma.maintenanceRequest.update({
      where: { id: requestId },
      data: {
        status: "APPROVED",
        approvedById: admin.id
      }
    }),
    prisma.asset.update({
      where: { id: request.assetId },
      data: { status: "UNDER_MAINTENANCE" }
    }),
    prisma.activityLog.create({
      data: {
        actorId: admin.id,
        action: "APPROVED_MAINTENANCE",
        entityType: "ASSET",
        entityId: request.assetId,
      }
    })
  ]);

  revalidatePath("/maintenance");
  revalidatePath(`/assets/${request.assetId}`);
}

export async function resolveMaintenance(formData: FormData) {
  const requestId = formData.get("requestId") as string;
  
  const session = await auth();
  const admin = session?.user as any;
  if (!admin || !admin.id || admin.role !== "ASSET_MANAGER" && admin.role !== "ADMIN") {
    throw new Error("Unauthorized: Only Admins or Asset Managers can resolve maintenance.");
  }

  const request = await prisma.maintenanceRequest.findUnique({ where: { id: requestId }});
  if (!request) throw new Error("Request not found");

  await prisma.$transaction([
    prisma.maintenanceRequest.update({
      where: { id: requestId },
      data: {
        status: "RESOLVED",
        resolvedAt: new Date()
      }
    }),
    prisma.asset.update({
      where: { id: request.assetId },
      data: { status: "AVAILABLE" }
    }),
    prisma.activityLog.create({
      data: {
        actorId: admin.id,
        action: "RESOLVED_MAINTENANCE",
        entityType: "ASSET",
        entityId: request.assetId,
      }
    })
  ]);

  revalidatePath("/maintenance");
  revalidatePath(`/assets/${request.assetId}`);
}
